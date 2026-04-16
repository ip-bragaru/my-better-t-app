import { useEffect } from "react";
import { View, type ViewProps } from "react-native";

import { DESIGN_TOKENS } from "@shared/config/design-tokens";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export function SkeletonBlock({ style, ...props }: ViewProps) {
  const opacity = useSharedValue(0.45);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.9, { duration: 850, easing: Easing.inOut(Easing.quad) }),
        withTiming(0.45, { duration: 850, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <AnimatedView
      {...props}
      style={[
        {
          borderRadius: 16,
          backgroundColor: DESIGN_TOKENS.color.feedback.skeleton,
        },
        style,
        animatedStyle,
      ]}
    />
  );
}
