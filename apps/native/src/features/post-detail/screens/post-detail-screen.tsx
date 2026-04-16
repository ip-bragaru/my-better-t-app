import { Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";

import { useCommentsQuery } from "@features/comments/hooks/use-comments-query";
import { useCreateCommentMutation } from "@features/comments/hooks/use-create-comment-mutation";
import { CommentList } from "@features/comments/ui/comment-list";
import { CommentComposer } from "@features/comments/ui/comment-composer";
import { CommentsSectionHeader } from "@features/comments/ui/comments-section-header";
import { DetailPostHeader } from "@features/posts/ui/detail-post-header";
import { useToggleLikeMutation } from "@features/post-detail/hooks/use-toggle-like-mutation";
import { usePostDetailQuery } from "@features/post-detail/hooks/use-post-detail-query";
import { PostDetailSkeleton } from "@features/post-detail/ui/post-detail-skeleton";
import { useSession } from "@features/session/hooks/use-session";
import { DESIGN_TOKENS } from "@shared/config/design-tokens";
import { formatCompactCount } from "@shared/lib/formatters";
import { ActionChip } from "@shared/ui/action-chip";
import { ScreenContainer } from "@shared/ui/screen-container";
import { PaginationFooter } from "@shared/ui/pagination-footer";
import { EmptyState, ErrorState, LoadingState } from "@shared/ui/screen-state";

export const PostDetailScreen = observer(function PostDetailScreen() {
  const params = useLocalSearchParams<{ postId: string }>();
  const postId = normalizePostId(params.postId);
  const { token, isReady } = useSession();

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

  const handleRefresh = useCallback(() => {
    postQuery.refetch();
    commentsRefetch();
  }, [commentsRefetch, postQuery]);

  const renderContent = () => {
    if (!isReady) {
      return <LoadingState message="Preparing your session..." />;
    }

    if (!postId) {
      return (
        <ScreenContainer className="items-center justify-center px-8">
          <Text className="text-center text-2xl text-[var(--color-app-text-primary)] font-semibold">
            Invalid post link
          </Text>
          <Text className="mt-3 text-center text-sm leading-6 text-[var(--color-app-text-secondary)] font-medium">
            This detail route is missing a valid post identifier.
          </Text>
          <Link href="../" asChild>
            <Pressable className="mt-5 rounded-full bg-[var(--color-app-text-primary)] px-5 py-3">
              <Text className="text-sm text-[var(--color-app-text-inverse)] font-semibold">
                Back to feed
              </Text>
            </Pressable>
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
      return <ErrorState error={postQuery.error} onRetry={postQuery.refetch} />;
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
          isRefreshing={postQuery.isRefetching || commentsQuery.isRefetching}
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
                    <Ionicons
                      name={post.isLiked ? "heart" : "heart-outline"}
                      size={16}
                      color={post.isLiked ? DESIGN_TOKENS.color.feedback.like.surface : DESIGN_TOKENS.color.text.primary}
                    />
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
            comments.length > 0 ? (
              <PaginationFooter
                isFetchingNextPage={commentsQuery.isFetchingNextPage}
                hasMore={Boolean(commentsQuery.hasNextPage)}
              />
            ) : null
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
    <View className="flex-1 bg-[var(--color-app-canvas-default)]">
      <Stack.Screen options={{ headerShown: false }} />
      {renderContent()}
    </View>
  );
});

function normalizePostId(param: string | string[] | undefined) {
  if (Array.isArray(param)) {
    return param[0];
  }

  return param;
}
