import { View, type ViewProps } from "react-native";

import { cn } from "@shared/lib/cn";

export function SurfaceCard({ className, ...props }: ViewProps) {
  return (
    <View
      {...props}
      className={cn(
        "rounded-[var(--component-card-radius)] bg-[var(--color-surface-default)]",
        className,
      )}
    />
  );
}
