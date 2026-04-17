import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchPosts } from "@features/feed/api/feed-api";
import { queryKeys } from "@shared/lib/query-keys";
import type { FeedFilter } from "@shared/model/types";

export function useFeedQuery(params: { token: string; filter: FeedFilter }) {
  return useInfiniteQuery({
    queryKey: queryKeys.feed.list(params.filter),
    enabled: Boolean(params.token),
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) =>
      fetchPosts({
        token: params.token,
        filter: params.filter,
        cursor: pageParam ?? undefined,
      }),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    staleTime: 30_000,
  });
}
