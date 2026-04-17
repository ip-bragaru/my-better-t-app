import { PaidPostCover } from "@features/posts/ui/paid-post-cover";
import { PostAuthorRow } from "@features/posts/ui/post-author-row";
import { PostCard } from "@features/posts/ui/post-card";
import { PostImage } from "@features/posts/ui/post-image";
import { PostStatsRow } from "@features/posts/ui/post-stats-row";
import { PostTextBlock } from "@features/posts/ui/post-text-block";
import type { Post } from "@shared/model/types";
import { SkeletonBlock } from "@shared/ui/skeleton-block";
import { memo } from "react";
import { View } from "react-native";

type FeedPostCardProps = {
  post: Post;
  onPress: (post: Post) => void;
};

function FeedPostCardComponent({ post, onPress }: FeedPostCardProps) {
  if (post.tier === "paid") {
    return (
      <PostCard>
        <View className="gap-0">
          <View className="px-[var(--component-layout-card-padding)] py-[var(--component-layout-card-padding)]">
            <PostAuthorRow author={post.author} showVerified={false} />
          </View>
          <PaidPostCover coverUrl={post.coverUrl} />
          <View className="gap-[var(--space-sm)] px-[var(--component-layout-card-padding)] py-[var(--component-layout-card-padding)]">
            <SkeletonBlock className="h-6.5 w-full max-w-41 rounded-full bg-[var(--color-border-default)]" />
            <SkeletonBlock className="h-10 w-full rounded-full bg-[var(--color-border-default)]" />
          </View>
        </View>
      </PostCard>
    );
  }

  return (
    <PostCard
      className="gap-[var(--space-xs)] px-[var(--component-layout-card-padding)] py-[var(--space-sm)]"
      onPress={() => onPress(post)}
    >
      <PostAuthorRow author={post.author} showVerified={false} />
      <View className="-mx-[var(--component-layout-card-padding)] mt-[var(--space-xs)]">
        <PostImage uri={post.coverUrl} alt={post.title} rounded="none" />
      </View>
      <PostTextBlock title={post.title} text={post.preview} collapsible />
      <PostStatsRow
        likesCount={post.likesCount}
        commentsCount={post.commentsCount}
        isLiked={post.isLiked}
        variant="feed"
      />
    </PostCard>
  );
}

export const FeedPostCard = memo(FeedPostCardComponent);
