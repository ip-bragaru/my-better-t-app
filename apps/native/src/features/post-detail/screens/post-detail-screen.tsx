import { observer } from "mobx-react-lite";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

import { useCommentsQuery } from "@features/comments/hooks/use-comments-query";
import { useCreateCommentMutation } from "@features/comments/hooks/use-create-comment-mutation";
import { CommentList } from "@features/comments/ui/comment-list";
import { CommentComposer } from "@features/comments/ui/comment-composer";
import { CommentsSectionHeader } from "@features/comments/ui/comments-section-header";
import { DetailPostHeader } from "@features/posts/ui/detail-post-header";
import { useToggleLikeMutation } from "@features/post-detail/hooks/use-toggle-like-mutation";
import { PostDetailErrorState } from "@features/post-detail/ui/post-detail-error-state";
import { usePostDetailQuery } from "@features/post-detail/hooks/use-post-detail-query";
import { PostDetailSkeleton } from "@features/post-detail/ui/post-detail-skeleton";
import { useSession } from "@features/session/hooks/use-session";
import { useDesignTokens } from "@shared/config/design-tokens";
import { formatCompactCount } from "@shared/lib/formatters";
import { ActionChip } from "@shared/ui/action-chip";
import { Button } from "@shared/ui/button";
import { HeartFilledIcon } from "@shared/ui/heart-filled-icon";
import { HeartOutlineIcon } from "@shared/ui/heart-outline-icon";
import { PaginationFooter } from "@shared/ui/pagination-footer";
import { ScreenContainer } from "@shared/ui/screen-container";
import { EmptyState, ErrorState, LoadingState } from "@shared/ui/screen-state";

export const PostDetailScreen = observer(function PostDetailScreen() {
  const params = useLocalSearchParams<{
    postId: string;
    authorName?: string;
    authorAvatarUrl?: string;
  }>();
  const postId = normalizeRouteParam(params.postId);
  const authorName = normalizeRouteParam(params.authorName);
  const authorAvatarUrl = normalizeRouteParam(params.authorAvatarUrl);
  const { token, isReady } = useSession();
  const tokens = useDesignTokens();

  const postQuery = usePostDetailQuery({
    token: token ?? "",
    postId,
  });

  const commentsQuery = useCommentsQuery({
    token: token ?? "",
    postId,
  });

  const likeMutation = useToggleLikeMutation({
    token: token ?? "",
    postId,
  });

  const createCommentMutation = useCreateCommentMutation({
    token: token ?? "",
    postId,
  });

  const comments = useMemo(
    () => {
      const items = commentsQuery.data?.pages.flatMap((page) => page.items) ?? [];
      const seen = new Set<string>();

      return items.filter((comment) => {
        if (seen.has(comment.id)) {
          return false;
        }

        seen.add(comment.id);
        return true;
      });
    },
    [commentsQuery.data],
  );

  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (postQuery.data?.tier === "paid") {
      router.replace("/");
    }
  }, [postQuery.data, router]);

  const {
    hasNextPage: commentsHasNextPage,
    isFetchingNextPage: commentsIsFetchingNextPage,
    fetchNextPage: commentsFetchNextPage,
    refetch: commentsRefetch,
  } = commentsQuery;

  const handleEndReached = useCallback(() => {
    if (!commentsHasNextPage || commentsIsFetchingNextPage) {
      return;
    }

    commentsFetchNextPage();
  }, [commentsHasNextPage, commentsIsFetchingNextPage, commentsFetchNextPage]);

  const handleSubmitComment = useCallback(async (value: string) => {
    await createCommentMutation.mutateAsync(value);
  }, [createCommentMutation]);

  const handleRefresh = useCallback(async () => {
    setIsManualRefreshing(true);
    try {
      await Promise.all([postQuery.refetch(), commentsRefetch()]);
    } finally {
      setIsManualRefreshing(false);
    }
  }, [commentsRefetch, postQuery]);

  const renderFooter = useCallback(() => {
    if (comments.length > 0) {
      return (
        <PaginationFooter
          isFetchingNextPage={commentsQuery.isFetchingNextPage}
          hasMore={Boolean(commentsQuery.hasNextPage)}
        />
      );
    }

    return undefined;
  }, [comments.length, commentsQuery.hasNextPage]);

  const renderContent = () => {
    if (!isReady) {
      return <LoadingState message="Preparing your session..." />;
    }

    if (!postId) {
      return (
        <ScreenContainer className="items-center justify-center px-[var(--space-xxxl)]">
          <Text className="text-center text-[length:var(--typography-lg-font-size)] leading-[var(--typography-lg-line-height)] text-[var(--color-text-primary)] font-semibold">
            Invalid post link
          </Text>
          <Text className="mt-[var(--space-sm)] text-center text-[length:var(--typography-sm-font-size)] leading-6 text-[var(--color-text-secondary)] font-medium">
            This detail route is missing a valid post identifier.
          </Text>
          <Link href="../" asChild>
            <Button className="mt-[var(--space-lg)]" label="Back to feed" size="sm" />
          </Link>
        </ScreenContainer>
      );
    }

    if (postQuery.isLoading) {
      return (
        <ScreenContainer>
          <PostDetailSkeleton />
        </ScreenContainer>
      );
    }

    if (postQuery.error || !postQuery.data) {
      return (
        <PostDetailErrorState
          authorName={authorName}
          authorAvatarUrl={authorAvatarUrl}
          onRetry={postQuery.refetch}
        />
      );
    }

    const post = postQuery.data;

    return (
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <CommentList
          comments={comments}
          onEndReached={handleEndReached}
          isRefreshing={isManualRefreshing}
          onRefresh={handleRefresh}
          postHeader={
            <DetailPostHeader
              post={post}
              likeSlot={
                <ActionChip
                  active={post.isLiked}
                  size="sm"
                  label={formatCompactCount(post.likesCount)}
                  icon={
                    post.isLiked ? (
                      <HeartFilledIcon
                        color={tokens.semantic.color.feedback.like.surface}
                      />
                    ) : (
                      <HeartOutlineIcon
                        color={tokens.semantic.color.text.stat}
                      />
                    )
                  }
                  onPress={() => likeMutation.mutate()}
                  disabled={likeMutation.isPending}
                />
              }
            />
          }
          commentsHeader={<CommentsSectionHeader count={comments.length} />}
          emptyState={
            commentsQuery.isLoading ? (
              <PostDetailSkeleton />
            ) : commentsQuery.error ? (
              <ErrorState error={commentsQuery.error} onRetry={commentsQuery.refetch} />
            ) : (
              <EmptyState
                title="Пока без комментариев"
                message="Начните обсуждение. Новые сообщения появятся у всех подключенных клиентов."
              />
            )
          }
          footer={
            renderFooter()
          }
        />
        <CommentComposer
          isSubmitting={createCommentMutation.isPending}
          onSubmit={handleSubmitComment}
        />
      </KeyboardAvoidingView>
    );
  };

  return (
    <View className="flex-1 bg-[var(--color-canvas-default)]">
      <Stack.Screen options={{ headerShown: false }} />
      {renderContent()}
    </View>
  );
});

function normalizeRouteParam(param: string | string[] | undefined) {
  if (Array.isArray(param)) {
    return param[0];
  }

  return param;
}
