import { Text, View } from "react-native";

import { cn } from "@shared/lib/cn";
import type { Tier } from "@shared/model/types";

type PostTierBadgeProps = {
  tier: Tier;
};

export function PostTierBadge({ tier }: PostTierBadgeProps) {
  const isPaid = tier === "paid";

  return (
    <View
      className={cn(
        "self-start rounded-full px-3 py-1.5",
        isPaid
          ? "bg-[var(--color-app-brand-soft)]"
          : "bg-[var(--color-app-feedback-success-surface)]",
      )}
    >
      <Text
        className={cn(
          "text-xs uppercase tracking-[1.4px] font-semibold",
          isPaid
            ? "text-[var(--color-app-brand-strong)]"
            : "text-[var(--color-app-feedback-success-text)]",
        )}
      >
        {isPaid ? "Платный" : "Бесплатный"}
      </Text>
    </View>
  );
}
