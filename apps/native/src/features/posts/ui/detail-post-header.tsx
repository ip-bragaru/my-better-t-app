import { View } from "react-native";

import type { Post } from "@shared/model/types";
import { formatRelativeDate } from "@shared/lib/formatters";

import { PostAuthorRow } from "@features/posts/ui/post-author-row";
import { PostContentSwitcher } from "@features/posts/ui/post-content-switcher";
import { PostImage } from "@features/posts/ui/post-image";
import { PostStatsRow } from "@features/posts/ui/post-stats-row";
import { PostTierBadge } from "@features/posts/ui/post-tier-badge";
import { PostTextBlock } from "@features/posts/ui/post-text-block";

type DetailPostHeaderProps = {
  post: Post;
  likeSlot: React.ReactNode;
  onDonatePress?: () => void;
};

export function DetailPostHeader({
  post,
  likeSlot,
  onDonatePress,
}: DetailPostHeaderProps) {
  return (
    <View className="mb-4 gap-5">
      <PostImage uri={post.coverUrl} alt={post.title} height={260} />
      <PostAuthorRow
        author={post.author}
        avatarSize={46}
        subtitle={`@${post.author.username} · ${formatRelativeDate(post.createdAt)}`}
      />
      <View className="gap-3">
        <PostTierBadge tier={post.tier} />
        <PostTextBlock title={post.title} text={post.preview} titleSize="xl" />
      </View>
      <PostStatsRow
        likesCount={post.likesCount}
        commentsCount={post.commentsCount}
        isLiked={post.isLiked}
        likeSlot={likeSlot}
      />
      <PostContentSwitcher post={post} mode="detail" onDonatePress={onDonatePress} />
    </View>
  );
}
