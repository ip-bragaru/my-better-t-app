import { View, type ViewProps } from "react-native";

import { cn } from "@shared/lib/cn";

export function SurfaceCard({ className, ...props }: ViewProps) {
  return (
    <View
      {...props}
      className={cn("rounded-[24px] border border-[var(--color-app-border-default)] bg-[var(--color-app-surface-default)] shadow-sm", className)}
    />
  );
}
