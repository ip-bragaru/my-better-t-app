import { Text, View } from "react-native";

import { Button } from "@shared/ui/button";
import { RemoteImage } from "@shared/ui/remote-image";

type PaidPostCoverProps = {
  coverUrl: string;
  onDonatePress?: () => void;
};

export function PaidPostCover({ coverUrl, onDonatePress }: PaidPostCoverProps) {
  return (
    <View className="relative aspect-square w-full overflow-hidden">
      <RemoteImage
        uri={coverUrl}
        alt="Locked post cover"
        className="h-full w-full"
        blurRadius={40}
      />
      <View className="absolute inset-0 bg-[var(--color-overlay-medium)]" />
      <View className="absolute inset-0 items-center justify-center gap-[var(--space-xs)] px-[var(--space-sm)]">
        <View className="rounded-[var(--radius-md)] bg-[var(--color-brand-primary)] p-[11px]">
          <View className="h-[var(--size-icon-lg)] w-[var(--size-icon-lg)] items-center justify-center rounded-full bg-[var(--color-text-inverse)]">
            <Text className="text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)] text-[var(--color-brand-primary)] font-semibold">
              $
            </Text>
          </View>
        </View>

        <View className="items-center gap-[2px]">
          <Text className="text-center text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)] tracking-[var(--typography-md-letter-spacing)] text-[var(--color-text-inverse)] font-semibold lining-nums tabular-nums stacked-fractions">
            Контент скрыт пользователем.
          </Text>
          <Text className="text-center text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)] tracking-[var(--typography-md-letter-spacing)] text-[var(--color-text-inverse)] font-semibold lining-nums tabular-nums stacked-fractions">
            Доступ откроется после доната
          </Text>
        </View>
        <View className="justify-center items-center">
          <Button
            label="Отправить донат"
            onPress={onDonatePress}
            variant="accent"
            size="md"
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}
