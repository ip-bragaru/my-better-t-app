import { useAppStore } from "@core/providers/app-store-provider";

export function useSession() {
  const appStore = useAppStore();

  return {
    token: appStore.sessionToken,
    isReady: appStore.isSessionReady,
  };
}
