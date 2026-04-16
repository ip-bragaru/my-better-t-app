import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconButton } from "@shared/ui/icon-button";
import { TextField } from "@shared/ui/text-field";

type CommentComposerProps = {
  isSubmitting: boolean;
  onSubmit: (value: string) => Promise<void>;
};

export function CommentComposer({ isSubmitting, onSubmit }: CommentComposerProps) {
  const [value, setValue] = useState("");
  const insets = useSafeAreaInsets();

  const trimmedValue = value.trim();
  const canSubmit = trimmedValue.length >= 1 && trimmedValue.length <= 500 && !isSubmitting;

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }

    await onSubmit(trimmedValue);
    setValue("");
  };

  return (
    <View className="border-t border-[var(--color-app-border-default)] bg-[var(--color-app-canvas-elevated)] px-5 pt-4" style={{ paddingBottom: insets.bottom + 24 }}>
      <TextField
        multiline
        maxLength={500}
        editable={!isSubmitting}
        value={value}
        onChangeText={setValue}
        placeholder="Написать комментарий..."
        trailingSlot={
          <IconButton
            size={42}
            tone="accent"
            disabled={!canSubmit}
            onPress={handleSubmit}
            icon={
              <Ionicons
                name={isSubmitting ? "time-outline" : "arrow-up"}
                size={18}
                color="#5831E8"
              />
            }
          />
        }
      />
      <View className="mt-3 flex-row items-center justify-between px-1">
        <Text className="text-xs text-[var(--color-app-text-muted)] font-medium">
          {trimmedValue.length}/500
        </Text>
        <Text className="text-xs text-[var(--color-app-text-muted)] font-medium">
          {isSubmitting ? "Отправляем..." : "Enter для переноса"}
        </Text>
      </View>
    </View>
  );
}
