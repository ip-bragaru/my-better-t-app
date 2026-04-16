import { useState } from "react";
import { TextInput, View, type TextInputProps } from "react-native";

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

  const backgroundColor = disabled || focused ? "#FFFFFF" : "#EFF2F7";
  const borderColor = focused && !disabled ? "#EFF2F7" : "transparent";
  const textColor = disabled ? "#DCDCDD" : "#000000";
  const placeholderColor = disabled ? "#DCDCDD" : "#57626F";

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
