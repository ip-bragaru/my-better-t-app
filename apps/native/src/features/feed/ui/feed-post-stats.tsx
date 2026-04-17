import { PostStatsRow } from "@features/posts/ui/post-stats-row";

type FeedPostStatsProps = {
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
};

export function FeedPostStats({ likesCount, commentsCount, isLiked }: FeedPostStatsProps) {
  return (
    <PostStatsRow
      likesCount={likesCount}
      commentsCount={commentsCount}
      isLiked={isLiked}
      variant="feed"
    />
  );
}
