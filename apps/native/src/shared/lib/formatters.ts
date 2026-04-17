export function pluralizeRu(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod100 >= 11 && mod100 <= 19) return `${n} ${many}`;
  if (mod10 === 1) return `${n} ${one}`;
  if (mod10 >= 2 && mod10 <= 4) return `${n} ${few}`;
  return `${n} ${many}`;
}

export function formatCommentCount(count: number): string {
  return pluralizeRu(count, "комментарий", "комментария", "комментариев");
}

export function formatCompactCount(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatRelativeDate(value: string) {
  const date = new Date(value);
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    return "Только что";
  }

  if (diffHours < 24) {
    return `${diffHours} ч назад`;
  }

  if (diffDays < 7) {
    return `${diffDays} д назад`;
  }

  return new Intl.DateTimeFormat("ru", {
    month: "short",
    day: "numeric",
  }).format(date);
}
