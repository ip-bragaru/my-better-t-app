import { useMutation, useQueryClient } from "@tanstack/react-query";

import { togglePostLike } from "@features/post-detail/api/post-detail-api";
import { syncLikeToggle } from "@features/realtime/lib/query-cache-sync";

export function useToggleLikeMutation(params: { token: string; postId?: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => togglePostLike(params),
    onMutate: async () => {
      if (!params.postId) {
        return { previousPost: undefined };
      }

      await queryClient.cancelQueries({ queryKey: ["posts", "detail", params.postId] });

      const previousPost = queryClient.getQueryData<{
        isLiked: boolean;
        likesCount: number;
      }>(["posts", "detail", params.postId]);

      if (!previousPost) {
        return { previousPost };
      }

      const nextState = {
        isLiked: !previousPost.isLiked,
        likesCount: Math.max(previousPost.likesCount + (previousPost.isLiked ? -1 : 1), 0),
      };

      syncLikeToggle(queryClient, params.postId, nextState);

      return { previousPost };
    },
    onError: (_error, _variables, context) => {
      if (!context?.previousPost || !params.postId) {
        return;
      }

      syncLikeToggle(queryClient, params.postId, context.previousPost);
    },
    onSuccess: (data) => {
      if (!params.postId) {
        return;
      }

      syncLikeToggle(queryClient, params.postId, data);
    },
  });
}
