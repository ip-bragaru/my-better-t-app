import { FlatList, RefreshControl, View, type ListRenderItemInfo } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { CommentItem } from "@features/comments/ui/comment-item";
import { useDesignTokens } from "@shared/config/design-tokens";
import { cn } from "@shared/lib/cn";
import type { Comment } from "@shared/model/types";

type CommentListProps = {
  comments: Comment[];
  commentsHeader: React.ReactElement;
  postHeader: React.ReactElement;
  emptyState: React.ReactElement;
  footer?: React.ReactElement;
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
  const tokens = useDesignTokens();
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
          progressViewOffset={insets.top + 30}
          tintColor={tokens.semantic.color.text.primary}
        />
      }
      ListHeaderComponent={
        <SafeAreaView edges={["top"]} className="pt-[30px]">
          {postHeader}
          <View className="bg-[var(--color-surface-default)] px-[var(--component-layout-card-padding)] pb-[var(--space-xs)]">
            {commentsHeader}
          </View>
        </SafeAreaView>
      }
      ListEmptyComponent={
        <View className="bg-[var(--color-surface-default)] px-[var(--component-layout-panel-padding)]">
          {emptyState}
        </View>
      }
      ListFooterComponent={
        <SafeAreaView
          edges={["bottom"]}
          className={cn(
            "bg-[var(--color-surface-default)] px-[var(--component-layout-panel-padding)] pb-[var(--component-layout-panel-padding)]",
            footer && "bg-[var(--color-canvas-default)] pb-[var(--space-sm)]",
          )}
        >
          {footer}
        </SafeAreaView>
      }
    />
  );
}

function keyExtractor(item: Comment) {
  return item.id;
}

function renderCommentItem({ item }: ListRenderItemInfo<Comment>) {
  return (
    <View className="bg-[var(--color-surface-default)] px-[var(--component-layout-panel-padding)] py-[var(--space-xs)]">
      <CommentItem comment={item} />
    </View>
  );
}
