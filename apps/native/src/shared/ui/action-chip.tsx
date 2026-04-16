import { Pressable, Text, View, type PressableProps } from "react-native";
import { tv } from "tailwind-variants";

const chipContainer = tv({
  base: "flex-row items-center rounded-full",
  variants: {
    active: {
      true: "bg-[var(--color-app-brand-soft)]",
      false: "bg-[var(--color-app-surface-muted)]",
    },
    size: {
      sm: "gap-[6px] px-3 py-2",
      md: "gap-2 px-4 py-3",
    },
  },
  defaultVariants: { active: false, size: "md" },
});

const chipLabel = tv({
  base: "font-semibold",
  variants: {
    active: {
      true: "text-[var(--color-app-brand-strong)]",
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
      className={props.onPress ? "active:opacity-90 disabled:opacity-45" : undefined}
    >
      <View className={chipContainer({ active, size })}>
        {icon}
        <Text className={chipLabel({ active, size })}>{label}</Text>
      </View>
    </Container>
  );
}
