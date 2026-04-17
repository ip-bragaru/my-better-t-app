import { fetchPostDetail } from "@features/post-detail/api/post-detail-api";
import { queryKeys } from "@shared/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export function usePostDetailQuery(params: { token: string; postId?: string }) {
  return useQuery({
    queryKey: queryKeys.posts.detail(params.postId ?? "missing-post-id"),
    enabled: Boolean(params.token && params.postId),
    queryFn: ({ signal }) => fetchPostDetail({ ...params, signal }),
  });
}
