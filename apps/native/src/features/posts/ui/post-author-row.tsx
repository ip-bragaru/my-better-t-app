import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { DESIGN_TOKENS } from "@shared/config/design-tokens";
import type { Author } from "@shared/model/types";
import { Avatar } from "@shared/ui/avatar";

type PostAuthorRowProps = {
  author: Author;
  subtitle?: string;
  avatarSize?: number;
  trailingSlot?: React.ReactNode;
  showVerified?: boolean;
};

export function PostAuthorRow({
  author,
  subtitle,
  avatarSize = 44,
  trailingSlot,
  showVerified = true,
}: PostAuthorRowProps) {
  return (
    <View className="flex-row items-center justify-between gap-3">
      <View className="flex-1 flex-row items-center gap-3">
        <Avatar name={author.displayName} uri={author.avatarUrl} size={avatarSize} accent />
        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-base text-neutral-950 font-semibold">
              {author.displayName}
            </Text>
            {showVerified && author.isVerified ? (
              <MaterialIcons
                name="verified"
                size={16}
                color={DESIGN_TOKENS.color.brand.primary}
              />
            ) : null}
          </View>
          {subtitle ? <Text className="mt-1 text-sm text-neutral-500 font-medium">{subtitle}</Text> : null}
        </View>
      </View>
      {trailingSlot}
    </View>
  );
}
