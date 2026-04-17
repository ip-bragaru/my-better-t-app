import type { CursorPage, Post } from "@shared/model/types";
import type { InfiniteData } from "@tanstack/react-query";

export function sanitizeFeedPages(
  data: InfiniteData<CursorPage<Post>>,
): InfiniteData<CursorPage<Post>> {
  const seenPostIds = new Set<string>();

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.filter((post) => {
        if (seenPostIds.has(post.id)) {
          return false;
        }

        seenPostIds.add(post.id);
        return true;
      }),
    })),
  };
}

export function flattenFeedPosts(data?: InfiniteData<CursorPage<Post>>) {
  if (!data) {
    return [];
  }

  return data.pages.flatMap((page) => page.items);
}

export function keepFirstFeedPage(data: InfiniteData<CursorPage<Post>> | undefined) {
  if (!data) {
    return data;
  }

  if (data.pages.length <= 1) {
    return data;
  }

  return {
    pages: data.pages.slice(0, 1),
    pageParams: data.pageParams.slice(0, 1),
  };
}
