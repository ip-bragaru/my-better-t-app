export type Tier = "free" | "paid";

export type FeedFilter = "all" | Tier;

export type Author = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  subscribersCount: number;
  isVerified: boolean;
};

export type Post = {
  id: string;
  author: Author;
  title: string;
  body: string;
  preview: string;
  coverUrl: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tier: Tier;
  createdAt: string;
};

export type Comment = {
  id: string;
  postId: string;
  author: Author;
  text: string;
  createdAt: string;
};

export type CursorPage<TItem> = {
  items: TItem[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR"
  | "NETWORK_ERROR"
  | "UNKNOWN_ERROR";

export type ApiError = {
  code: ApiErrorCode;
  message: string;
  status: number | null;
};

export type ApiSuccessEnvelope<TData> = {
  ok: true;
  data: TData;
};

export type ApiErrorEnvelope = {
  ok: false;
  error: {
    code: string;
    message: string;
  };
};

export type ApiEnvelope<TData> = ApiSuccessEnvelope<TData> | ApiErrorEnvelope;

export type LikeUpdatedEvent = {
  type: "like_updated";
  postId: string;
  likesCount: number;
};

export type CommentAddedEvent = {
  type: "comment_added";
  postId: string;
  comment: Comment;
};

export type PingEvent = {
  type: "ping";
};

export type RealtimeEvent = PingEvent | LikeUpdatedEvent | CommentAddedEvent;
