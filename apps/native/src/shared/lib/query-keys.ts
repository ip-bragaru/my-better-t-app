import type { FeedFilter } from "@shared/model/types";

export const queryKeys = {
  session: ["session"] as const,
  feed: {
    list: (filter: FeedFilter) => ["feed", "list", filter] as const,
  },
  posts: {
    detail: (postId: string) => ["posts", "detail", postId] as const,
  },
  comments: {
    list: (postId: string) => ["comments", "list", postId] as const,
  },
} as const;
