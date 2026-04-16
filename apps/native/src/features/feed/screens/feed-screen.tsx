import { observer } from "mobx-react-lite";
import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSession } from "@features/session/hooks/use-session";
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
  const insets = useSafeAreaInsets();

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
      params: { postId: post.id },
    });
  }, []);

  const handleEndReached = useCallback(() => {
    if (!feedQuery.hasNextPage || feedQuery.isFetchingNextPage) {
      return;
    }

    feedQuery.fetchNextPage();
  }, [feedQuery]);

  const handleRefresh = useCallback(() => {
    feedQuery.refetch();
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
        refreshControl={
          <RefreshControl
            refreshing={feedQuery.isRefetching && !feedQuery.isFetchingNextPage}
            onRefresh={handleRefresh}
            tintColor="#17131A"
          />
        }
        ListHeaderComponent={
          <View className="px-4 pb-4" style={{ paddingTop: insets.top + 16 }}>
            <FeedFilterTabs value={filter} onChange={setFilter} />
          </View>
        }
        ItemSeparatorComponent={FeedItemSeparator}
        renderItem={renderFeedPostItem}
        ListEmptyComponent={
          <View className="flex-1 px-4 pt-10">
            <ScreenState
              isLoading={feedQuery.isLoading}
              error={feedQuery.error}
              isEmpty={posts.length === 0}
              onRetry={handleRefresh}
              emptyTitle="No posts in this tier"
              emptyMessage="Try another filter or pull to refresh."
            >
              {null}
            </ScreenState>
          </View>
        }
        ListFooterComponent={
          <View className="px-4 pt-4" style={{ paddingBottom: insets.bottom + 32 }}>
            {posts.length > 0 ? (
              <PaginationFooter
                isFetchingNextPage={feedQuery.isFetchingNextPage}
                hasMore={Boolean(feedQuery.hasNextPage)}
              />
            ) : null}
          </View>
        }
      />

      {feedQuery.isLoading ? (
        <View className="absolute inset-x-5 top-48">
          <FeedSkeleton />
        </View>
      ) : null}

      {feedQuery.error && posts.length > 0 ? (
        <View className="absolute inset-x-5 bottom-6 rounded-3xl bg-[var(--color-app-surface-default)] p-4 shadow-sm">
          <Text className="text-sm text-neutral-600 font-medium">
            Не удалось обновить ленту. Кешированные карточки остаются доступны.
          </Text>
          <View className="mt-3">
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
  return <View className="h-4" />;
}
