import { Pressable, Text, type PressableProps } from "react-native";

import { cn } from "@shared/lib/cn";
import { mergeRecipeSlots, type RecipeClassNames, tv } from "@shared/ui/recipe";

const textLinkRecipe = tv({
  slots: {
    root: "active:opacity-70 disabled:opacity-[var(--opacity-disabled)]",
    label: "font-semibold text-[var(--color-brand-primary)]",
  },
  variants: {
    size: {
      sm: {
        label:
          "text-[length:var(--typography-xs-font-size)] leading-[var(--typography-xs-line-height)]",
      },
      md: {
        label:
          "text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)]",
      },
      lg: {
        label:
          "text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)]",
      },
    },
  },
  defaultVariants: { size: "md" },
});

type TextLinkProps = Omit<PressableProps, "style"> & {
  label: string;
  size?: "sm" | "md" | "lg";
  classNames?: RecipeClassNames<"root" | "label">;
};

export function TextLink({
  label,
  size = "md",
  disabled,
  className,
  classNames,
  ...props
}: TextLinkProps) {
  const slots = mergeRecipeSlots(textLinkRecipe({ size }), classNames);

  return (
    <Pressable
      accessibilityRole="link"
      disabled={disabled}
      {...props}
      className={cn(slots.root, className)}
    >
      <Text className={slots.label}>{label}</Text>
    </Pressable>
  );
}
