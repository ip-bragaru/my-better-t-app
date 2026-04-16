export const APP_CONFIG = {
  apiBaseUrl:
    process.env.EXPO_PUBLIC_MECENATE_API_URL ?? "https://k8s.mectest.ru/test-app",
  feedPageSize: 10,
  commentsPageSize: 20,
  websocketReconnectBaseDelayMs: 1_000,
  websocketReconnectMaxDelayMs: 10_000,
  websocketEventDedupeTtlMs: 45_000,
  websocketDebugEnabled: process.env.EXPO_PUBLIC_MECENATE_WS_DEBUG === "true",
  sessionStorageKey: "mecenate.session.uuid",
} as const;
