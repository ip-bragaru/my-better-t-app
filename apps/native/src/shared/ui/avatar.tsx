import { useState } from "react";
import { Image, Text, View } from "react-native";

import { cn } from "@shared/lib/cn";
import { mergeRecipeSlots, type RecipeClassNames, tv } from "@shared/ui/recipe";

const avatarRecipe = tv({
  slots: {
    image: "overflow-hidden rounded-full",
    fallback: "items-center justify-center rounded-full",
    label: "font-semibold",
  },
  variants: {
    accent: {
      true: {
        fallback: "bg-[var(--color-brand-soft)]",
        label: "text-[var(--color-brand-strong)]",
      },
      false: {
        fallback: "bg-[var(--color-text-primary)]",
        label: "text-[var(--color-text-inverse)]",
      },
    },
    size: {
      sm: {
        image: "h-[var(--component-avatar-size-sm)] w-[var(--component-avatar-size-sm)]",
        fallback: "h-[var(--component-avatar-size-sm)] w-[var(--component-avatar-size-sm)]",
        label:
          "text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)]",
      },
      md: {
        image: "h-[var(--component-avatar-size-md)] w-[var(--component-avatar-size-md)]",
        fallback: "h-[var(--component-avatar-size-md)] w-[var(--component-avatar-size-md)]",
        label:
          "text-[length:var(--typography-md-font-size)] leading-[var(--typography-md-line-height)]",
      },
    },
  },
  defaultVariants: {
    accent: false,
    size: "sm",
  },
});

type AvatarProps = {
  name: string;
  uri?: string;
  accent?: boolean;
  size?: "sm" | "md";
  classNames?: RecipeClassNames<"image" | "fallback" | "label">;
  className?: string;
};

export function Avatar({
  name,
  uri,
  accent = false,
  size = "sm",
  className,
  classNames,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  const canRenderImage = Boolean(uri) && !hasError && !uri?.endsWith(".webm");
  const slots = mergeRecipeSlots(avatarRecipe({ accent, size }), classNames);

  return canRenderImage ? (
    <Image
      className={cn(slots.image, className)}
      source={{ uri }}
      onError={() => setHasError(true)}
      resizeMode="cover"
    />
  ) : (
    <View className={cn(slots.fallback, className)}>
      <Text className={slots.label}>{initials || "M"}</Text>
    </View>
  );
}
