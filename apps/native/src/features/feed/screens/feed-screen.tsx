import { observer } from "mobx-react-lite";
import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { useSession } from "@features/session/hooks/use-session";
import { useDesignTokens } from "@shared/config/design-tokens";
import { useFeedQuery } from "@features/feed/hooks/use-feed-query";
import { FeedFilterTabs } from "@features/feed/ui/feed-filter-tabs";
import { FeedPostCard } from "@features/feed/ui/feed-post-card";
import { FeedSkeleton } from "@features/feed/ui/feed-skeleton";
import { PaginationFooter } from "@shared/ui/pagination-footer";
import { Button } from "@shared/ui/button";
import { ScreenContainer } from "@shared/ui/screen-container";
import { LoadingState, ScreenState } from "@shared/ui/screen-state";
import type { FeedFilter, Post } from "@shared/model/types";

export const FeedScreen = observer(function FeedScreen() {
  const { token, isReady } = useSession();
  const [filter, setFilter] = useState<FeedFilter>("all");
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  const tokens = useDesignTokens();

  const feedQuery = useFeedQuery({
    token: token ?? "",
    filter,
  });

  const posts = useMemo(
    () => feedQuery.data?.pages.flatMap((page) => page.items) ?? [],
    [feedQuery.data],
  );

  const handleOpenPost = useCallback((post: Post) => {
    router.push({
      pathname: "./post/[postId]",
      params: {
        postId: post.id,
        authorName: post.author.displayName,
        authorAvatarUrl: post.author.avatarUrl,
      },
    });
  }, []);

  const handleEndReached = useCallback(() => {
    if (!feedQuery.hasNextPage || feedQuery.isFetchingNextPage) {
      return;
    }

    feedQuery.fetchNextPage();
  }, [feedQuery]);

  const handleRefresh = useCallback(async () => {
    setIsManualRefreshing(true);
    try {
      await feedQuery.refetch();
    } finally {
      setIsManualRefreshing(false);
    }
  }, [feedQuery]);

  const renderFeedPostItem = useCallback(
    ({ item }: { item: Post }) => (
      <FeedPostCard post={item} onPress={handleOpenPost} />
    ),
    [handleOpenPost],
  );

  if (!isReady) {
    return <LoadingState message="Preparing your session..." />;
  }

  return (
    <ScreenContainer>
      <FlatList
        data={posts}
        keyExtractor={keyExtractor}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.35}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        updateCellsBatchingPeriod={48}
        windowSize={7}
        removeClippedSubviews
        // Let iOS position the pull indicator below the status bar natively
        contentInset={{ top: insets.top }}
        contentOffset={{ x: 0, y: -insets.top }}
        scrollIndicatorInsets={{ top: insets.top }}
        refreshControl={
          <RefreshControl
            refreshing={isManualRefreshing}
            onRefresh={handleRefresh}
            progressViewOffset={insets.top}
            tintColor={tokens.semantic.color.text.primary}
          />
        }
        ListHeaderComponent={
          <View className="px-[var(--component-layout-card-padding)] pb-[var(--component-layout-card-padding)] pt-[var(--component-layout-card-padding)]">
            <FeedFilterTabs value={filter} onChange={setFilter} />
          </View>
        }
        ItemSeparatorComponent={FeedItemSeparator}
        renderItem={renderFeedPostItem}
        ListEmptyComponent={
          feedQuery.isLoading ? (
            <View className="px-[var(--component-layout-panel-padding)] pt-[var(--component-layout-card-padding)]">
              <FeedSkeleton />
            </View>
          ) : (
            <View className="flex-1 px-[var(--component-layout-card-padding)] pt-[var(--space-control)]">
              <ScreenState
                isLoading={false}
                error={feedQuery.error}
                isEmpty={posts.length === 0}
                onRetry={handleRefresh}
                emptyTitle="No posts in this tier"
                emptyMessage="Try another filter or pull to refresh."
              >
                {null}
              </ScreenState>
            </View>
          )
        }
        ListFooterComponent={
          <SafeAreaView edges={["bottom"]} className="px-[var(--component-layout-card-padding)]">
            {posts.length > 0 ? (
              <PaginationFooter
                isFetchingNextPage={feedQuery.isFetchingNextPage}
                hasMore={Boolean(feedQuery.hasNextPage)}
              />
            ) : null}
          </SafeAreaView>
        }
      />

      {feedQuery.error && posts.length > 0 ? (
        <View className="absolute inset-x-[var(--component-layout-floating-inset)] bottom-[var(--component-layout-floating-offset)] rounded-[var(--radius-xl)] border border-[var(--color-border-default)] bg-[var(--color-surface-default)] p-[var(--component-layout-card-padding)]">
          <Text className="text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)] text-[var(--color-text-secondary)] font-medium">
            Не удалось обновить ленту. Кешированные карточки остаются доступны.
          </Text>
          <View className="mt-[var(--space-sm)]">
            <Button label="Повторить" variant="neutral" size="sm" onPress={handleRefresh} />
          </View>
        </View>
      ) : null}
    </ScreenContainer>
  );
});

function keyExtractor(item: Post) {
  return item.id;
}

function FeedItemSeparator() {
  return <View className="h-[var(--component-layout-card-padding)]" />;
}
