import { EmptyState } from "@shared/ui/screen-state";

export function FeedEmptyState() {
  return (
    <EmptyState title="Нет публикаций" message="Попробуйте другой фильтр или обновите ленту." />
  );
}
