import { useState } from "react";
import {
  Image,
  Text,
  View,
  type ImageResizeMode,
} from "react-native";

import { cn } from "@shared/lib/cn";

type RemoteImageProps = {
  uri: string;
  alt: string;
  className?: string;
  resizeMode?: ImageResizeMode;
  blurRadius?: number;
};

export function RemoteImage({
  uri,
  alt,
  className,
  resizeMode = "cover",
  blurRadius,
}: RemoteImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <View
        className={cn("items-center justify-center bg-neutral-200", className)}
      >
        <Text className="px-6 text-center text-sm text-neutral-500 font-medium">{alt}</Text>
      </View>
    );
  }

  return (
    <View className={className}>
      <Image
        style={{ width: "100%", height: "100%" }}
        source={{ uri }}
        accessibilityLabel={alt}
        onError={() => setHasError(true)}
        resizeMode={resizeMode}
        blurRadius={blurRadius}
      />
    </View>
  );
}
