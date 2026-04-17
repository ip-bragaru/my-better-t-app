import { useState } from "react";
import { TextInput, View, type TextInputProps } from "react-native";

import { useDesignTokens } from "@shared/config/design-tokens";
import { cn } from "@shared/lib/cn";
import { mergeRecipeSlots, type RecipeClassNames, tv } from "@shared/ui/recipe";

const textFieldRecipe = tv({
  slots: {
    root:
      "flex-row rounded-[var(--component-input-radius)] border-[length:var(--component-input-border-width)] py-[var(--component-input-padding-y)] px-[var(--component-input-padding-x)] gap-[var(--component-input-gap)]",
    input:
      "flex-1 p-0 font-medium text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)]",
  },
  variants: {
    focused: {
      true: {
        root: "bg-[var(--color-surface-default)] border-[var(--color-surface-input)]",
      },
      false: {
        root: "border-transparent",
      },
    },
    disabled: {
      true: {
        root: "bg-[var(--color-surface-default)]",
        input: "text-[var(--color-text-disabled)]",
      },
      false: {
        root: "bg-[var(--color-surface-input)]",
        input: "text-[var(--color-text-primary)]",
      },
    },
    multiline: {
      true: {
        root: "items-start",
        input: "min-h-[var(--component-input-height-multiline)]",
      },
      false: {
        root: "min-h-[var(--component-input-height)] items-center",
      },
    },
  },
  defaultVariants: {
    focused: false,
    disabled: false,
    multiline: false,
  },
});

type TextFieldClassNames = RecipeClassNames<"root" | "input">;

type TextFieldProps = TextInputProps & {
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  classNames?: TextFieldClassNames;
};

export function TextField({
  leadingSlot,
  trailingSlot,
  multiline,
  editable = true,
  onFocus,
  onBlur,
  className,
  classNames,
  ...props
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const tokens = useDesignTokens();

  const disabled = editable === false;
  const slots = mergeRecipeSlots(
    textFieldRecipe({
      focused: focused && !disabled,
      disabled,
      multiline: Boolean(multiline),
    }),
    classNames,
  );

  return (
    <View className={cn(slots.root, className)}>
      {leadingSlot}
      <TextInput
        className={slots.input}
        placeholderTextColor={
          disabled
            ? tokens.semantic.color.text.disabled
            : tokens.semantic.color.text.placeholder
        }
        multiline={multiline}
        editable={editable}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        {...props}
      />
      {trailingSlot}
    </View>
  );
}
