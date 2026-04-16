import { useState } from "react";
import { TextInput, View, type TextInputProps } from "react-native";

import { DESIGN_TOKENS } from "@shared/config/design-tokens";

type TextFieldProps = TextInputProps & {
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
};

export function TextField({
  leadingSlot,
  trailingSlot,
  multiline,
  editable = true,
  onFocus,
  onBlur,
  ...props
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);

  const disabled = editable === false;

  const backgroundColor = disabled || focused ? DESIGN_TOKENS.color.surface.default : DESIGN_TOKENS.color.surface.input;
  const borderColor = focused && !disabled ? DESIGN_TOKENS.color.surface.input : "transparent";
  const textColor = disabled ? DESIGN_TOKENS.color.text.disabled : DESIGN_TOKENS.color.text.primary;
  const placeholderColor = disabled ? DESIGN_TOKENS.color.text.disabled : DESIGN_TOKENS.color.text.placeholder;

  return (
    <View
      style={{
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        minHeight: 40,
        backgroundColor,
        borderWidth: 2,
        borderColor,
      }}
    >
      {leadingSlot}
      <TextInput
        style={[
          {
            flex: 1,
            fontSize: 15,
            lineHeight: 20,
            fontFamily: "Manrope",
            fontWeight: "500",
            color: textColor,
            padding: 0,
          },
          multiline ? { minHeight: 44 } : null,
        ]}
        placeholderTextColor={placeholderColor}
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
