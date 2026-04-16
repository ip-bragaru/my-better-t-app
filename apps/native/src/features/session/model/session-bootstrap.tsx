import { useEffect } from "react";

import { useAppStore } from "@core/providers/app-store-provider";
import { bootstrapSessionToken } from "@features/session/lib/bootstrap-session";

export function SessionBootstrap() {
  const appStore = useAppStore();

  useEffect(() => {
    let isMounted = true;

    bootstrapSessionToken()
      .then((token) => {
        if (!isMounted) {
          return;
        }

        appStore.setSessionToken(token);
        appStore.markSessionReady();
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        appStore.setSessionToken(null);
        appStore.markSessionReady();
      });

    return () => {
      isMounted = false;
    };
  }, [appStore]);

  return null;
}
