import { Button } from "@shared/ui/button";
import { Text, View } from "react-native";

type FeedErrorStateProps = {
  onRetry: () => void;
  isRetrying?: boolean;
};

export function FeedErrorState({ onRetry, isRetrying = false }: FeedErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-[var(--space-xxxl)]">
      <Text className="text-center text-[length:var(--typography-lg-font-size)] leading-[var(--typography-lg-line-height)] text-[var(--color-text-primary)] font-semibold">
        Не удалось загрузить публикации
      </Text>
      <Text className="mt-[var(--space-sm)] text-center text-[length:var(--typography-sm-font-size)] leading-6 text-[var(--color-text-secondary)] font-medium">
        Проверьте соединение и попробуйте снова.
      </Text>
      <Button
        className="mt-[var(--space-lg)]"
        label="Повторить"
        size="sm"
        onPress={onRetry}
        isLoading={isRetrying}
      />
    </View>
  );
}
