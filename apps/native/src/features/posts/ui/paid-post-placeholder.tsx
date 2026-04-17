import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { useDesignTokens } from "@shared/config/design-tokens";
import { Button } from "@shared/ui/button";
import { SkeletonBlock } from "@shared/ui/skeleton-block";

type PaidPostPlaceholderProps = {
  compact?: boolean;
  onDonatePress?: () => void;
};

export function PaidPostPlaceholder({
  compact = false,
  onDonatePress,
}: PaidPostPlaceholderProps) {
  const tokens = useDesignTokens();

  return (
    <View className="overflow-hidden rounded-[var(--component-image-post-radius)] border border-[var(--color-border-default)] bg-[var(--color-surface-default)] p-[var(--component-layout-panel-padding)]">
      <View className="absolute inset-0 bg-[var(--color-overlay-soft)]" />
      <View className="gap-[var(--space-md)]">
        <View className="flex-row items-start gap-[var(--space-sm)]">
          <View className="h-[var(--component-icon-button-size-md)] w-[var(--component-icon-button-size-md)] items-center justify-center rounded-full bg-[var(--color-brand-soft)]">
            <Ionicons
              name="lock-closed"
              size={18}
              color={tokens.semantic.color.brand.strong}
            />
          </View>
          <View className="flex-1 gap-[var(--space-xxs)]">
            <Text className="text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)] text-[var(--color-text-primary)] font-semibold">
              Контент скрыт пользователем.
            </Text>
            <Text className="text-[length:var(--typography-sm-font-size)] leading-6 text-[var(--color-text-secondary)] font-medium">
              Доступ откроется после доната
            </Text>
          </View>
        </View>

        <Button
          label="Отправить донат"
          onPress={onDonatePress}
          variant="accent"
          size={compact ? "sm" : "md"}
        />

        <View className="gap-[var(--space-xs)] pt-[2px]">
          <SkeletonBlock className="h-[10px] w-[94%]" />
          <SkeletonBlock className="h-[10px] w-[88%]" />
          {!compact ? <SkeletonBlock className="h-[10px] w-[72%]" /> : null}
        </View>
      </View>
    </View>
  );
}
