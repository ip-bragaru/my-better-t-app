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
        "self-start rounded-full px-[var(--component-badge-padding-x)] py-[var(--component-badge-padding-y)]",
        isPaid
          ? "bg-[var(--color-brand-soft)]"
          : "bg-[var(--color-feedback-success-surface)]",
      )}
    >
      <Text
        className={cn(
          "text-[length:var(--typography-xs-font-size)] leading-[var(--typography-xs-line-height)] uppercase tracking-[1.4px] font-semibold",
          isPaid
            ? "text-[var(--color-brand-strong)]"
            : "text-[var(--color-feedback-success-text)]",
        )}
      >
        {isPaid ? "Платный" : "Бесплатный"}
      </Text>
    </View>
  );
}
