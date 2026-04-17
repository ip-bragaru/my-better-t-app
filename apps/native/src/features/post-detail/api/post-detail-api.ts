import {
  mapPostDetailResponse,
  mapToggleLikeResponse,
} from "@features/post-detail/mappers/post-detail-mappers";
import type {
  PostDetailResponseDataDto,
  ToggleLikeResponseDataDto,
} from "@my-better-t-app/mecenate-api";
import { mecenateApi } from "@shared/api/mecenate-api";

export async function fetchPostDetail(params: {
  token: string;
  postId?: string;
  signal?: AbortSignal;
}) {
  if (!params.postId) {
    throw new Error("Missing postId route param");
  }

  const data: PostDetailResponseDataDto = await mecenateApi.getPostDetail({
    token: params.token,
    postId: params.postId,
    signal: params.signal,
  });

  return mapPostDetailResponse(data);
}

export async function togglePostLike(params: { token: string; postId?: string }) {
  if (!params.postId) {
    throw new Error("Missing postId route param");
  }

  const data: ToggleLikeResponseDataDto = await mecenateApi.togglePostLike({
    token: params.token,
    postId: params.postId,
  });

  return mapToggleLikeResponse(data);
}
