import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { useDesignTokens } from "@shared/config/design-tokens";
import type { Post } from "@shared/model/types";

import { PaidPostCover } from "@features/posts/ui/paid-post-cover";
import { PostAuthorRow } from "@features/posts/ui/post-author-row";
import { PostImage } from "@features/posts/ui/post-image";
import { PostStatsRow } from "@features/posts/ui/post-stats-row";
import { PostTextBlock } from "@features/posts/ui/post-text-block";

type DetailPostHeaderProps = {
  post: Post;
  likeSlot: React.ReactNode;
};

export function DetailPostHeader({ post, likeSlot }: DetailPostHeaderProps) {
  const router = useRouter();
  const canGoBack = router.canGoBack();
  const tokens = useDesignTokens();

  return (
    <View>
      <View className="px-[var(--component-layout-card-padding)]">
        <Pressable
          onPress={() => (canGoBack ? router.back() : router.replace("/"))}
          hitSlop={8}
          className="mt-[var(--space-xs)] mb-[var(--space-sm)] flex-row h-[var(--size-control-sm)] self-start items-center gap-[var(--space-xs)]"
        >
          <Ionicons name="chevron-back" size={18} color={tokens.semantic.color.brand.strong} />
          <Text className="text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)] font-semibold text-[var(--color-brand-strong)]">
            {canGoBack ? "Назад" : "К Постам"}
          </Text>
        </Pressable>
      </View>

      <View className="gap-[var(--space-xs)] bg-[var(--color-surface-default)] px-[var(--component-layout-card-padding)] pb-[var(--space-sm)] pt-[var(--space-md)]">
        <PostAuthorRow author={post.author} showVerified={false} />

        {post.tier === "paid" ? (
          <>
            <PostTextBlock title={post.title} text="" />
            <View className="-mx-[var(--component-layout-card-padding)]">
              <PaidPostCover coverUrl={post.coverUrl} />
            </View>
          </>
        ) : (
          <>
            <View className="-mx-[var(--component-layout-card-padding)]">
              <PostImage uri={post.coverUrl} alt={post.title} rounded="none" />
            </View>
            <PostTextBlock title={post.title} text={post.preview} />
          </>
        )}

        <View className="mt-[var(--space-xs)]">
          <PostStatsRow
            likesCount={post.likesCount}
            commentsCount={post.commentsCount}
            isLiked={post.isLiked}
            likeSlot={likeSlot}
            variant="feed"
          />
        </View>
      </View>
    </View>
  );
}
