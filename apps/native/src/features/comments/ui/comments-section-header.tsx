import { Pressable, Text, View } from "react-native";

import { formatCommentCount } from "@shared/lib/formatters";

type CommentsSectionHeaderProps = {
  count: number;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function CommentsSectionHeader({
  count,
  actionLabel = "Сначала новые",
  onActionPress,
}: CommentsSectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between gap-[var(--space-sm)]">
      <Text className="text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)] tracking-[var(--typography-md-letter-spacing)] text-[var(--color-text-subtle)] font-semibold lining-nums tabular-nums stacked-fractions">
        {formatCommentCount(count)}
      </Text>
      <Pressable className="flex-row items-center gap-[var(--space-xxs)]" onPress={onActionPress}>
        <Text className="text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)] font-medium text-[var(--color-brand-strong)]">
          {actionLabel}
        </Text>

      </Pressable>
    </View>
  );
}
