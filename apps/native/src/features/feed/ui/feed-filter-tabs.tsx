import { FEED_FILTER_OPTIONS } from "@features/feed/model/feed-filter-options";
import type { FeedFilter } from "@shared/model/types";
import { SegmentedControl } from "@shared/ui/segmented-control";

type FeedFilterTabsProps = {
  value: FeedFilter;
  onChange: (value: FeedFilter) => void;
};

export function FeedFilterTabs({ value, onChange }: FeedFilterTabsProps) {
  return <SegmentedControl value={value} options={FEED_FILTER_OPTIONS} onChange={onChange} />;
}
