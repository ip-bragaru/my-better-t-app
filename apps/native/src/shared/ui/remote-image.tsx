import { useState } from "react";
import {
  Image,
  Text,
  View,
  type ImageResizeMode,
} from "react-native";

import { cn } from "@shared/lib/cn";
import { SkeletonBlock } from "@shared/ui/skeleton-block";

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
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <View className={cn("items-center justify-center bg-[var(--color-surface-input)]", className)}>
        <Text className="px-[var(--space-xl)] text-center text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)] text-[var(--color-text-secondary)] font-medium">
          {alt}
        </Text>
      </View>
    );
  }

  return (
    <View className={className}>
      {isLoading && <SkeletonBlock className="absolute inset-0 rounded-none" />}
      <Image
        className="h-full w-full"
        source={{ uri }}
        accessibilityLabel={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        resizeMode={resizeMode}
        blurRadius={blurRadius}
      />
    </View>
  );
}
