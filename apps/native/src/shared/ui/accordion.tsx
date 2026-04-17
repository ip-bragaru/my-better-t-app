import { useEffect, useState } from "react";
import { Pressable, Text, View, type PressableProps } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { tv } from "tailwind-variants";

import { cn } from "@shared/lib/cn";

const accordionTrigger = tv({
  base: "flex-row items-center justify-between gap-[var(--space-sm)] py-[var(--component-layout-card-padding)]",
  variants: {
    disabled: {
      true: "opacity-[var(--opacity-disabled)]",
    },
  },
});

const accordionLabel = tv({
  base: "flex-1 text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)] font-semibold text-[var(--color-text-primary)]",
  variants: {
    open: {
      true: "text-[var(--color-brand-primary)]",
    },
  },
});

// ─── Chevron icon ─────────────────────────────────────────────────────────────

function Chevron({ open }: { open: boolean }) {
  const rotation = useSharedValue(open ? 90 : 0);

  useEffect(() => {
    rotation.value = withTiming(open ? 90 : 0, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
  }, [open, rotation]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={style}>
      <View className="h-5 w-5 items-center justify-center">
        <View className="relative h-3 w-3">
          <View
            className="absolute left-0 top-[3px] h-[2px] w-[9px] rounded-full bg-[var(--color-brand-primary)]"
            style={{ transform: [{ rotate: "45deg" }, { translateX: 1 }] }}
          />
          <View
            className="absolute bottom-[3px] left-0 h-[2px] w-[9px] rounded-full bg-[var(--color-brand-primary)]"
            style={{ transform: [{ rotate: "-45deg" }, { translateX: 1 }] }}
          />
        </View>
      </View>
    </Animated.View>
  );
}

// ─── Animated content wrapper ─────────────────────────────────────────────────

function AccordionContent({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  const height = useSharedValue(0);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    if (!measuredHeight) return;
    height.value = withTiming(open ? measuredHeight : 0, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [open, measuredHeight, height]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: "hidden",
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View
        onLayout={(e) => {
          const h = e.nativeEvent.layout.height;
          if (h > 0 && h !== measuredHeight) {
            setMeasuredHeight(h);
          }
        }}
        className="pb-[var(--component-layout-card-padding)]"
      >
        {children}
      </View>
    </Animated.View>
  );
}

// ─── AccordionItem ────────────────────────────────────────────────────────────

export type AccordionItemProps = {
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
  defaultOpen?: boolean;
} & Omit<PressableProps, "style" | "onPress" | "disabled">;

export function AccordionItem({
  label,
  children,
  disabled = false,
  defaultOpen = false,
  ...props
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <View className="border-b border-[var(--color-border-default)]">
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open, disabled }}
        disabled={disabled}
        onPress={() => setOpen((v) => !v)}
        {...props}
        className={cn(accordionTrigger({ disabled }), "active:opacity-70")}
      >
        <Text className={accordionLabel({ open })}>{label}</Text>
        <Chevron open={open} />
      </Pressable>
      <AccordionContent open={open}>{children}</AccordionContent>
    </View>
  );
}

// ─── Accordion container ──────────────────────────────────────────────────────

type AccordionProps = {
  children: React.ReactNode;
  className?: string;
};

export function Accordion({ children, className }: AccordionProps) {
  return (
    <View
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border-default)] px-[var(--component-layout-card-padding)]",
        className,
      )}
    >
      {children}
    </View>
  );
}
