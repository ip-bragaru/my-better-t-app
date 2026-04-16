import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { match } from "ts-pattern";

import { useAppStore } from "@core/providers/app-store-provider";
import { useSession } from "@features/session/hooks/use-session";
import { syncCommentAdded, syncLikeCount } from "@features/realtime/lib/query-cache-sync";
import { APP_CONFIG } from "@shared/config/app-config";
import type { RealtimeEvent } from "@shared/model/types";

export function RealtimeConnection() {
  const { token, isReady } = useSession();
  const appStore = useAppStore();
  const queryClient = useQueryClient();
  const reconnectAttemptRef = useRef(0);
  const websocketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seenEventsRef = useRef(new Map<string, number>());

  useEffect(() => {
    if (!isReady || !token) {
      return;
    }

    const sessionToken = token;
    let isDisposed = false;

    const cleanupSocket = () => {
      websocketRef.current?.close();
      websocketRef.current = null;
    };

    const debugLog = (message: string, details?: unknown) => {
      if (!APP_CONFIG.websocketDebugEnabled) {
        return;
      }

      if (details === undefined) {
        console.log(`[mecenate-ws] ${message}`);
        return;
      }

      console.log(`[mecenate-ws] ${message}`, details);
    };

    const scheduleReconnect = () => {
      if (isDisposed) {
        return;
      }

      reconnectAttemptRef.current += 1;
      appStore.setWebsocketStatus("reconnecting");

      const delay = Math.min(
        APP_CONFIG.websocketReconnectBaseDelayMs * 2 ** (reconnectAttemptRef.current - 1),
        APP_CONFIG.websocketReconnectMaxDelayMs,
      );

      debugLog("schedule reconnect", {
        attempt: reconnectAttemptRef.current,
        delay,
      });

      reconnectTimerRef.current = setTimeout(connect, delay);
    };

    const handleEvent = (event: RealtimeEvent) => {
      const eventId = getEventId(event);
      const now = Date.now();

      for (const [key, timestamp] of seenEventsRef.current.entries()) {
        if (now - timestamp > APP_CONFIG.websocketEventDedupeTtlMs) {
          seenEventsRef.current.delete(key);
        }
      }

      if (seenEventsRef.current.has(eventId)) {
        debugLog("drop duplicate event", event);
        return;
      }

      seenEventsRef.current.set(eventId, now);
      debugLog("receive event", event);

      match(event)
        .with({ type: "ping" }, () => undefined)
        .with({ type: "like_updated" }, (payload) => {
          syncLikeCount(queryClient, payload.postId, payload.likesCount);
        })
        .with({ type: "comment_added" }, (payload) => {
          syncCommentAdded(queryClient, payload.comment);
        })
        .exhaustive();
    };

    function connect() {
      if (isDisposed) {
        return;
      }

      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }

      appStore.setWebsocketStatus(reconnectAttemptRef.current > 0 ? "reconnecting" : "connecting");

      const websocketUrl = createWebsocketUrl(sessionToken);
      debugLog("connect", websocketUrl);
      const socket = new WebSocket(websocketUrl);

      websocketRef.current = socket;

      socket.onopen = () => {
        reconnectAttemptRef.current = 0;
        appStore.setWebsocketStatus("connected");
        debugLog("open");
      };

      socket.onmessage = (message) => {
        try {
          debugLog("raw message", message.data);
          const payload = JSON.parse(message.data as string) as RealtimeEvent;
          handleEvent(payload);
        } catch {
          debugLog("failed to parse message", message.data);
          return;
        }
      };

      socket.onerror = (event) => {
        appStore.setWebsocketStatus("disconnected");
        debugLog("error", event);
      };

      socket.onclose = (event) => {
        appStore.setWebsocketStatus("disconnected");
        debugLog("close", {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
        });
        if (!isDisposed) {
          scheduleReconnect();
        }
      };
    }

    connect();

    return () => {
      isDisposed = true;
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
      cleanupSocket();
      appStore.setWebsocketStatus("idle");
    };
  }, [appStore, isReady, queryClient, token]);

  return null;
}

function createWebsocketUrl(token: string) {
  const baseUrl = new URL(`${APP_CONFIG.apiBaseUrl}/`);
  baseUrl.protocol = baseUrl.protocol === "https:" ? "wss:" : "ws:";
  baseUrl.pathname = `${baseUrl.pathname.replace(/\/$/, "")}/ws`;
  baseUrl.searchParams.set("token", token);

  return baseUrl.toString();
}

function getEventId(event: RealtimeEvent) {
  return match(event)
    .with({ type: "ping" }, () => "ping")
    .with({ type: "like_updated" }, ({ postId, likesCount }) => `like:${postId}:${likesCount}`)
    .with({ type: "comment_added" }, ({ comment }) => `comment:${comment.id}`)
    .exhaustive();
}
