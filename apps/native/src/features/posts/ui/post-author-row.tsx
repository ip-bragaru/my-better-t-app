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
  trailingSlot,
  showVerified = true,
}: PostAuthorRowProps) {
  return (
    <View className="flex-row items-center justify-between gap-3">
      <View className="flex-1 flex-row items-center gap-3">
        <Avatar name={author.displayName} uri={author.avatarUrl} accent />
        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-[15px] leading-5 tracking-[0px] text-[var(--color-app-text-primary)] font-bold lining-nums tabular-nums stacked-fractions">
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
          {subtitle ? <Text className="mt-1 text-sm text-[var(--color-app-text-secondary)] font-medium">{subtitle}</Text> : null}
        </View>
      </View>
      {trailingSlot}
    </View>
  );
}
