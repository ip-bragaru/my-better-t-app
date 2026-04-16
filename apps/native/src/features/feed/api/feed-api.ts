import type { FeedQueryDto, PostsResponseDataDto } from "@my-better-t-app/mecenate-api";

import { mecenateApi } from "@shared/api/mecenate-api";
import { APP_CONFIG } from "@shared/config/app-config";
import type { FeedFilter, Tier } from "@shared/model/types";

import { mapPostsResponse } from "@features/feed/mappers/post-mappers";

export async function fetchPosts(params: {
  token: string;
  cursor?: string;
  filter: FeedFilter;
}) {
  const tier = params.filter === "all" ? undefined : (params.filter as Tier);
  const query: FeedQueryDto = {
    limit: APP_CONFIG.feedPageSize,
    cursor: params.cursor,
    tier,
  };

  const data: PostsResponseDataDto = await mecenateApi.getPosts({
    token: params.token,
    query,
  });

  return mapPostsResponse(data);
}
