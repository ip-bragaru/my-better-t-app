import { FlatList, RefreshControl, View, type ListRenderItemInfo } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DESIGN_TOKENS } from "@shared/config/design-tokens";
import type { Comment } from "@shared/model/types";
import { CommentItem } from "@features/comments/ui/comment-item";

type CommentListProps = {
  comments: Comment[];
  commentsHeader: React.ReactElement;
  postHeader: React.ReactElement;
  emptyState: React.ReactElement;
  footer: React.ReactElement | null;
  isRefreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
};

export function CommentList({
  comments,
  commentsHeader,
  postHeader,
  emptyState,
  footer,
  isRefreshing,
  onRefresh,
  onEndReached,
}: CommentListProps) {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={comments}
      keyExtractor={keyExtractor}
      renderItem={renderCommentItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.35}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      updateCellsBatchingPeriod={48}
      windowSize={8}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={DESIGN_TOKENS.color.text.primary}
        />
      }
      ListHeaderComponent={
        <View style={{ paddingTop: insets.top + 12 }}>
          {postHeader}
          <View className="bg-white px-4 pb-2">
            {commentsHeader}
          </View>
        </View>
      }
      ListEmptyComponent={<View className="bg-white px-5">{emptyState}</View>}
      ListFooterComponent={
        <View className="bg-white px-5 pb-5">
          {footer}
        </View>
      }
    />
  );
}

function keyExtractor(item: Comment) {
  return item.id;
}

function renderCommentItem({ item }: ListRenderItemInfo<Comment>) {
  return (
    <View className="bg-white px-5 py-2">
      <CommentItem comment={item} />
    </View>
  );
}

