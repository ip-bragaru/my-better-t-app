import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { memo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from "react-native-reanimated";

import { DESIGN_TOKENS } from "@shared/config/design-tokens";
import type { Comment } from "@shared/model/types";
import { Avatar } from "@shared/ui/avatar";

type CommentItemProps = {
  comment: Comment;
  likesCount?: number;
  isLiked?: boolean;
};

function CommentItemComponent({ comment, likesCount = 0, isLiked: initialIsLiked = false }: CommentItemProps) {
  const [liked, setLiked] = useState(initialIsLiked);
  const [count, setCount] = useState(likesCount);

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handleLike = () => {
    Haptics.selectionAsync();
    scale.value = withSequence(withTiming(0.7, { duration: 80 }), withSpring(1, { damping: 18, stiffness: 200 }));
    setLiked((prev) => {
      setCount((c) => prev ? c - 1 : c + 1);
      return !prev;
    });
  };

  return (
    <View className="flex-row items-start gap-3">
      <Avatar name={comment.author.displayName} uri={comment.author.avatarUrl} size={44} accent />
      <View className="flex-1 flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-[15px] leading-5 text-[var(--color-app-text-primary)] font-bold">
            {comment.author.displayName}
          </Text>
          <Text className="mt-1 text-sm leading-5 text-[var(--color-app-text-secondary)] font-medium">
            {comment.text}
          </Text>
        </View>
        <Pressable onPress={handleLike} hitSlop={10}>
          <Animated.View className="mt-0.5 items-center gap-1" style={animatedStyle}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={18}
              color={liked ? DESIGN_TOKENS.color.feedback.like.icon : DESIGN_TOKENS.color.text.tertiary}
            />
            <Text className="text-xs text-[var(--color-app-text-tertiary)] font-medium">{count}</Text>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

export const CommentItem = memo(CommentItemComponent);
