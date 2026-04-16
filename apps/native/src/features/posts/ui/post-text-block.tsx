import { Pressable, Text, View } from "react-native";

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
    <View className="gap-2">
      {title ? (
        <Text
          className={cn(
            "text-[var(--color-app-text-primary)] font-bold lining-nums tabular-nums stacked-fractions",
            titleSize === "xl"
              ? "text-[32px] leading-[40px] tracking-[-0.8px]"
              : "text-[18px] leading-[26px] tracking-[0px]",
          )}
        >
          {title}
        </Text>
      ) : null}
      <Text
        className="text-[15px] leading-5 tracking-[0px] text-[var(--color-app-text-secondary)] font-medium lining-nums tabular-nums stacked-fractions"
        numberOfLines={maxLines}
      >
        {text}
      </Text>
      {actionLabel && onActionPress ? (
        <Pressable onPress={onActionPress}>
          <Text className="text-sm text-[var(--color-app-brand-strong)] font-semibold">
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
