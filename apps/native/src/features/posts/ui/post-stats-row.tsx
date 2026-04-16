import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { DESIGN_TOKENS } from "@shared/config/design-tokens";
import { formatCompactCount, formatRelativeDate } from "@shared/lib/formatters";
import { ActionChip } from "@shared/ui/action-chip";

type PostStatsRowProps = {
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  createdAt?: string;
  likeSlot?: React.ReactNode;
  variant?: "feed" | "detail";
};

export function PostStatsRow({
  likesCount,
  commentsCount,
  isLiked,
  createdAt,
  likeSlot,
  variant = "detail",
}: PostStatsRowProps) {
  return (
    <View className="gap-3">
      {variant === "detail" && createdAt ? (
        <Text className="text-xs uppercase tracking-[1.4px] text-[var(--color-app-text-tertiary)] font-medium">
          {formatRelativeDate(createdAt)}
        </Text>
      ) : null}
      <View className="flex-row flex-wrap items-center gap-3">
        {likeSlot ?? (
          <ActionChip
            active={isLiked}
            size={variant === "feed" ? "sm" : "md"}
            label={
              variant === "feed"
                ? `${formatCompactCount(likesCount)}`
                : `${formatCompactCount(likesCount)} лайков`
            }
            icon={
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={16}
                color={
                  isLiked
                    ? DESIGN_TOKENS.color.feedback.like.surface
                    : DESIGN_TOKENS.color.text.primary
                }
              />
            }
          />
        )}
        <ActionChip
          size={variant === "feed" ? "sm" : "md"}
          label={
            variant === "feed"
              ? `${formatCompactCount(commentsCount)}`
              : `${formatCompactCount(commentsCount)} комментариев`
          }
          icon={
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={16}
              color={DESIGN_TOKENS.color.text.primary}
            />
          }
        />
      </View>
    </View>
  );
}
