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
      className={cn("gap-[14px]", className)}
    >
      {title || subtitle ? (
        <View className="gap-2">
          {title ? (
            <Text className="text-3xl tracking-[-0.9px] text-[var(--color-app-text-primary)] font-semibold">
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text className="text-base leading-7 text-[var(--color-app-text-secondary)] font-medium">{subtitle}</Text>
          ) : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}
