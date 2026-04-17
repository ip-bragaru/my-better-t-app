import { match } from "ts-pattern";
import { ActivityIndicator, Text, View } from "react-native";

import { useDesignTokens } from "@shared/config/design-tokens";
import { mapApiError } from "@shared/lib/error-mapper";
import { Button } from "@shared/ui/button";

type ScreenStateProps = {
  isLoading: boolean;
  error: unknown;
  isEmpty: boolean;
  loadingMessage?: string;
  emptyTitle?: string;
  emptyMessage?: string;
  onRetry?: () => void;
  children: React.ReactNode;
};

export function ScreenState(props: ScreenStateProps) {
  return match(props)
    .with({ isLoading: true }, ({ loadingMessage }) => (
      <LoadingState message={loadingMessage ?? "Loading..."} />
    ))
    .when(
      ({ error }) => Boolean(error),
      ({ error, onRetry }) => <ErrorState error={error} onRetry={onRetry} />,
    )
    .with({ isEmpty: true }, ({ emptyTitle, emptyMessage }) => (
      <EmptyState
        title={emptyTitle ?? "Nothing here yet"}
        message={emptyMessage ?? "Content will show up once it becomes available."}
      />
    ))
    .otherwise(({ children }) => <>{children}</>);
}

export function LoadingState({ message }: { message: string }) {
  const tokens = useDesignTokens();

  return (
    <View className="flex-1 items-center justify-center px-[var(--space-xxxl)]">
      <ActivityIndicator size="small" color={tokens.semantic.color.text.primary} />
      <Text className="mt-[var(--space-md)] text-center text-[length:var(--typography-sm-font-size)] leading-[var(--typography-sm-line-height)] text-[var(--color-text-secondary)] font-medium">
        {message}
      </Text>
    </View>
  );
}

export function EmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <View className="flex-1 items-center justify-center px-[var(--space-xxxl)]">
      <Text className="text-center text-[length:var(--typography-lg-font-size)] leading-[var(--typography-lg-line-height)] text-[var(--color-text-primary)] font-semibold">
        {title}
      </Text>
      <Text className="mt-[var(--space-sm)] text-center text-[length:var(--typography-sm-font-size)] leading-6 text-[var(--color-text-secondary)] font-medium">
        {message}
      </Text>
    </View>
  );
}

export function ErrorState({
  error,
  onRetry,
}: {
  error: unknown;
  onRetry?: () => void;
}) {
  const mappedError = mapApiError(error);

  return (
    <View className="flex-1 items-center justify-center px-[var(--space-xxxl)]">
      <Text className="text-center text-[length:var(--typography-lg-font-size)] leading-[var(--typography-lg-line-height)] text-[var(--color-text-primary)] font-semibold">
        Unable to load
      </Text>
      <Text className="mt-[var(--space-sm)] text-center text-[length:var(--typography-sm-font-size)] leading-6 text-[var(--color-text-secondary)] font-medium">
        {mappedError.message}
      </Text>
      {onRetry ? (
        <Button className="mt-[var(--space-lg)]" label="Try again" size="sm" onPress={onRetry} />
      ) : null}
    </View>
  );
}
