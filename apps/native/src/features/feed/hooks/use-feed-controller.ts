import { useFeedQuery } from "@features/feed/hooks/use-feed-query";
import { flattenFeedPosts, keepFirstFeedPage } from "@features/feed/lib/feed-query-helpers";
import { queryKeys } from "@shared/lib/query-keys";
import type { CursorPage, FeedFilter, Post } from "@shared/model/types";
import type { InfiniteData } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useRef, useState } from "react";

type UseFeedControllerParams = {
  token: string;
  filter: FeedFilter;
};

export function useFeedController({ token, filter }: UseFeedControllerParams) {
  const queryClient = useQueryClient();
  const feedQuery = useFeedQuery({ token, filter });
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const paginationInFlightRef = useRef(false);
  const lastPaginationMarkerRef = useRef<string | null>(null);

  const posts = useMemo(() => flattenFeedPosts(feedQuery.data), [feedQuery.data]);
  const listQueryKey = queryKeys.feed.list(filter);
  const lastPostId = posts.at(-1)?.id ?? null;
  const paginationMarker = `${filter}:${lastPostId ?? "empty"}:${feedQuery.data?.pageParams.length ?? 0}`;

  const handleEndReached = useCallback(async () => {
    if (!token) {
      return;
    }

    if (!lastPostId) {
      return;
    }

    if (
      !feedQuery.hasNextPage ||
      feedQuery.isFetchingNextPage ||
      feedQuery.isFetching ||
      isManualRefreshing ||
      paginationInFlightRef.current ||
      lastPaginationMarkerRef.current === paginationMarker
    ) {
      return;
    }

    paginationInFlightRef.current = true;
    lastPaginationMarkerRef.current = paginationMarker;

    try {
      await feedQuery.fetchNextPage();
    } finally {
      paginationInFlightRef.current = false;
    }
  }, [
    token,
    lastPostId,
    paginationMarker,
    feedQuery.hasNextPage,
    feedQuery.isFetchingNextPage,
    feedQuery.isFetching,
    feedQuery.fetchNextPage,
    isManualRefreshing,
  ]);

  const refresh = useCallback(async () => {
    if (!token) {
      return;
    }

    setIsManualRefreshing(true);
    paginationInFlightRef.current = true;
    lastPaginationMarkerRef.current = null;

    try {
      await queryClient.cancelQueries({
        queryKey: listQueryKey,
        exact: true,
      });

      queryClient.setQueryData<InfiniteData<CursorPage<Post>>>(listQueryKey, keepFirstFeedPage);

      await queryClient.invalidateQueries({
        queryKey: listQueryKey,
        exact: true,
        refetchType: "active",
      });
    } finally {
      paginationInFlightRef.current = false;
      setIsManualRefreshing(false);
    }
  }, [token, queryClient, listQueryKey]);

  return {
    feedQuery,
    isManualRefreshing,
    posts,
    refresh,
    handleEndReached,
  };
}
