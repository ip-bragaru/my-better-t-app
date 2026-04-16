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
            "text-neutral-950 font-semibold",
            titleSize === "xl"
              ? "text-[32px] leading-[40px] tracking-[-0.8px]"
              : "text-[22px] leading-[30px] tracking-[-0.4px]",
          )}
        >
          {title}
        </Text>
      ) : null}
      <Text
        className="text-base leading-7 text-neutral-600 font-medium"
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
