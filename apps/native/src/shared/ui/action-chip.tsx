import { Pressable, Text, View, type PressableProps } from "react-native";
import { tv } from "tailwind-variants";

const chipContainer = tv({
  base: "flex-row items-center rounded-full",
  variants: {
    active: {
      true: "bg-[var(--color-app-action-default)] group-hover:bg-[var(--color-app-action-hover)] group-active:bg-[var(--color-app-action-active)] group-disabled:bg-[var(--color-app-action-disabled)]",
      false: "bg-[var(--color-app-surface-input)] group-active:bg-[var(--color-app-surface-input-active)] group-disabled:bg-[var(--color-app-surface-default)]",
    },
    size: {
      sm: "gap-1 py-[6px] pl-[6px] pr-3",
      md: "gap-2 px-4 py-3",
    },
  },
  defaultVariants: { active: false, size: "md" },
});

const chipLabel = tv({
  base: "font-semibold",
  variants: {
    active: {
      true: "text-white",
      false: "text-[var(--color-app-text-primary)]",
    },
    size: {
      sm: "text-[13px]",
      md: "text-sm",
    },
  },
  defaultVariants: { active: false, size: "md" },
});

type ActionChipProps = Omit<PressableProps, "style"> & {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  size?: "sm" | "md";
};

export function ActionChip({
  label,
  icon,
  active = false,
  size = "md",
  ...props
}: ActionChipProps) {
  const Container = props.onPress ? Pressable : View;

  return (
    <Container
      {...props}
      accessibilityRole={props.onPress ? "button" : undefined}
      className={props.onPress ? "group disabled:opacity-45" : undefined}
    >
      <View className={chipContainer({ active, size })}>
        {icon}
        <Text className={chipLabel({ active, size })}>{label}</Text>
      </View>
    </Container>
  );
}
