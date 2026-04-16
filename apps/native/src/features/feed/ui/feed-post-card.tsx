import { memo } from "react";
import { View } from "react-native";

import type { Post } from "@shared/model/types";
import { SkeletonBlock } from "@shared/ui/skeleton-block";

import { PostAuthorRow } from "@features/posts/ui/post-author-row";
import { PostCard } from "@features/posts/ui/post-card";
import { PaidPostCover } from "@features/posts/ui/paid-post-cover";
import { PostImage } from "@features/posts/ui/post-image";
import { PostStatsRow } from "@features/posts/ui/post-stats-row";
import { PostTextBlock } from "@features/posts/ui/post-text-block";

type FeedPostCardProps = {
  post: Post;
  onPress: (post: Post) => void;
};

function FeedPostCardComponent({ post, onPress }: FeedPostCardProps) {
  const shouldShowMore = post.preview.length > 120;

  if (post.tier === "paid") {
    return (
      <PostCard onPress={() => onPress(post)}>
        <View className="gap-0">
          <View className="px-4 py-4">
            <PostAuthorRow author={post.author} showVerified={false} avatarSize={38} />
          </View>
          <PaidPostCover coverUrl={post.coverUrl} />
          <View className="gap-3 px-4 py-4">
            <SkeletonBlock className="h-[22px] w-[106px] rounded-full bg-[var(--color-app-border-default)]" />
            <SkeletonBlock className="h-7 w-full rounded-full bg-[var(--color-app-border-default)]" />
          </View>
        </View>
      </PostCard>
    );
  }

  return (
    <PostCard onPress={() => onPress(post)}>
      <View className="px-4 pt-4 pb-3">
        <PostAuthorRow author={post.author} showVerified={false} avatarSize={38} />
      </View>
      <PostImage uri={post.coverUrl} alt={post.title} height={236} rounded={0} />
      <View className="gap-3 px-4 py-4">
        <PostTextBlock
          title={post.title}
          text={post.preview}
          maxLines={4}
          actionLabel={shouldShowMore ? "Показать еще" : undefined}
          onActionPress={shouldShowMore ? () => onPress(post) : undefined}
        />
        <PostStatsRow
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          isLiked={post.isLiked}
          variant="feed"
        />
      </View>
    </PostCard>
  );
}

export const FeedPostCard = memo(FeedPostCardComponent);
