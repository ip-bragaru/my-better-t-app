import { FlatList, RefreshControl, View, type ListRenderItemInfo } from "react-native";

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
      removeClippedSubviews
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor="#17131A"
        />
      }
      ListHeaderComponent={
        <View className="px-5 pb-5 pt-5">
          {postHeader}
          <View className="h-5" />
          {commentsHeader}
        </View>
      }
      ItemSeparatorComponent={CommentItemSeparator}
      ListEmptyComponent={<View className="px-5">{emptyState}</View>}
      ListFooterComponent={
        <View className="px-5 pb-[140px] pt-4">
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
    <View className="px-5">
      <CommentItem comment={item} />
    </View>
  );
}

function CommentItemSeparator() {
  return <View className="h-3" />;
}
