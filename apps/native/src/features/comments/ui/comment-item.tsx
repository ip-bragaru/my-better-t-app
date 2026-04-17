import * as Haptics from "expo-haptics";
import { memo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from "react-native-reanimated";

import { useDesignTokens } from "@shared/config/design-tokens";
import type { Comment } from "@shared/model/types";
import { Avatar } from "@shared/ui/avatar";
import { HeartFilledIcon } from "@shared/ui/heart-filled-icon";
import { HeartOutlineIcon } from "@shared/ui/heart-outline-icon";

type CommentItemProps = {
  comment: Comment;
  likesCount?: number;
  isLiked?: boolean;
};

function CommentItemComponent({ comment, likesCount = 0, isLiked: initialIsLiked = false }: CommentItemProps) {
  const tokens = useDesignTokens();
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
    <View className="flex-row items-start gap-[var(--space-sm)]">
      <Avatar name={comment.author.displayName} uri={comment.author.avatarUrl} size="md" accent />
      <View className="flex-1 flex-row items-start justify-between gap-[var(--space-sm)]">
        <View className="flex-1">
          <Text className="text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)] text-[var(--color-text-primary)] font-bold">
            {comment.author.displayName}
          </Text>
          <Text className="mt-[var(--space-xxs)] text-[length:var(--typography-sm-font-size)] leading-5 text-[var(--color-text-primary)] font-medium">
            {comment.text}
          </Text>
        </View>
        <Pressable onPress={handleLike} hitSlop={10}>
          <Animated.View
            className="flex-row items-center gap-[var(--space-xxs)]"
            style={animatedStyle}
          >
            {liked ? (
              <HeartFilledIcon
                color={tokens.semantic.color.feedback.like.icon}
              />
            ) : (
              <HeartOutlineIcon
                color={tokens.semantic.color.text.stat}
              />
            )}
            <Text className="text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)] text-[var(--color-text-stat)] font-bold lining-nums tabular-nums stacked-fractions">
              {count}
            </Text>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

export const CommentItem = memo(CommentItemComponent);
