import { useFeedController } from "@features/feed/hooks/use-feed-controller";
import { FeedEmptyState } from "@features/feed/ui/feed-empty-state";
import { FeedErrorState } from "@features/feed/ui/feed-error-state";
import { FeedFilterTabs } from "@features/feed/ui/feed-filter-tabs";
import { FeedPostCard } from "@features/feed/ui/feed-post-card";
import { FeedSkeleton } from "@features/feed/ui/feed-skeleton";
import { useSession } from "@features/session/hooks/use-session";
import { useDesignTokens } from "@shared/config/design-tokens";
import type { FeedFilter, Post } from "@shared/model/types";
import { Button } from "@shared/ui/button";
import { PaginationFooter } from "@shared/ui/pagination-footer";
import { ScreenContainer } from "@shared/ui/screen-container";
import { LoadingState } from "@shared/ui/screen-state";
import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import { useCallback, useMemo, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export const FeedScreen = observer(function FeedScreen() {
  const { token, isReady } = useSession();
  const [filter, setFilter] = useState<FeedFilter>("all");
  const insets = useSafeAreaInsets();
  const tokens = useDesignTokens();

  const { feedQuery, posts, isManualRefreshing, refresh, handleEndReached } = useFeedController({
    token: token ?? "",
    filter,
  });

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

  const renderFeedPostItem = useCallback(
    ({ item }: { item: Post }) => <FeedPostCard post={item} onPress={handleOpenPost} />,
    [handleOpenPost],
  );

  const listEmptyComponent = useMemo(() => {
    if (feedQuery.isLoading) {
      return (
        <View className="px-[var(--component-layout-panel-padding)] pt-[var(--component-layout-card-padding)]">
          <FeedSkeleton />
        </View>
      );
    }

    if (feedQuery.error) {
      return (
        <View className="flex-1 px-[var(--component-layout-card-padding)] pt-[var(--space-control)]">
          <FeedErrorState onRetry={refresh} isRetrying={isManualRefreshing} />
        </View>
      );
    }

    return (
      <View className="flex-1 px-[var(--component-layout-card-padding)] pt-[var(--space-control)]">
        <FeedEmptyState />
      </View>
    );
  }, [feedQuery.error, feedQuery.isLoading, isManualRefreshing, refresh]);

  if (!isReady) {
    return <LoadingState />;
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
            onRefresh={refresh}
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
        ListEmptyComponent={listEmptyComponent}
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
            Не удалось загрузить публикации. Кешированные карточки остаются доступны.
          </Text>
          <View className="mt-[var(--space-sm)]">
            <Button label="Повторить" variant="neutral" size="sm" onPress={refresh} />
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
