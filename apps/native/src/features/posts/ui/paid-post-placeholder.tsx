import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { DESIGN_TOKENS } from "@shared/config/design-tokens";
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
  return (
    <View className="overflow-hidden rounded-[28px] border border-[var(--color-app-border-default)] bg-[var(--color-app-surface-default)] p-5">
      <View className="absolute inset-0 bg-[var(--color-app-overlay-soft)]" />
      <View className="gap-4">
        <View className="flex-row items-start gap-3">
          <View className="h-[42px] w-[42px] items-center justify-center rounded-full bg-[var(--color-app-brand-soft)]">
            <Ionicons
              name="lock-closed"
              size={18}
              color={DESIGN_TOKENS.color.brand.strong}
            />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-base text-[var(--color-app-text-primary)] font-semibold">
              Контент скрыт пользователем.
            </Text>
            <Text className="text-sm leading-6 text-[var(--color-app-text-secondary)] font-medium">
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

        <View className="gap-2 pt-1">
          <SkeletonBlock className="h-[10px] w-[94%]" />
          <SkeletonBlock className="h-[10px] w-[88%]" />
          {!compact ? <SkeletonBlock className="h-[10px] w-[72%]" /> : null}
        </View>
      </View>
    </View>
  );
}
