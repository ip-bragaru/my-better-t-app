import { FeedAuthorHeader } from "@features/feed/ui/feed-author-header";
import { FeedPaidStub } from "@features/feed/ui/feed-paid-stub";
import { FeedPostStats } from "@features/feed/ui/feed-post-stats";
import { PaidPostCover } from "@features/posts/ui/paid-post-cover";
import { PostCard } from "@features/posts/ui/post-card";
import { PostImage } from "@features/posts/ui/post-image";
import { PostTextBlock } from "@features/posts/ui/post-text-block";
import type { Post } from "@shared/model/types";
import { memo } from "react";
import { View } from "react-native";

type FeedPostCardProps = {
  post: Post;
  onPress: (post: Post) => void;
};

function FeedPostCardComponent({ post, onPress }: FeedPostCardProps) {
  if (post.tier === "paid") {
    return (
      <PostCard
        className="gap-[var(--space-xs)] px-[var(--component-layout-card-padding)] py-[var(--space-sm)]"
        onPress={() => onPress(post)}
      >
        <FeedAuthorHeader author={post.author} />
        <View className="-mx-[var(--component-layout-card-padding)] mt-[var(--space-xs)]">
          <PaidPostCover coverUrl={post.coverUrl} />
        </View>
        <FeedPaidStub />
        <FeedPostStats
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          isLiked={post.isLiked}
        />
      </PostCard>
    );
  }

  return (
    <PostCard
      className="gap-[var(--space-xs)] px-[var(--component-layout-card-padding)] py-[var(--space-sm)]"
      onPress={() => onPress(post)}
    >
      <FeedAuthorHeader author={post.author} />
      <View className="-mx-[var(--component-layout-card-padding)] mt-[var(--space-xs)]">
        <PostImage uri={post.coverUrl} alt={post.title} rounded="none" />
      </View>
      <PostTextBlock title={post.title} text={post.preview} collapsible />
      <FeedPostStats
        likesCount={post.likesCount}
        commentsCount={post.commentsCount}
        isLiked={post.isLiked}
      />
    </PostCard>
  );
}

export const FeedPostCard = memo(FeedPostCardComponent);
