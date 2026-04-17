import { Text, View } from "react-native";

import { useDesignTokens } from "@shared/config/design-tokens";
import { ChatBubbleIcon } from "@shared/ui/chat-bubble-icon";
import { formatCompactCount, formatRelativeDate } from "@shared/lib/formatters";
import { ActionChip } from "@shared/ui/action-chip";
import { HeartFilledIcon } from "@shared/ui/heart-filled-icon";
import { HeartOutlineIcon } from "@shared/ui/heart-outline-icon";

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
  const tokens = useDesignTokens();

  return (
    <View className="gap-[var(--space-sm)]">
      {variant === "detail" && createdAt ? (
        <Text className="text-[length:var(--typography-xs-font-size)] leading-[var(--typography-xs-line-height)] uppercase tracking-[1.4px] text-[var(--color-text-tertiary)] font-medium">
          {formatRelativeDate(createdAt)}
        </Text>
      ) : null}
      <View className="flex-row flex-wrap items-center gap-[var(--space-sm)]">
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
              isLiked ? (
                <HeartFilledIcon
                  color={tokens.semantic.color.feedback.like.surface}
                />
              ) : (
                <HeartOutlineIcon
                  color={tokens.semantic.color.text.stat}
                />
              )
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
            <ChatBubbleIcon color={tokens.semantic.color.text.stat} />
          }
        />
      </View>
    </View>
  );
}
