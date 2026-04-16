import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

import { APP_CONFIG } from "@shared/config/app-config";

export async function readSessionToken() {
  if (Platform.OS === "web") {
    return readWebSessionToken();
  }

  return SecureStore.getItemAsync(APP_CONFIG.sessionStorageKey);
}

export async function writeSessionToken(token: string) {
  if (Platform.OS === "web") {
    writeWebSessionToken(token);
    return;
  }

  await SecureStore.setItemAsync(APP_CONFIG.sessionStorageKey, token);
}

function readWebSessionToken() {
  try {
    if (typeof localStorage === "undefined") {
      return null;
    }

    return localStorage.getItem(APP_CONFIG.sessionStorageKey);
  } catch {
    return null;
  }
}

function writeWebSessionToken(token: string) {
  try {
    if (typeof localStorage === "undefined") {
      return;
    }

    localStorage.setItem(APP_CONFIG.sessionStorageKey, token);
  } catch {
    return;
  }
}
