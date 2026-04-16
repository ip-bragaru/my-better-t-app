import type { FeedFilter } from "@shared/model/types";

export const FEED_FILTER_OPTIONS: Array<{ label: string; value: FeedFilter }> = [
  { label: "Все", value: "all" },
  { label: "Бесплатные", value: "free" },
  { label: "Платные", value: "paid" },
];
