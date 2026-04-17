import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { useDesignTokens } from "@shared/config/design-tokens";
import type { Author } from "@shared/model/types";
import { Avatar } from "@shared/ui/avatar";

type PostAuthorRowProps = {
  author: Author;
  subtitle?: string;
  avatarSize?: "sm" | "md";
  trailingSlot?: React.ReactNode;
  showVerified?: boolean;
};

export function PostAuthorRow({
  author,
  subtitle,
  avatarSize = "sm",
  trailingSlot,
  showVerified = true,
}: PostAuthorRowProps) {
  const tokens = useDesignTokens();

  return (
    <View className="flex-row items-center justify-between gap-[var(--space-sm)]">
      <View className="flex-1 flex-row items-center gap-[var(--space-sm)]">
        <Avatar name={author.displayName} uri={author.avatarUrl} accent size={avatarSize} />
        <View className="flex-1">
          <View className="flex-row items-center gap-[var(--space-xxs)]">
            <Text className="text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)] tracking-[var(--typography-md-letter-spacing)] text-[var(--color-text-primary)] font-bold lining-nums tabular-nums stacked-fractions">
              {author.displayName}
            </Text>
            {showVerified && author.isVerified ? (
              <MaterialIcons
                name="verified"
                size={16}
                color={tokens.semantic.color.brand.primary}
              />
            ) : null}
          </View>
          {subtitle ? (
            <Text className="mt-[var(--space-xxs)] text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)] text-[var(--color-text-secondary)] font-medium">
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
      {trailingSlot}
    </View>
  );
}
