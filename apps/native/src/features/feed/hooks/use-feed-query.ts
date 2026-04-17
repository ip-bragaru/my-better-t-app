import { fetchPosts } from "@features/feed/api/feed-api";
import { sanitizeFeedPages } from "@features/feed/lib/feed-query-helpers";
import { queryKeys } from "@shared/lib/query-keys";
import type { FeedFilter } from "@shared/model/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useFeedQuery(params: { token: string; filter: FeedFilter }) {
  return useInfiniteQuery({
    queryKey: queryKeys.feed.list(params.filter),
    enabled: Boolean(params.token),
    initialPageParam: null as string | null,
    queryFn: ({ pageParam, signal }) =>
      fetchPosts({
        token: params.token,
        filter: params.filter,
        cursor: pageParam ?? undefined,
        signal,
      }),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    select: sanitizeFeedPages,
    staleTime: 30_000,
  });
}
