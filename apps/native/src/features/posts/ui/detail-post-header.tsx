import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { DESIGN_TOKENS } from "@shared/config/design-tokens";
import type { Post } from "@shared/model/types";

import { PostAuthorRow } from "@features/posts/ui/post-author-row";
import { PostImage } from "@features/posts/ui/post-image";
import { PostStatsRow } from "@features/posts/ui/post-stats-row";
import { PostTextBlock } from "@features/posts/ui/post-text-block";

type DetailPostHeaderProps = {
  post: Post;
  likeSlot: React.ReactNode;
};

export function DetailPostHeader({
  post,
  likeSlot,
}: DetailPostHeaderProps) {
  const router = useRouter();
  const canGoBack = router.canGoBack();

  return (
    <View>
      <View className="px-4">
        <Pressable
          onPress={() => canGoBack ? router.back() : router.replace("/")}
          hitSlop={8}
          className="flex-row items-center gap-1.5 self-start h-9.5 mt-1 mb-3.5"
        >
          <Ionicons name="chevron-back" size={18} color={DESIGN_TOKENS.color.brand.strong} />
          <Text className="text-sm font-semibold text-[var(--color-app-brand-strong)]">
            {canGoBack ? "Назад" : "К Постам"}
          </Text>
        </Pressable>
      </View>

      <View className="gap-2 bg-white px-4 pb-3 pt-4">
        <PostAuthorRow author={post.author} showVerified={false} />
        <View className="-mx-4">
          <PostImage uri={post.coverUrl} alt={post.title} rounded={0} />
        </View>
        <PostTextBlock title={post.title} text={post.preview} />
        <View className="mt-2">
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
