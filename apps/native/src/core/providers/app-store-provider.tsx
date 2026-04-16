import { createContext, useContext, useState, type PropsWithChildren } from "react";

import { AppStore } from "@core/stores/app-store";

const AppStoreContext = createContext<AppStore | null>(null);

export function AppStoreProvider({ children }: PropsWithChildren) {
  const [store] = useState(() => new AppStore());

  return <AppStoreContext.Provider value={store}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const store = useContext(AppStoreContext);

  if (!store) {
    throw new Error("useAppStore must be used within AppStoreProvider");
  }

  return store;
}
