import { View, type ViewProps } from "react-native";

import { cn } from "@shared/lib/cn";

type ScreenContainerProps = ViewProps & {
  padded?: boolean;
};

export function ScreenContainer({
  padded = false,
  className,
  ...props
}: ScreenContainerProps) {
  return (
    <View
      {...props}
      className={cn(
        "flex-1 bg-[var(--color-canvas-default)]",
        padded && "px-[var(--component-layout-screen-padding)]",
        className,
      )}
    />
  );
}
