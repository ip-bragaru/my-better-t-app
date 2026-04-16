import type { components, paths } from "./__generated__/mecenate-api.types";

export type TransportAuthor = components["schemas"]["Author"];
export type TransportPost = components["schemas"]["Post"];
export type TransportComment = components["schemas"]["Comment"];
export type TransportErrorEnvelope = components["schemas"]["ErrorResponse"];

export type PostsResponseDto =
  paths["/posts"]["get"]["responses"][200]["content"]["application/json"];
export type PostsResponseDataDto = NonNullable<PostsResponseDto["data"]>;
export type PostDetailResponseDto =
  paths["/posts/{id}"]["get"]["responses"][200]["content"]["application/json"];
export type PostDetailResponseDataDto = NonNullable<PostDetailResponseDto["data"]>;
export type ToggleLikeResponseDto =
  paths["/posts/{id}/like"]["post"]["responses"][200]["content"]["application/json"];
export type ToggleLikeResponseDataDto = NonNullable<ToggleLikeResponseDto["data"]>;
export type CommentsResponseDto =
  paths["/posts/{id}/comments"]["get"]["responses"][200]["content"]["application/json"];
export type CommentsResponseDataDto = NonNullable<CommentsResponseDto["data"]>;
export type CreateCommentRequestDto =
  paths["/posts/{id}/comments"]["post"]["requestBody"]["content"]["application/json"];
export type CreateCommentResponseDto =
  paths["/posts/{id}/comments"]["post"]["responses"][201]["content"]["application/json"];
export type CreateCommentResponseDataDto = NonNullable<CreateCommentResponseDto["data"]>;

export type FeedQueryDto = NonNullable<paths["/posts"]["get"]["parameters"]["query"]>;
export type CommentsQueryDto =
  NonNullable<paths["/posts/{id}/comments"]["get"]["parameters"]["query"]>;

export type ApiClientErrorCode =
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR"
  | "NETWORK_ERROR"
  | "UNKNOWN_ERROR";

export type ApiClientError = {
  code: ApiClientErrorCode;
  message: string;
  status: number | null;
};

type RequestOptions = {
  method?: "GET" | "POST";
  path: string;
  token: string;
  query?: Record<string, boolean | number | string | undefined>;
  body?: unknown;
  signal?: AbortSignal;
};

export type MecenateApiClient = ReturnType<typeof createMecenateApiClient>;

export function createMecenateApiClient(baseUrl: string) {
  return {
    getPosts: (params: {
      token: string;
      query: FeedQueryDto;
      signal?: AbortSignal;
    }) =>
      requestJson<PostsResponseDataDto>(baseUrl, {
        path: "posts",
        token: params.token,
        query: params.query,
        signal: params.signal,
      }),
    getPostDetail: (params: {
      token: string;
      postId: string;
      signal?: AbortSignal;
    }) =>
      requestJson<PostDetailResponseDataDto>(baseUrl, {
        path: `posts/${params.postId}`,
        token: params.token,
        signal: params.signal,
      }),
    togglePostLike: (params: { token: string; postId: string; signal?: AbortSignal }) =>
      requestJson<ToggleLikeResponseDataDto>(baseUrl, {
        method: "POST",
        path: `posts/${params.postId}/like`,
        token: params.token,
        signal: params.signal,
      }),
    getComments: (params: {
      token: string;
      postId: string;
      query: CommentsQueryDto;
      signal?: AbortSignal;
    }) =>
      requestJson<CommentsResponseDataDto>(baseUrl, {
        path: `posts/${params.postId}/comments`,
        token: params.token,
        query: params.query,
        signal: params.signal,
      }),
    createComment: (params: {
      token: string;
      postId: string;
      body: CreateCommentRequestDto;
      signal?: AbortSignal;
    }) =>
      requestJson<CreateCommentResponseDataDto>(baseUrl, {
        method: "POST",
        path: `posts/${params.postId}/comments`,
        token: params.token,
        body: params.body,
        signal: params.signal,
      }),
  };
}

async function requestJson<TData>(
  baseUrl: string,
  {
    method = "GET",
    path,
    token,
    query,
    body,
    signal,
  }: RequestOptions,
): Promise<TData> {
  const url = createUrl(baseUrl, path, query);

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch {
    throw createApiClientError({
      code: "NETWORK_ERROR",
      message: "Network request failed. Check your connection and try again.",
      status: null,
    });
  }

  const payload = (await response.json()) as unknown;

  if (!response.ok) {
    const errorPayload = getErrorPayload(payload);
    const errorCode = errorPayload?.code ?? "UNKNOWN_ERROR";
    const errorMessage = errorPayload?.message ?? "Unexpected response.";

    throw createApiClientError({
      code: normalizeErrorCode(errorCode),
      message: errorMessage,
      status: response.status,
    });
  }

  if (hasEnvelopeError(payload)) {
    const errorCode = payload.error.code ?? "UNKNOWN_ERROR";
    const errorMessage = payload.error.message ?? "Unexpected response.";

    throw createApiClientError({
      code: normalizeErrorCode(errorCode),
      message: errorMessage,
      status: response.status,
    });
  }

  if (hasEnvelopeData<TData>(payload)) {
    assertNonNullable(payload.data, "Successful response payload is missing data");

    return payload.data;
  }

  if (isRecord(payload)) {
    return payload as TData;
  }

  throw createApiClientError({
    code: "UNKNOWN_ERROR",
    message: "Unexpected response.",
    status: response.status,
  });
}

function createUrl(
  baseUrl: string,
  path: string,
  query?: RequestOptions["query"],
) {
  const url = new URL(path, `${baseUrl}/`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined) {
        continue;
      }

      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

function normalizeErrorCode(code: string): ApiClientError["code"] {
  switch (code) {
    case "UNAUTHORIZED":
    case "NOT_FOUND":
    case "VALIDATION_ERROR":
    case "INTERNAL_ERROR":
      return code;
    default:
      return "UNKNOWN_ERROR";
  }
}

function createApiClientError(error: ApiClientError) {
  return error;
}

function getErrorPayload(value: unknown) {
  if (!isRecord(value) || !("error" in value) || !isRecord(value.error)) {
    return null;
  }

  const code = typeof value.error.code === "string" ? value.error.code : null;
  const message =
    typeof value.error.message === "string" ? value.error.message : null;

  return {
    code,
    message,
  };
}

function hasEnvelopeData<TData>(
  value: unknown,
): value is { ok?: boolean; data: TData } {
  return isRecord(value) && "data" in value;
}

function hasEnvelopeError(
  value: unknown,
): value is { ok?: boolean; error: { code?: string; message?: string } } {
  return isRecord(value) && "error" in value && isRecord(value.error);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function assertNonNullable<TValue>(
  value: TValue,
  message: string,
): asserts value is NonNullable<TValue> {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}
