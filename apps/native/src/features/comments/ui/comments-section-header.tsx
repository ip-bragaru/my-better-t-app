import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { DESIGN_TOKENS } from "@shared/config/design-tokens";

type CommentsSectionHeaderProps = {
  count: number;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function CommentsSectionHeader({
  count,
  actionLabel = "Сначала новые",
  onActionPress,
}: CommentsSectionHeaderProps) {
  return (
    <View className="mt-2 flex-row items-center justify-between gap-3">
      <Text className="text-xl text-neutral-950 font-semibold">
        {count} комментариев
      </Text>
      <Pressable className="flex-row items-center gap-1" onPress={onActionPress}>
        <Text className="text-sm font-medium text-[#5831e8]">
          {actionLabel}
        </Text>
        <Ionicons
          name="chevron-down"
          size={14}
          color={DESIGN_TOKENS.color.brand.strong}
        />
      </Pressable>
    </View>
  );
}
