import { Pressable, View, type PressableProps } from "react-native";

import { cn } from "@shared/lib/cn";

type IconButtonProps = Omit<PressableProps, "style"> & {
  icon: React.ReactNode;
  tone?: "neutral" | "accent";
  size?: number;
};

export function IconButton({
  icon,
  tone = "neutral",
  size = 42,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      {...props}
      className="active:opacity-90 disabled:opacity-40"
    >
      <View
        className={cn(
          "items-center justify-center rounded-full",
          getSizeClassName(size),
          tone === "accent"
            ? "bg-[var(--color-app-brand-soft)]"
            : "bg-[var(--color-app-surface-muted)]",
        )}
      >
        {icon}
      </View>
    </Pressable>
  );
}

function getSizeClassName(size: number) {
  switch (size) {
    case 42:
      return "h-[42px] w-[42px]";
    default:
      return "h-[42px] w-[42px]";
  }
}
