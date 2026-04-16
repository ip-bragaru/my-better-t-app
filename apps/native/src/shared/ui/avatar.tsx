import { useState } from "react";
import { Image, Text, View } from "react-native";

import { cn } from "@shared/lib/cn";

type AvatarProps = {
  name: string;
  uri?: string;
  accent?: boolean;
  size?: number;
};

export function Avatar({ name, uri, accent = false, size = 40 }: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  const canRenderImage = Boolean(uri) && !hasError && !uri?.endsWith(".webm");
  const sizeStyle = { width: size, height: size } as const;

  return canRenderImage ? (
    <Image
      className="rounded-full overflow-hidden"
      style={sizeStyle}
      source={{ uri }}
      onError={() => setHasError(true)}
      resizeMode="cover"
    />
  ) : (
    <View
      className={cn(
        "items-center justify-center rounded-full",
        accent ? "bg-[var(--color-app-brand-soft)]" : "bg-[var(--color-app-text-primary)]",
      )}
      style={sizeStyle}
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
  );
}

