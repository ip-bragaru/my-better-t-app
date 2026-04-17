import { ActivityIndicator, Pressable, Text, View, type PressableProps } from "react-native";

import { useDesignTokens } from "@shared/config/design-tokens";
import { cn } from "@shared/lib/cn";
import { mergeRecipeSlots, type RecipeClassNames, tv } from "@shared/ui/recipe";

const buttonRecipe = tv({
  slots: {
    root: "group rounded-[var(--component-button-radius)] active:opacity-90",
    content: "flex-row items-center justify-center rounded-[var(--component-button-radius)]",
    label: "text-center font-semibold",
  },
  variants: {
    variant: {
      accent: {
        content:
          "bg-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-pressed)] group-disabled:bg-[var(--color-brand-disabled)]",
        label:
          "text-[var(--color-text-inverse)] group-hover:text-[var(--color-brand-pressed-text)]",
      },
      neutral: {
        content: "bg-[var(--color-surface-muted)] group-disabled:opacity-[var(--opacity-disabled)]",
        label: "text-[var(--color-text-primary)]",
      },
      ghost: {
        content: "bg-transparent group-disabled:opacity-[var(--opacity-disabled)]",
        label: "text-[var(--color-brand-primary)]",
      },
    },
    size: {
      sm: {
        content:
          "min-h-[var(--component-button-size-sm-height)] px-[var(--component-button-size-sm-padding-x)] py-[var(--component-button-size-sm-padding-y)] gap-[var(--component-button-size-sm-gap)]",
        label:
          "text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)]",
      },
      md: {
        content:
          "min-h-[var(--component-button-size-md-height)] px-[var(--component-button-size-md-padding-x)] py-[var(--component-button-size-md-padding-y)] gap-[var(--component-button-size-md-gap)]",
        label:
          "text-[length:var(--typography-md-font-size)] leading-[var(--typography-lg-line-height)]",
      },
    },
    fullWidth: {
      true: { root: "self-stretch" },
      false: { root: "self-start" },
    },
  },
  defaultVariants: { variant: "accent", size: "md", fullWidth: false },
});

type ButtonVariant = "accent" | "neutral" | "ghost";
type ButtonSize = "sm" | "md";
type ButtonClassNames = RecipeClassNames<"root" | "content" | "label">;

type ButtonProps = Omit<PressableProps, "style"> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  fullWidth?: boolean;
  classNames?: ButtonClassNames;
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
  className,
  classNames,
  ...props
}: ButtonProps) {
  const tokens = useDesignTokens();
  const slots = mergeRecipeSlots(buttonRecipe({ variant, size, fullWidth }), classNames);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || isLoading}
      {...props}
      className={cn(slots.root, className)}
    >
      <View className={slots.content}>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={
              variant === "accent"
                ? tokens.semantic.color.brand.pressed
                : tokens.semantic.color.brand.primary
            }
          />
        ) : (
          <>
            {leftSlot}
            <Text className={slots.label}>{label}</Text>
            {rightSlot}
          </>
        )}
      </View>
    </Pressable>
  );
}
