import { Pressable, Text, View, type PressableProps } from "react-native";
import { cn } from "@shared/lib/cn";

import { mergeRecipeSlots, type RecipeClassNames, tv } from "@shared/ui/recipe";

const actionChipRecipe = tv({
  slots: {
    root: "",
    content: "flex-row items-center rounded-full",
    label: "font-bold lining-nums tabular-nums stacked-fractions",
  },
  variants: {
    active: {
      true: {
        content:
          "bg-[var(--color-action-default)] group-hover:bg-[var(--color-action-hover)] group-active:bg-[var(--color-action-active)] group-disabled:bg-[var(--color-action-disabled)]",
        label: "text-[var(--color-text-inverse)]",
      },
      false: {
        content:
          "bg-[var(--color-surface-input)] group-active:bg-[var(--color-surface-input-active)] group-disabled:bg-[var(--color-surface-default)]",
        label: "text-[var(--color-text-stat)]",
      },
    },
    size: {
      sm: {
        content:
          "gap-[var(--component-chip-size-sm-gap)] py-[var(--component-chip-size-sm-padding-y)] pl-[var(--component-chip-size-sm-padding-x-leading)] pr-[var(--component-chip-size-sm-padding-x-trailing)]",
        label:
          "text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)]",
      },
      md: {
        content:
          "gap-[var(--component-chip-size-md-gap)] px-[var(--component-chip-size-md-padding-x)] py-[var(--component-chip-size-md-padding-y)]",
        label:
          "text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)]",
      },
    },
  },
  defaultVariants: { active: false, size: "md" },
});

type ActionChipProps = Omit<PressableProps, "style"> & {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  size?: "sm" | "md";
  classNames?: RecipeClassNames<"root" | "content" | "label">;
};

export function ActionChip({
  label,
  icon,
  active = false,
  size = "md",
  className,
  classNames,
  ...props
}: ActionChipProps) {
  const Container = props.onPress ? Pressable : View;
  const slots = mergeRecipeSlots(actionChipRecipe({ active, size }), classNames);

  return (
    <Container
      {...props}
      accessibilityRole={props.onPress ? "button" : undefined}
      className={cn(props.onPress && "group disabled:opacity-[var(--opacity-disabled)]", slots.root, className)}
    >
      <View className={slots.content}>
        {icon}
        <Text className={slots.label}>{label}</Text>
      </View>
    </Container>
  );
}
