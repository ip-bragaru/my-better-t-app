import { PaidPostPlaceholder } from "@features/posts/ui/paid-post-placeholder";
import { PostTextBlock } from "@features/posts/ui/post-text-block";
import type { Post } from "@shared/model/types";
import { match } from "ts-pattern";

type PostContentSwitcherProps = {
  post: Post;
  mode: "feed" | "detail";
  onDonatePress?: () => void;
};

export function PostContentSwitcher({ post, mode, onDonatePress }: PostContentSwitcherProps) {
  return match({ mode, tier: post.tier, body: post.body.trim() })
    .with({ mode: "feed", tier: "paid" }, () => (
      <PaidPostPlaceholder compact onDonatePress={onDonatePress} />
    ))
    .with({ mode: "detail", body: "" }, () => <PaidPostPlaceholder onDonatePress={onDonatePress} />)
    .with({ mode: "feed" }, () => (
      <PostTextBlock title={post.title} text={post.preview} collapsible />
    ))
    .otherwise(() => <PostTextBlock title="История" text={post.body} collapsible />);
}
