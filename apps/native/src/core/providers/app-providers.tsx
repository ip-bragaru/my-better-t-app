import { QueryClientProvider } from "@tanstack/react-query";
import { useState, type PropsWithChildren } from "react";

import { AppStoreProvider } from "@core/providers/app-store-provider";
import { RealtimeConnection } from "@features/realtime/model/realtime-connection";
import { SessionBootstrap } from "@features/session/model/session-bootstrap";
import { createQueryClient } from "@shared/api/query-client";

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(createQueryClient);

  return (
    <AppStoreProvider>
      <QueryClientProvider client={queryClient}>
        <SessionBootstrap />
        <RealtimeConnection />
        {children}
      </QueryClientProvider>
    </AppStoreProvider>
  );
}
