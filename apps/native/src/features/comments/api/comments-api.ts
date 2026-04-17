import {
  mapCommentsResponse,
  mapCreateCommentResponse,
} from "@features/comments/mappers/comment-mappers";
import type {
  CommentsQueryDto,
  CommentsResponseDataDto,
  CreateCommentRequestDto,
  CreateCommentResponseDataDto,
} from "@my-better-t-app/mecenate-api";
import { mecenateApi } from "@shared/api/mecenate-api";
import { APP_CONFIG } from "@shared/config/app-config";

export async function fetchComments(params: {
  token: string;
  postId?: string;
  cursor?: string;
  signal?: AbortSignal;
}) {
  if (!params.postId) {
    throw new Error("Missing postId route param");
  }

  const query: CommentsQueryDto = {
    limit: APP_CONFIG.commentsPageSize,
    cursor: params.cursor,
  };

  const data: CommentsResponseDataDto = await mecenateApi.getComments({
    token: params.token,
    postId: params.postId,
    query,
    signal: params.signal,
  });

  return mapCommentsResponse(data);
}

export async function createComment(params: { token: string; postId?: string; text: string }) {
  if (!params.postId) {
    throw new Error("Missing postId route param");
  }

  const body: CreateCommentRequestDto = {
    text: params.text,
  };

  const data: CreateCommentResponseDataDto = await mecenateApi.createComment({
    token: params.token,
    body,
    postId: params.postId,
  });

  return mapCreateCommentResponse(data);
}
