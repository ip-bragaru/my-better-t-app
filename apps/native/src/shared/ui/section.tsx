import { Text, View, type ViewProps } from "react-native";

import { cn } from "@shared/lib/cn";

type SectionProps = ViewProps & {
  title?: string;
  subtitle?: string;
};

export function Section({ title, subtitle, children, className, ...props }: SectionProps) {
  return (
    <View
      {...props}
      className={cn("gap-[var(--component-layout-content-gap)]", className)}
    >
      {title || subtitle ? (
        <View className="gap-[var(--space-xs)]">
          {title ? (
            <Text className="text-[length:var(--typography-xl-font-size)] leading-[var(--typography-xl-line-height)] tracking-[var(--typography-xl-letter-spacing)] text-[var(--color-text-primary)] font-semibold">
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text className="text-[length:var(--typography-md-font-size)] leading-7 text-[var(--color-text-secondary)] font-medium">
              {subtitle}
            </Text>
          ) : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}
