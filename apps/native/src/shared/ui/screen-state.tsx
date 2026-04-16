import { match } from "ts-pattern";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { mapApiError } from "@shared/lib/error-mapper";

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
  return (
    <View className="flex-1 items-center justify-center px-8">
      <ActivityIndicator size="small" color="#17131A" />
      <Text className="mt-4 text-center text-sm text-neutral-500 font-medium">{message}</Text>
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
    <View className="flex-1 items-center justify-center px-8">
      <Text className="text-center text-xl text-neutral-900 font-semibold">
        {title}
      </Text>
      <Text className="mt-3 text-center text-sm leading-6 text-neutral-500 font-medium">
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
    <View className="flex-1 items-center justify-center px-8">
      <Text className="text-center text-xl text-neutral-900 font-semibold">
        Unable to load
      </Text>
      <Text className="mt-3 text-center text-sm leading-6 text-neutral-500 font-medium">
        {mappedError.message}
      </Text>
      {onRetry ? (
        <Pressable
          className="mt-5 rounded-full bg-neutral-900 px-5 py-3"
          onPress={onRetry}
        >
          <Text className="text-sm text-white font-semibold">
            Try again
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
