import type { InfiniteData, QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@shared/lib/query-keys";
import type { Comment, CursorPage, FeedFilter, Post } from "@shared/model/types";

function updatePost(post: Post, partial: Partial<Post>): Post {
  return {
    ...post,
    ...partial,
  };
}

export function updatePostAcrossCaches(
  queryClient: QueryClient,
  postId: string,
  updater: (post: Post) => Post,
) {
  const filters: FeedFilter[] = ["all", "free", "paid"];

  for (const filter of filters) {
    queryClient.setQueryData<InfiniteData<CursorPage<Post>>>(
      queryKeys.feed.list(filter),
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          pages: current.pages.map((page) => ({
            ...page,
            items: page.items.map((post) => (post.id === postId ? updater(post) : post)),
          })),
        };
      },
    );
  }

  queryClient.setQueryData<Post>(queryKeys.posts.detail(postId), (current) => {
    if (!current) {
      return current;
    }

    return updater(current);
  });
}

export function syncLikeCount(queryClient: QueryClient, postId: string, likesCount: number) {
  updatePostAcrossCaches(queryClient, postId, (post) =>
    updatePost(post, { likesCount }),
  );
}

export function syncLikeToggle(
  queryClient: QueryClient,
  postId: string,
  nextState: { isLiked: boolean; likesCount: number },
) {
  updatePostAcrossCaches(queryClient, postId, (post) => updatePost(post, nextState));
}

export function syncCommentAdded(queryClient: QueryClient, comment: Comment) {
  queryClient.setQueryData<InfiniteData<CursorPage<Comment>>>(
    queryKeys.comments.list(comment.postId),
    (current) => {
      if (!current) {
        return {
          pageParams: [null],
          pages: [{ items: [comment], nextCursor: null, hasMore: false }],
        };
      }

      const sanitizedCurrent = sanitizeCommentPages(current);
      const [firstPage, ...restPages] = sanitizedCurrent.pages;

      if (!firstPage) {
        return sanitizedCurrent;
      }

      const hasDuplicate = hasComment(sanitizedCurrent.pages, comment.id);

      if (hasDuplicate) {
        return sanitizedCurrent;
      }

      updatePostAcrossCaches(queryClient, comment.postId, (post) =>
        updatePost(post, { commentsCount: post.commentsCount + 1 }),
      );

      return {
        ...sanitizedCurrent,
        pages: [
          {
            ...firstPage,
            items: [comment, ...firstPage.items],
          },
          ...restPages,
        ],
      };
    },
  );
}

function hasComment(pages: CursorPage<Comment>[], commentId: string) {
  return pages.some((page) => page.items.some((item) => item.id === commentId));
}

function sanitizeCommentPages(
  data: InfiniteData<CursorPage<Comment>>,
): InfiniteData<CursorPage<Comment>> {
  const seen = new Set<string>();

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.filter((item) => {
        if (seen.has(item.id)) {
          return false;
        }

        seen.add(item.id);
        return true;
      }),
    })),
  };
}
