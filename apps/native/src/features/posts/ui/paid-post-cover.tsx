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
      <View className="absolute inset-0 bg-[var(--color-app-overlay-medium)]" />
      <View className="absolute inset-0 items-center justify-center gap-2 px-3">
        <View className="p-2.75 bg-[var(--color-app-brand-primary)] rounded-md">

          <View className="size-5 items-center justify-center rounded-full bg-white  ">
            <Text className="text-sm text-[var(--color-app-brand-primary)] font-semibold">
              $
            </Text>
          </View>
        </View>

        <View className="items-center gap-0.5">
          <Text className="text-center text-[15px] leading-5 tracking-[0px] text-white font-semibold lining-nums tabular-nums stacked-fractions">
            Контент скрыт пользователем.
          </Text>
          <Text className="text-center text-[15px] leading-5 tracking-[0px] text-white font-semibold lining-nums tabular-nums stacked-fractions">
            Доступ откроется после доната
          </Text>
        </View>
        <View className="justify-center items-center">
          <Button
            label="Отправить донат"
            onPress={onDonatePress}
            variant="accent"
            size="md"
            className="self-stretch"
          />
        </View>
      </View>
    </View>
  );
}
