import type {
  PostDetailResponseDataDto,
  ToggleLikeResponseDataDto,
} from "@my-better-t-app/mecenate-api";
import { invariant } from "@shared/lib/invariant";

import { mapPost } from "@features/feed/mappers/post-mappers";

export function mapPostDetailResponse(dto: PostDetailResponseDataDto) {
  invariant(dto.post, "PostDetailResponse.post is missing");

  return mapPost(dto.post);
}

export function mapToggleLikeResponse(dto: ToggleLikeResponseDataDto) {
  invariant(dto.isLiked, "LikeResponse.isLiked is missing");
  invariant(dto.likesCount, "LikeResponse.likesCount is missing");

  return {
    isLiked: dto.isLiked,
    likesCount: dto.likesCount,
  };
}
