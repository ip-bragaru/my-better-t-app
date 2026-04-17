import { PostAuthorRow } from "@features/posts/ui/post-author-row";
import type { Author } from "@shared/model/types";

type FeedAuthorHeaderProps = {
  author: Author;
};

export function FeedAuthorHeader({ author }: FeedAuthorHeaderProps) {
  return <PostAuthorRow author={author} showVerified={false} />;
}
