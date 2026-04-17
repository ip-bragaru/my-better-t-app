import { ActivityIndicator, Pressable, View, type PressableProps } from "react-native";

import { useDesignTokens } from "@shared/config/design-tokens";
import { cn } from "@shared/lib/cn";
import { mergeRecipeSlots, type RecipeClassNames, tv } from "@shared/ui/recipe";
import { SendIcon } from "@shared/ui/send-icon";

const sendButtonRecipe = tv({
  slots: {
    root: "active:opacity-90 disabled:opacity-[var(--opacity-disabled)]",
    content: "items-center justify-center rounded-full",
  },
  variants: {
    disabled: {
      true: {
        content: "bg-[var(--color-surface-muted)]",
      },
      false: {
        content: "bg-[var(--color-brand-soft)]",
      },
    },
    size: {
      sm: {
        content: "h-[var(--component-send-button-size-sm)] w-[var(--component-send-button-size-sm)]",
      },
      md: {
        content: "h-[var(--component-send-button-size-md)] w-[var(--component-send-button-size-md)]",
      },
    },
  },
  defaultVariants: {
    disabled: false,
    size: "md",
  },
});

type SendButtonProps = Omit<PressableProps, "style"> & {
  isLoading?: boolean;
  size?: "sm" | "md";
  classNames?: RecipeClassNames<"root" | "content">;
};

export function SendButton({
  isLoading = false,
  size = "md",
  disabled,
  className,
  classNames,
  ...props
}: SendButtonProps) {
  const tokens = useDesignTokens();
  const isDisabled = disabled || isLoading;
  const slots = mergeRecipeSlots(sendButtonRecipe({ disabled: isDisabled, size }), classNames);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Send"
      disabled={isDisabled}
      {...props}
      className={cn(slots.root, className)}
    >
      <View className={slots.content}>
        {isLoading ? (
          <ActivityIndicator size="small" color={tokens.semantic.color.brand.strong} />
        ) : (
          <SendIcon
            color={
              isDisabled
                ? tokens.semantic.color.brand.disabled
                : tokens.semantic.color.brand.strong
            }
          />
        )}
      </View>
    </Pressable>
  );
}
