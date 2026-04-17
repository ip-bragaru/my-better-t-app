import { ActivityIndicator, Text, View } from "react-native";

import { useDesignTokens } from "@shared/config/design-tokens";

type PaginationFooterProps = {
  isFetchingNextPage: boolean;
  hasMore: boolean;
};

export function PaginationFooter({ isFetchingNextPage, hasMore }: PaginationFooterProps) {
  const tokens = useDesignTokens();

  if (isFetchingNextPage) {
    return (
      <View className="items-center py-[var(--space-xl)]">
        <ActivityIndicator size="small" color={tokens.semantic.color.text.primary} />
      </View>
    );
  }

  if (hasMore) {
    return (
      <View className="items-center py-[var(--space-lg)]">
        <Text className="text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)] text-[var(--color-text-secondary)] font-medium">
          Scroll for more
        </Text>
      </View>
    );
  }

  return null;
}
