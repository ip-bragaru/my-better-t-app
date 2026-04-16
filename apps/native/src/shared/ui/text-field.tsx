import { TextInput, View, type TextInputProps } from "react-native";

import { cn } from "@shared/lib/cn";

type TextFieldProps = TextInputProps & {
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
};

export function TextField({
  leadingSlot,
  trailingSlot,
  multiline,
  ...props
}: TextFieldProps) {
  return (
    <View className="rounded-[24px] border border-[var(--color-app-border-default)] bg-[var(--color-app-surface-default)] px-4 py-3">
      <View className="flex-row items-start gap-3">
        {leadingSlot}
        <TextInput
          className={cn(
            "flex-1 text-base leading-6 text-[var(--color-app-text-primary)] font-medium",
            multiline ? "min-h-11" : null,
            props.editable === false ? "opacity-50" : null,
          )}
          multiline={multiline}
          {...props}
        />
        {trailingSlot}
      </View>
    </View>
  );
}
