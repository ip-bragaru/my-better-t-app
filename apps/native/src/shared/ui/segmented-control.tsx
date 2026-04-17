import { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View, type LayoutChangeEvent } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useDesignTokens } from "@shared/config/design-tokens";
import { cn } from "@shared/lib/cn";
import { mergeRecipeSlots, type RecipeClassNames, tv } from "@shared/ui/recipe";

const AnimatedText = Animated.createAnimatedComponent(Text);
const segmentedControlRecipe = tv({
  slots: {
    root: "flex-row rounded-full border border-[var(--color-border-default)] bg-[var(--color-surface-default)]",
    pill: "pointer-events-none absolute inset-y-0 left-0 rounded-full",
    item: "flex-1 rounded-full p-[var(--component-segmented-control-item-padding)]",
    label:
      "text-center text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)] lining-nums tabular-nums",
  },
  variants: {
    disabled: {
      true: {
        root: "pointer-events-none opacity-[var(--opacity-disabled)]",
      },
    },
    active: {
      true: {
        label: "font-bold",
      },
      false: {
        label: "font-medium",
      },
    },
  },
  defaultVariants: {
    disabled: false,
    active: false,
  },
});

export type SegmentedControlOption<TValue extends string> = {
  label: string;
  value: TValue;
};

type SegmentedControlProps<TValue extends string> = {
  value: TValue;
  options: Array<SegmentedControlOption<TValue>>;
  onChange: (value: TValue) => void;
  disabled?: boolean;
  classNames?: RecipeClassNames<"root" | "pill" | "item" | "label">;
  className?: string;
};

export function SegmentedControl<TValue extends string>({
  value,
  options,
  onChange,
  disabled = false,
  className,
  classNames,
}: SegmentedControlProps<TValue>) {
  const tokens = useDesignTokens();
  const [containerWidth, setContainerWidth] = useState(0);
  const activeIndex = useMemo(
    () => Math.max(options.findIndex((option) => option.value === value), 0),
    [options, value],
  );
  const translateX = useSharedValue(0);
  const rootSlots = mergeRecipeSlots(segmentedControlRecipe({ disabled }), classNames);

  const tabWidth = containerWidth > 0 ? containerWidth / options.length : 0;

  useEffect(() => {
    if (!tabWidth) {
      return;
    }

    translateX.value = withTiming(activeIndex * tabWidth, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [activeIndex, tabWidth, translateX]);

  const pillPressProgress = useSharedValue(0);

  const activePillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    backgroundColor: interpolateColor(
      pillPressProgress.value,
      [0, 1],
      [tokens.semantic.color.brand.primary, tokens.semantic.color.brand.pressed],
    ),
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      onLayout={handleLayout}
      className={cn(rootSlots.root, className)}
    >
      {tabWidth ? (
        <Animated.View
          className={rootSlots.pill}
          style={[{ width: tabWidth }, activePillStyle]}
        />
      ) : null}
      {options.map((option) => (
        <SegmentedControlItem
          key={option.value}
          classNames={classNames}
          isActive={option.value === value}
          label={option.label}
          onPress={() => onChange(option.value)}
          onPressIn={
            option.value === value
              ? () => { pillPressProgress.value = withTiming(1, { duration: 100 }); }
              : undefined
          }
          onPressOut={
            option.value === value
              ? () => { pillPressProgress.value = withTiming(0, { duration: 200 }); }
              : undefined
          }
        />
      ))}
    </View>
  );
}

type SegmentedControlItemProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  classNames?: RecipeClassNames<"root" | "pill" | "item" | "label">;
};

export function SegmentedControlItem({
  label,
  isActive,
  onPress,
  onPressIn,
  onPressOut,
  classNames,
}: SegmentedControlItemProps) {
  const tokens = useDesignTokens();
  const progress = useSharedValue(isActive ? 1 : 0);
  const slots = mergeRecipeSlots(segmentedControlRecipe({ active: isActive }), classNames);

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
      [tokens.semantic.color.text.secondary, tokens.semantic.color.text.inverse],
    ),
    transform: [{ scale: 0.98 + progress.value * 0.02 }],
  }));

  return (
    <Pressable
      className={slots.item}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <AnimatedText className={slots.label} style={labelStyle}>
        {label}
      </AnimatedText>
    </Pressable>
  );
}
