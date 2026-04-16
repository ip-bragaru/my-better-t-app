import { makeAutoObservable } from "mobx";

export type WebsocketStatus = "idle" | "connecting" | "connected" | "reconnecting" | "disconnected";

export class AppStore {
  sessionToken: string | null = null;
  isSessionReady = false;
  websocketStatus: WebsocketStatus = "idle";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setSessionToken(token: string | null) {
    this.sessionToken = token;
  }

  markSessionReady() {
    this.isSessionReady = true;
  }

  setWebsocketStatus(status: WebsocketStatus) {
    this.websocketStatus = status;
  }
}
