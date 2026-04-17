import { Pressable, View, type PressableProps } from "react-native";

import { cn } from "@shared/lib/cn";
import { mergeRecipeSlots, type RecipeClassNames, tv } from "@shared/ui/recipe";

const iconButtonRecipe = tv({
  slots: {
    root: "active:opacity-90 disabled:opacity-[var(--opacity-disabled)]",
    content: "items-center justify-center rounded-full",
  },
  variants: {
    tone: {
      accent: {
        content: "bg-[var(--color-brand-soft)]",
      },
      neutral: {
        content: "bg-[var(--color-surface-muted)]",
      },
    },
    size: {
      sm: {
        content: "h-[var(--component-icon-button-size-sm)] w-[var(--component-icon-button-size-sm)]",
      },
      md: {
        content: "h-[var(--component-icon-button-size-md)] w-[var(--component-icon-button-size-md)]",
      },
    },
  },
  defaultVariants: {
    tone: "neutral",
    size: "md",
  },
});

type IconButtonProps = Omit<PressableProps, "style"> & {
  icon: React.ReactNode;
  tone?: "neutral" | "accent";
  size?: "sm" | "md";
  classNames?: RecipeClassNames<"root" | "content">;
};

export function IconButton({
  icon,
  tone = "neutral",
  size = "md",
  disabled,
  className,
  classNames,
  ...props
}: IconButtonProps) {
  const slots = mergeRecipeSlots(iconButtonRecipe({ tone, size }), classNames);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      {...props}
      className={cn(slots.root, className)}
    >
      <View className={slots.content}>{icon}</View>
    </Pressable>
  );
}
