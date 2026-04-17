import { Text, View } from "react-native";

import { TextLink } from "@shared/ui/text-link";
import { cn } from "@shared/lib/cn";

type PostTextBlockProps = {
  title?: string;
  text: string;
  titleSize?: "lg" | "xl";
  maxLines?: number;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function PostTextBlock({
  title,
  text,
  titleSize = "lg",
  maxLines,
  actionLabel,
  onActionPress,
}: PostTextBlockProps) {
  return (
    <View className="gap-[var(--space-xs)]">
      {title ? (
        <Text
          className={cn(
            "font-bold text-[var(--color-text-primary)] lining-nums tabular-nums stacked-fractions",
            titleSize === "xl"
              ? "text-[length:var(--typography-xl-font-size)] leading-[var(--typography-xl-line-height)] tracking-[var(--typography-xl-letter-spacing)]"
              : "text-[length:var(--typography-lg-font-size)] leading-[var(--typography-lg-line-height)] tracking-[var(--typography-lg-letter-spacing)]",
          )}
        >
          {title}
        </Text>
      ) : null}
      <Text
        className="text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)] tracking-[var(--typography-md-letter-spacing)] text-[var(--color-text-primary)] font-medium lining-nums tabular-nums stacked-fractions"
        numberOfLines={maxLines}
      >
        {text}
      </Text>
      {actionLabel && onActionPress ? (
        <TextLink label={actionLabel} onPress={onActionPress} />
      ) : null}
    </View>
  );
}
