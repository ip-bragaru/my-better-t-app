import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import type { Post } from "@shared/model/types";

import { PostAuthorRow } from "@features/posts/ui/post-author-row";
import { PostContentSwitcher } from "@features/posts/ui/post-content-switcher";
import { PostImage } from "@features/posts/ui/post-image";
import { PostStatsRow } from "@features/posts/ui/post-stats-row";
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
  const router = useRouter();
  const canGoBack = router.canGoBack();

  return (
    <View className="mb-4 gap-4">
      {/* Back navigation */}
      <Pressable
        onPress={() => canGoBack ? router.back() : router.replace("/")}
        hitSlop={8}
        className="flex-row items-center gap-1.5 self-start h-9.5 mt-1 mb-3.5"
      >
        <Ionicons name="chevron-back" size={18} color="#5831E8" />
        <Text className="text-sm font-semibold text-[#5831E8]">
          {canGoBack ? "Назад" : "К Постам"}
        </Text>
      </Pressable>

      {/* Author row */}
      <PostAuthorRow author={post.author} showVerified={false} />

      {/* Full-bleed cover — only needs -mx-5, author row is above so no -mt-5 */}
      <View className="-mx-4">
        <PostImage uri={post.coverUrl} alt={post.title} rounded={0} />
      </View>

      <PostTextBlock title={post.title} text={post.preview} titleSize="xl" />
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
