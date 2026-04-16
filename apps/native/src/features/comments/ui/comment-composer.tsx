import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SendButton } from "@shared/ui/send-button";
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
    <View
      className="border-t border-[var(--color-app-border-default)] bg-[var(--color-app-canvas-elevated)] px-5 pt-4"
      style={{ paddingBottom: insets.bottom + 16 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View style={{ flex: 1 }}>
          <TextField
            maxLength={500}
            editable={!isSubmitting}
            value={value}
            onChangeText={setValue}
            placeholder="Ваш комментарий"
          />
        </View>
        <SendButton
          size={40}
          disabled={!canSubmit}
          isLoading={isSubmitting}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}
