import { observer } from "mobx-react-lite";
import { match } from "ts-pattern";
import { Text, View } from "react-native";

import { useAppStore } from "@core/providers/app-store-provider";
import { cn } from "@shared/lib/cn";

export const ConnectionBadge = observer(function ConnectionBadge() {
  const appStore = useAppStore();

  const presentation = match(appStore.websocketStatus)
    .with("connected", () => ({
      label: "Live",
      textClassName: "text-[var(--color-feedback-success-text)]",
      backgroundClassName: "bg-[var(--color-feedback-success-surface)]",
    }))
    .with("connecting", "reconnecting", () => ({
      label: "Connecting",
      textClassName: "text-[var(--color-feedback-warning-text)]",
      backgroundClassName: "bg-[var(--color-feedback-warning-surface)]",
    }))
    .otherwise(() => ({
      label: "Offline",
      textClassName: "text-[var(--color-feedback-danger-text)]",
      backgroundClassName: "bg-[var(--color-feedback-danger-surface)]",
    }));

  return (
    <View
      className={cn(
        "self-start rounded-full px-[var(--component-badge-padding-x)] py-[var(--component-badge-padding-y)]",
        presentation.backgroundClassName,
      )}
    >
      <Text
        className={cn(
          "text-[length:var(--typography-xs-font-size)] leading-[var(--typography-xs-line-height)] uppercase tracking-[1.4px] font-semibold",
          presentation.textClassName,
        )}
      >
        {presentation.label}
      </Text>
    </View>
  );
});
