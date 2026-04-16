import { useState } from "react";
import { Image, Text, View } from "react-native";

import { cn } from "@shared/lib/cn";

type AvatarProps = {
  name: string;
  uri?: string;
  size?: number;
  accent?: boolean;
};

export function Avatar({ name, uri, size = 44, accent = false }: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  const canRenderImage = Boolean(uri) && !hasError && !uri?.endsWith(".webm");
  const sizeClassName = getAvatarSizeClassName(size);

  return canRenderImage ? (
    <Image
      className={sizeClassName}
      source={{ uri }}
      onError={() => setHasError(true)}
      resizeMode="cover"
    />
  ) : (
    <View className={cn("items-center justify-center", sizeClassName)}>
      <View
        className={cn(
          "items-center justify-center",
          sizeClassName,
          accent ? "bg-[var(--color-app-brand-soft)]" : "bg-[var(--color-app-text-primary)]",
        )}
      >
        <Text
          className={cn(
            "text-sm font-semibold",
            accent ? "text-[var(--color-app-brand-strong)]" : "text-white",
          )}
        >
          {initials || "M"}
        </Text>
      </View>
    </View>
  );
}

function getAvatarSizeClassName(size: number) {
  switch (size) {
    case 38:
      return "h-[38px] w-[38px] rounded-full";
    case 44:
      return "h-11 w-11 rounded-full";
    case 46:
      return "h-[46px] w-[46px] rounded-full";
    default:
      return "h-11 w-11 rounded-full";
  }
}
