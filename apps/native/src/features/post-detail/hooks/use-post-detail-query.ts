import { useQuery } from "@tanstack/react-query";

import { fetchPostDetail } from "@features/post-detail/api/post-detail-api";
import { queryKeys } from "@shared/lib/query-keys";

export function usePostDetailQuery(params: { token: string; postId?: string }) {
  return useQuery({
    queryKey: queryKeys.posts.detail(params.postId ?? "missing-post-id"),
    enabled: Boolean(params.token && params.postId),
    queryFn: () => fetchPostDetail(params),
  });
}
