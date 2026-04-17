import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

import { cn } from "@shared/lib/cn";
import { Avatar } from "@shared/ui/avatar";
import { Button } from "@shared/ui/button";
import { ScreenContainer } from "@shared/ui/screen-container";
import { SadMascotIllustration } from "@shared/ui/sad-mascot-illustration";

type PostDetailErrorStateProps = {
  authorName?: string;
  authorAvatarUrl?: string;
  onRetry?: () => void;
};

export function PostDetailErrorState({
  authorName,
  authorAvatarUrl,
  onRetry,
}: PostDetailErrorStateProps) {
  return (
    <ScreenContainer>
      <SafeAreaView edges={["top"]} className="flex-1 pt-[var(--space-xl)]">
        <View className="rounded-[var(--component-card-radius)] bg-[var(--color-surface-default)] px-[var(--component-layout-card-padding)] pb-[var(--component-layout-panel-padding)] pt-[var(--component-layout-card-padding)]">
          {authorName ? (
            <View className="flex-row items-center gap-[var(--space-sm)]">
              <Avatar name={authorName} uri={authorAvatarUrl} accent size="md" />
              <Text className="flex-1 text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)] text-[var(--color-text-primary)] font-bold">
                {authorName}
              </Text>
            </View>
          ) : null}

          <View
            className={cn(
              "items-center",
              authorName ? "mt-[var(--space-control)]" : "pt-[var(--space-xl)]",
            )}
          >
            <SadMascotIllustration />
            <Text className="mt-[var(--space-xxxl)] text-center text-[length:var(--typography-xl-font-size)] leading-[var(--typography-xl-line-height)] text-[var(--color-text-primary)] font-bold">
              Не удалось загрузить публикацию
            </Text>
            {onRetry ? (
              <Button
                className="mt-[var(--space-xl)]"
                label="Повторить"
                size="md"
                fullWidth
                onPress={onRetry}
              />
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </ScreenContainer>
  );
}
