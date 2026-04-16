import { Text, View } from "react-native";

import { Button } from "@shared/ui/button";
import { RemoteImage } from "@shared/ui/remote-image";

type PaidPostCoverProps = {
  coverUrl: string;
  onDonatePress?: () => void;
};

export function PaidPostCover({ coverUrl, onDonatePress }: PaidPostCoverProps) {
  return (
    <View className="relative h-[286px] overflow-hidden">
      <RemoteImage
        uri={coverUrl}
        alt="Locked post cover"
        className="h-full w-full"
      />
      <View className="absolute inset-0 bg-[rgba(16,16,22,0.52)]" />
      <View className="absolute inset-0 items-center justify-center gap-[14px] px-8">
        <View className="h-9 w-9 items-center justify-center rounded-2xl bg-[var(--color-app-brand-primary)]">
          <Text className="text-base text-white font-semibold">
            $
          </Text>
        </View>

        <View className="items-center gap-0.5">
          <Text className="text-center text-base text-white font-medium">
            Контент скрыт пользователем.
          </Text>
          <Text className="text-center text-base text-white font-medium">
            Доступ откроется после доната
          </Text>
        </View>

        <Button
          label="Отправить донат"
          onPress={onDonatePress}
          variant="accent"
          size="md"
        />
      </View>
    </View>
  );
}
