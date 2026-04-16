import { ActivityIndicator, Pressable, View, type PressableProps } from "react-native";

import { DESIGN_TOKENS } from "@shared/config/design-tokens";
import { cn } from "@shared/lib/cn";
import { SendIcon } from "@shared/ui/send-icon";

type SendButtonProps = Omit<PressableProps, "style"> & {
  isLoading?: boolean;
  size?: number;
};

export function SendButton({
  isLoading = false,
  size = 42,
  disabled,
  ...props
}: SendButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Send"
      disabled={isDisabled}
      {...props}
      className="active:opacity-90"
    >
      <View
        className={cn(
          "items-center justify-center rounded-full",
          isDisabled ? "bg-[var(--color-app-surface-muted)]" : "bg-[var(--color-app-brand-soft)]",
        )}
        style={{ width: size, height: size }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={DESIGN_TOKENS.color.brand.strong} />
        ) : (
          <SendIcon color={isDisabled ? DESIGN_TOKENS.color.brand.disabled : DESIGN_TOKENS.color.brand.strong} />
        )}
      </View>
    </Pressable>
  );
}
