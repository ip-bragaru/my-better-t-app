import type {
  CommentsResponseDataDto,
  CreateCommentResponseDataDto,
  TransportComment,
} from "@my-better-t-app/mecenate-api";
import { invariant } from "@shared/lib/invariant";
import type { Comment, CursorPage } from "@shared/model/types";

import { mapAuthor } from "@features/feed/mappers/post-mappers";

export function mapCommentsResponse(dto: CommentsResponseDataDto): CursorPage<Comment> {
  invariant(dto.comments, "CommentsResponse.comments is missing");

  return {
    items: dto.comments.map(mapComment),
    nextCursor: dto.nextCursor ?? null,
    hasMore: dto.hasMore ?? false,
  };
}

export function mapCreateCommentResponse(dto: CreateCommentResponseDataDto) {
  invariant(dto.comment, "CommentCreatedResponse.comment is missing");

  return mapComment(dto.comment);
}

export function mapComment(dto: TransportComment): Comment {
  invariant(dto.id, "Comment.id is missing");
  invariant(dto.postId, "Comment.postId is missing");
  invariant(dto.author, "Comment.author is missing");
  invariant(dto.text, "Comment.text is missing");
  invariant(dto.createdAt, "Comment.createdAt is missing");

  return {
    id: dto.id,
    postId: dto.postId,
    author: mapAuthor(dto.author),
    text: dto.text,
    createdAt: dto.createdAt,
  };
}
