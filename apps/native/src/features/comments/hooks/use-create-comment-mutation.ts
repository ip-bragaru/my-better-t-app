import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createComment } from "@features/comments/api/comments-api";
import { syncCommentAdded } from "@features/realtime/lib/query-cache-sync";

export function useCreateCommentMutation(params: { token: string; postId?: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) =>
      createComment({
        token: params.token,
        postId: params.postId,
        text,
      }),
    onSuccess: (comment) => {
      syncCommentAdded(queryClient, comment);
    },
  });
}
