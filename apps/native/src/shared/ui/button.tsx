import { ActivityIndicator, Pressable, Text, View, type PressableProps } from "react-native";
import { tv } from "tailwind-variants";

import { DESIGN_TOKENS } from "@shared/config/design-tokens";
import { cn } from "@shared/lib/cn";

const buttonInner = tv({
  base: "flex-row items-center justify-center gap-2 rounded-[14px]",
  variants: {
    variant: {
      accent: "bg-[#6115CD] group-hover:bg-[#4E11A4] group-disabled:bg-[#D5C9FF]",
      neutral: "bg-[var(--color-app-surface-muted)] group-disabled:opacity-45",
      ghost: "bg-transparent group-disabled:opacity-45",
    },
    size: {
      sm: "min-h-10 px-[14px] py-[10px]",
      md: "h-[42px] px-8",
    },
  },
  defaultVariants: { variant: "accent", size: "md" },
});

const buttonLabel = tv({
  base: "text-center font-semibold",
  variants: {
    variant: {
      accent: "text-white group-hover:text-[#DFD0F5]",
      neutral: "text-[var(--color-app-text-primary)]",
      ghost: "text-[var(--color-app-brand-primary)]",
    },
    size: {
      sm: "text-[13px]",
      md: "text-[15px] leading-[26px]",
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
        "group rounded-[14px] active:opacity-90",
        fullWidth ? "self-stretch" : "self-start",
      )}
    >
      <View className={buttonInner({ variant, size })}>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={variant === "accent" ? "#4E11A4" : DESIGN_TOKENS.color.brand.primary}
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
