import { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View, type LayoutChangeEvent } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { cn } from "@shared/lib/cn";

const AnimatedText = Animated.createAnimatedComponent(Text);

export type SegmentedControlOption<TValue extends string> = {
  label: string;
  value: TValue;
};

type SegmentedControlProps<TValue extends string> = {
  value: TValue;
  options: Array<SegmentedControlOption<TValue>>;
  onChange: (value: TValue) => void;
  disabled?: boolean;
};

export function SegmentedControl<TValue extends string>({
  value,
  options,
  onChange,
  disabled = false,
}: SegmentedControlProps<TValue>) {
  const [containerWidth, setContainerWidth] = useState(0);
  const activeIndex = useMemo(
    () => Math.max(options.findIndex((option) => option.value === value), 0),
    [options, value],
  );
  const translateX = useSharedValue(0);

  const tabWidth = containerWidth > 0 ? (containerWidth - 8) / options.length : 0;

  useEffect(() => {
    if (!tabWidth) {
      return;
    }

    translateX.value = withTiming(activeIndex * tabWidth, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [activeIndex, tabWidth, translateX]);

  const activePillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      onLayout={handleLayout}
      className="flex-row rounded-full border border-[var(--color-app-border-default)] bg-[var(--color-app-surface-default)] p-1"
      style={disabled ? { opacity: 0.45 } : undefined}
      pointerEvents={disabled ? "none" : "auto"}
    >
      {tabWidth ? (
        <Animated.View
          pointerEvents="none"
          className="absolute bottom-1 left-1 top-1 rounded-full bg-[var(--color-app-brand-primary)]"
          style={[
            {
              width: tabWidth,
            },
            activePillStyle,
          ]}
        />
      ) : null}
      {options.map((option) => (
        <SegmentedControlItem
          key={option.value}
          isActive={option.value === value}
          label={option.label}
          onPress={() => onChange(option.value)}
        />
      ))}
    </View>
  );
}

type SegmentedControlItemProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export function SegmentedControlItem({
  label,
  isActive,
  onPress,
}: SegmentedControlItemProps) {
  const progress = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    });
  }, [isActive, progress]);

  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      ["#6F6470", "#ffffff"],
    ),
    transform: [{ scale: 0.98 + progress.value * 0.02 }],
  }));

  return (
    <Pressable
      className={cn("flex-1 rounded-full px-4 py-3")}
      onPress={onPress}
    >
      <AnimatedText
        className="text-center text-sm font-semibold"
        style={labelStyle}
      >
        {label}
      </AnimatedText>
    </Pressable>
  );
}
