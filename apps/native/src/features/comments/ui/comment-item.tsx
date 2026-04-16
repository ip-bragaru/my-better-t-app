import { memo } from "react";
import { Text, View } from "react-native";

import type { Comment } from "@shared/model/types";
import { ActionChip } from "@shared/ui/action-chip";
import { Avatar } from "@shared/ui/avatar";
import { formatRelativeDate } from "@shared/lib/formatters";

type CommentItemProps = {
  comment: Comment;
  likeLabel?: string;
};

function CommentItemComponent({ comment, likeLabel }: CommentItemProps) {
  return (
    <View className="flex-row gap-3">
      <Avatar name={comment.author.displayName} uri={comment.author.avatarUrl} size={38} accent />
      <View className="flex-1 rounded-[24px] bg-white p-4">
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1">
            <Text className="text-sm text-neutral-950 font-semibold">
              {comment.author.displayName}
            </Text>
            <Text className="mt-1 text-xs uppercase tracking-[1.2px] text-neutral-400 font-medium">
              {formatRelativeDate(comment.createdAt)}
            </Text>
          </View>
          {likeLabel ? <ActionChip label={likeLabel} /> : null}
        </View>
        <Text className="mt-3 text-sm leading-6 text-neutral-600 font-medium">{comment.text}</Text>
      </View>
    </View>
  );
}

export const CommentItem = memo(CommentItemComponent);
