import { ActivityIndicator, Pressable, Text, View, type PressableProps } from "react-native";
import { tv } from "tailwind-variants";

import { DESIGN_TOKENS } from "@shared/config/design-tokens";
import { cn } from "@shared/lib/cn";

const buttonInner = tv({
  base: "flex-row items-center justify-center gap-2 rounded-full",
  variants: {
    variant: {
      accent: "bg-[var(--color-app-brand-primary)]",
      neutral: "bg-[var(--color-app-surface-muted)]",
      ghost: "bg-transparent",
    },
    size: {
      sm: "min-h-10 px-[14px] py-[10px]",
      md: "min-h-[46px] px-[18px] py-[13px]",
    },
  },
  defaultVariants: { variant: "accent", size: "md" },
});

const buttonLabel = tv({
  base: "text-center font-semibold",
  variants: {
    variant: {
      accent: "text-white",
      neutral: "text-[var(--color-app-text-primary)]",
      ghost: "text-[var(--color-app-brand-primary)]",
    },
    size: {
      sm: "text-[13px]",
      md: "text-[15px]",
    },
  },
  defaultVariants: { variant: "accent", size: "md" },
});

type ButtonVariant = "accent" | "neutral" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonProps = Omit<PressableProps, "style"> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  fullWidth?: boolean;
};

export function Button({
  label,
  variant = "accent",
  size = "md",
  isLoading = false,
  leftSlot,
  rightSlot,
  disabled,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || isLoading}
      {...props}
      className={cn(
        "rounded-full active:opacity-90 disabled:opacity-45",
        fullWidth ? "self-stretch" : "self-start",
      )}
    >
      <View className={buttonInner({ variant, size })}>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={variant === "accent" ? "#ffffff" : DESIGN_TOKENS.color.brand.primary}
          />
        ) : (
          <>
            {leftSlot}
            <Text className={buttonLabel({ variant, size })}>{label}</Text>
            {rightSlot}
          </>
        )}
      </View>
    </Pressable>
  );
}
