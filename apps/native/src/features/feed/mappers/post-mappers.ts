import type {
  PostsResponseDataDto,
  TransportAuthor,
  TransportPost,
} from "@my-better-t-app/mecenate-api";
import { invariant } from "@shared/lib/invariant";
import type { Author, CursorPage, Post } from "@shared/model/types";

export function mapPostsResponse(dto: PostsResponseDataDto): CursorPage<Post> {
  invariant(dto.posts, "PostsResponse.posts is missing");

  return {
    items: dto.posts.map(mapPost),
    nextCursor: dto.nextCursor ?? null,
    hasMore: dto.hasMore ?? false,
  };
}

export function mapPost(dto: TransportPost): Post {
  invariant(dto.id, "Post.id is missing");
  invariant(dto.author, "Post.author is missing");
  invariant(dto.title, "Post.title is missing");
  invariant(dto.body, "Post.body is missing");
  invariant(dto.preview, "Post.preview is missing");
  invariant(dto.coverUrl, "Post.coverUrl is missing");
  invariant(dto.likesCount, "Post.likesCount is missing");
  invariant(dto.commentsCount, "Post.commentsCount is missing");
  invariant(dto.isLiked, "Post.isLiked is missing");
  invariant(dto.tier, "Post.tier is missing");
  invariant(dto.createdAt, "Post.createdAt is missing");

  return {
    id: dto.id,
    author: mapAuthor(dto.author),
    title: dto.title,
    body: dto.body,
    preview: dto.preview,
    coverUrl: dto.coverUrl,
    likesCount: dto.likesCount,
    commentsCount: dto.commentsCount,
    isLiked: dto.isLiked,
    tier: dto.tier,
    createdAt: dto.createdAt,
  };
}

export function mapAuthor(dto: TransportAuthor): Author {
  invariant(dto.id, "Author.id is missing");
  invariant(dto.username, "Author.username is missing");
  invariant(dto.displayName, "Author.displayName is missing");
  invariant(dto.avatarUrl, "Author.avatarUrl is missing");
  invariant(dto.bio, "Author.bio is missing");
  invariant(dto.subscribersCount, "Author.subscribersCount is missing");
  invariant(dto.isVerified, "Author.isVerified is missing");

  return {
    id: dto.id,
    username: dto.username,
    displayName: dto.displayName,
    avatarUrl: dto.avatarUrl,
    bio: dto.bio,
    subscribersCount: dto.subscribersCount,
    isVerified: dto.isVerified,
  };
}
