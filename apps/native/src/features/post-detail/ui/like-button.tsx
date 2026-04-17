import * as Haptics from "expo-haptics";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { useDesignTokens } from "@shared/config/design-tokens";
import { cn } from "@shared/lib/cn";
import { formatCompactCount } from "@shared/lib/formatters";
import { HeartFilledIcon } from "@shared/ui/heart-filled-icon";
import { HeartOutlineIcon } from "@shared/ui/heart-outline-icon";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type LikeButtonProps = {
  isLiked: boolean;
  likesCount: number;
  disabled?: boolean;
  onPress: () => void;
};

export function LikeButton({ isLiked, likesCount, disabled, onPress }: LikeButtonProps) {
  const tokens = useDesignTokens();
  const scale = useSharedValue(1);
  const countScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedCountStyle = useAnimatedStyle(() => ({
    transform: [{ scale: countScale.value }],
  }));

  const handlePress = () => {
    Haptics.selectionAsync();
    scale.value = withSequence(withTiming(0.92, { duration: 80 }), withSpring(1));
    countScale.value = withSequence(withTiming(1.14, { duration: 120 }), withSpring(1));
    onPress();
  };

  return (
    <AnimatedPressable
      className={cn(
        "flex-row self-start items-center gap-[var(--component-like-button-gap)] rounded-full px-[var(--component-like-button-padding-x)] py-[var(--component-like-button-padding-y)]",
        disabled ? "opacity-[var(--opacity-muted)]" : null,
        isLiked ? "bg-[var(--color-brand-soft)]" : "bg-[var(--color-surface-muted)]",
      )}
      disabled={disabled}
      onPress={handlePress}
      style={animatedStyle}
    >
      <View
        className={cn(
          "h-[var(--component-like-button-icon-size)] w-[var(--component-like-button-icon-size)] items-center justify-center rounded-full",
          isLiked ? "bg-[var(--color-text-inverse)]" : "bg-[var(--color-surface-default)]",
        )}
        >
        {isLiked ? (
          <HeartFilledIcon
            color={tokens.semantic.color.brand.strong}
          />
        ) : (
          <HeartOutlineIcon
            color={tokens.semantic.color.text.primary}
          />
        )}
      </View>
      <Animated.View style={animatedCountStyle}>
        <Text
          className={cn(
            "text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)] font-semibold",
            isLiked
              ? "text-[var(--color-brand-strong)]"
              : "text-[var(--color-text-primary)]",
          )}
        >
          {formatCompactCount(likesCount)} likes
        </Text>
      </Animated.View>
    </AnimatedPressable>
  );
}
