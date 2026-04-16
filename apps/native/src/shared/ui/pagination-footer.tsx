import { ActivityIndicator, Text, View } from "react-native";

type PaginationFooterProps = {
  isFetchingNextPage: boolean;
  hasMore: boolean;
};

export function PaginationFooter({ isFetchingNextPage, hasMore }: PaginationFooterProps) {
  if (isFetchingNextPage) {
    return (
      <View className="items-center py-6">
        <ActivityIndicator size="small" color="#17131A" />
      </View>
    );
  }

  return <View className="h-4" />;
}
