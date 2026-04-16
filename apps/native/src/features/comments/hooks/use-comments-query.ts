import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchComments } from "@features/comments/api/comments-api";
import { queryKeys } from "@shared/lib/query-keys";

export function useCommentsQuery(params: { token: string; postId?: string }) {
  return useInfiniteQuery({
    queryKey: queryKeys.comments.list(params.postId ?? "missing-post-id"),
    enabled: Boolean(params.token && params.postId),
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) =>
      fetchComments({
        token: params.token,
        postId: params.postId!,
        cursor: pageParam ?? undefined,
      }),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
  });
}
