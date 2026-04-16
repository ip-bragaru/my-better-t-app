import { Pressable, Text, type PressableProps } from "react-native";
import { tv } from "tailwind-variants";

const textLink = tv({
  base: "font-semibold text-[var(--color-app-brand-primary)]",
  variants: {
    size: {
      sm: "text-[13px]",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { size: "md" },
});

type TextLinkProps = Omit<PressableProps, "style"> & {
  label: string;
  size?: "sm" | "md" | "lg";
};

export function TextLink({ label, size = "md", disabled, ...props }: TextLinkProps) {
  return (
    <Pressable
      accessibilityRole="link"
      disabled={disabled}
      {...props}
      className="active:opacity-70 disabled:opacity-40"
    >
      <Text className={textLink({ size })}>{label}</Text>
    </Pressable>
  );
}
