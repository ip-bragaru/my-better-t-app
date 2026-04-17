import { useState } from "react";
import { View } from "react-native";

import { useDesignTokens } from "@shared/config/design-tokens";
import { SendButton } from "@shared/ui/send-button";
import { TextField } from "@shared/ui/text-field";

type CommentComposerProps = {
  isSubmitting: boolean;
  onSubmit: (value: string) => Promise<void>;
};

export function CommentComposer({ isSubmitting, onSubmit }: CommentComposerProps) {
  const tokens = useDesignTokens();
  const [value, setValue] = useState("");

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
    <View className="bg-[var(--color-surface-default)] px-[var(--component-layout-panel-padding)] py-[var(--space-md)]">
      <View className="flex-row items-center gap-[var(--space-sm)] bg-[var(--color-surface-default)]">
        <View className="flex-1">
          <TextField
            maxLength={500}
            editable={!isSubmitting}
            value={value}
            onChangeText={setValue}
            placeholder="Ваш комментарий"
            placeholderTextColor={tokens.semantic.color.text.tertiary}
            classNames={{
              root: "min-h-[var(--component-input-height-multiline)] bg-[var(--color-surface-default)] border-[var(--color-border-default)]",
              input:
                "text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)] text-[var(--color-text-primary)] font-medium",
            }}
          />
        </View>
        <SendButton
          size="sm"
          disabled={!canSubmit}
          isLoading={isSubmitting}
          onPress={handleSubmit}
          classNames={{
            root: "disabled:opacity-100",
            content: "bg-transparent",
          }}
        />
      </View>
    </View>
  );
}
