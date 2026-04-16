import { ActivityIndicator, Text, View } from "react-native";

import { DESIGN_TOKENS } from "@shared/config/design-tokens";

type PaginationFooterProps = {
  isFetchingNextPage: boolean;
  hasMore: boolean;
};

export function PaginationFooter({ isFetchingNextPage, hasMore }: PaginationFooterProps) {
  if (isFetchingNextPage) {
    return (
      <View className="items-center py-6">
        <ActivityIndicator size="small" color={DESIGN_TOKENS.color.text.primary} />
      </View>
    );
  }

  return <View className="h-4" />;
}
