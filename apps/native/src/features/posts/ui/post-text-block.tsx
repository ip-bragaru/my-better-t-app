import { useDesignTokens } from "@shared/config/design-tokens";
import { cn } from "@shared/lib/cn";
import { TextLink } from "@shared/ui/text-link";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import type { GestureResponderEvent, LayoutChangeEvent, TextLayoutEvent } from "react-native";
import { Pressable, Text, View } from "react-native";

const COLLAPSED_LINES = 2;
// Matches --color-surface-default token

const EXPAND_LABEL = "Показать еще";
const EXPAND_FADE_WIDTH = 56;

type PostTextBlockProps = {
  title?: string;
  text: string;
  titleSize?: "lg" | "xl";
  maxLines?: number;
  actionLabel?: string;
  onActionPress?: () => void;
  collapsible?: boolean;
};

export function PostTextBlock({
  title,
  text,
  titleSize = "lg",
  maxLines,
  actionLabel,
  onActionPress,
  collapsible = false,
}: PostTextBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);
  const [measured, setMeasured] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (!collapsible || text.length === 0) {
      setIsExpanded(false);
      return;
    }

    setIsExpanded(false);
  }, [collapsible, text]);

  useEffect(() => {
    setIsOverflowing(false);
    setLineHeight(0);
    setMeasured(!collapsible || text.length === 0 || contentWidth === 0);
  }, [collapsible, contentWidth, text]);

  const handleMeasure = (e: TextLayoutEvent) => {
    const lines = e.nativeEvent.lines;
    setMeasured(true);
    if (lines.length > 0) setLineHeight(lines[0].height);
    setIsOverflowing(lines.length > COLLAPSED_LINES);
  };

  const handleTextContainerLayout = (e: LayoutChangeEvent) => {
    const nextWidth = Math.round(e.nativeEvent.layout.width);
    setContentWidth((currentWidth) => (currentWidth === nextWidth ? currentWidth : nextWidth));
  };

  const handleExpandPress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    setIsExpanded(true);
  };

  const textNumberOfLines = collapsible ? (isExpanded ? undefined : COLLAPSED_LINES) : maxLines;
  const showExpandButton = collapsible && !isExpanded && isOverflowing;

  const tokens = useDesignTokens();
  const CARD_SURFACE = tokens.semantic.color.surface.default;
  return (
    <View className="gap-[var(--space-xs)]">
      {title ? (
        <Text
          className={cn(
            "font-bold text-[var(--color-text-primary)] lining-nums tabular-nums stacked-fractions",
            titleSize === "xl"
              ? "text-[length:var(--typography-xl-font-size)] leading-[var(--typography-xl-line-height)] tracking-[var(--typography-xl-letter-spacing)]"
              : "text-[length:var(--typography-lg-font-size)] leading-[var(--typography-lg-line-height)] tracking-[var(--typography-lg-letter-spacing)]",
          )}
        >
          {title}
        </Text>
      ) : null}

      {/* Text with inline "show more" overlay at the end of line 2 */}
      <View onLayout={handleTextContainerLayout}>
        <Text
          className="text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)] tracking-[var(--typography-md-letter-spacing)] text-[var(--color-text-primary)] font-medium lining-nums tabular-nums stacked-fractions"
          numberOfLines={textNumberOfLines}
        >
          {text}
        </Text>

        {showExpandButton && lineHeight > 0 ? (
          <View
            pointerEvents="box-none"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              flexDirection: "row",
              alignItems: "center",
              height: lineHeight,
            }}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.92)", CARD_SURFACE]}
              locations={[0, 0.7, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: EXPAND_FADE_WIDTH, height: lineHeight }}
            />
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={handleExpandPress}
              style={{ backgroundColor: CARD_SURFACE, paddingLeft: 8 }}
              className="active:opacity-70"
            >
              <Text className="text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)] tracking-[var(--typography-md-letter-spacing)] text-[var(--color-brand-primary)] font-semibold lining-nums tabular-nums stacked-fractions">
                {EXPAND_LABEL}
              </Text>
            </Pressable>
          </View>
        ) : null}

        {/* Hidden once-off measurement to detect overflow */}
        {collapsible && !measured && text.length > 0 ? (
          <Text
            className="text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)] tracking-[var(--typography-md-letter-spacing)] font-medium"
            style={{ position: "absolute", opacity: 0, left: 0, right: 0 }}
            onTextLayout={handleMeasure}
            aria-hidden
          >
            {text}
          </Text>
        ) : null}
      </View>

      {actionLabel && onActionPress ? (
        <TextLink label={actionLabel} onPress={onActionPress} />
      ) : null}
    </View>
  );
}
