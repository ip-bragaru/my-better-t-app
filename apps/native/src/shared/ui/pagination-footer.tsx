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

  if (!hasMore) {
    return (
      <View className="items-center py-6">
        <Text className="text-xs uppercase tracking-[1.8px] text-neutral-400 font-medium">
          End of list
        </Text>
      </View>
    );
  }

  return <View className="h-4" />;
}
