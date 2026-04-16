import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useEffect } from "react";
import { Pressable, TextInput, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { cn } from "@shared/lib/cn";
import { formatCompactCount } from "@shared/lib/formatters";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

// Required for animated text on both platforms
Animated.addWhitelistedNativeProps({ text: true });

type LikeButtonProps = {
  isLiked: boolean;
  likesCount: number;
  disabled?: boolean;
  onPress: () => void;
};

export function LikeButton({ isLiked, likesCount, disabled, onPress }: LikeButtonProps) {
  const scale = useSharedValue(1);
  const countScale = useSharedValue(1);
  const animatedCount = useSharedValue(likesCount);

  useEffect(() => {
    animatedCount.value = withTiming(likesCount, { duration: 350 });
  }, [animatedCount, likesCount]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedCountStyle = useAnimatedStyle(() => ({
    transform: [{ scale: countScale.value }],
  }));

  const animatedCountProps = useAnimatedProps(() => ({
    text: `${formatCompactCount(Math.round(animatedCount.value))} likes`,
    defaultValue: `${formatCompactCount(likesCount)} likes`,
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
        "flex-row items-center gap-3 self-start rounded-full px-4 py-3",
        disabled ? "opacity-70" : null,
        isLiked ? "bg-[var(--color-app-brand-soft)]" : "bg-[var(--color-app-surface-muted)]",
      )}
      disabled={disabled}
      onPress={handlePress}
      style={animatedStyle}
    >
      <View
        className={cn(
          "h-[34px] w-[34px] items-center justify-center rounded-full",
          isLiked ? "bg-white" : "bg-[var(--color-app-surface-default)]",
        )}
      >
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={18}
          color={isLiked ? "#5831E8" : "#17131A"}
        />
      </View>
      <Animated.View style={animatedCountStyle}>
        <AnimatedTextInput
          editable={false}
          underlineColorAndroid="transparent"
          animatedProps={animatedCountProps}
          className={cn(
            "p-0 text-sm font-semibold",
            isLiked
              ? "text-[var(--color-app-brand-strong)]"
              : "text-[var(--color-app-text-primary)]",
          )}
        />
      </Animated.View>
    </AnimatedPressable>
  );
}
