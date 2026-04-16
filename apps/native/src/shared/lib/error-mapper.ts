import type { ApiError } from "@shared/model/types";

const FALLBACK_ERROR_MESSAGE = "Something went wrong. Please try again.";

export function mapApiError(error: unknown): ApiError {
  if (isApiError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return {
      code: "UNKNOWN_ERROR",
      message: error.message || FALLBACK_ERROR_MESSAGE,
      status: null,
    };
  }

  return {
    code: "UNKNOWN_ERROR",
    message: FALLBACK_ERROR_MESSAGE,
    status: null,
  };
}

function isApiError(value: unknown): value is ApiError {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ApiError>;

  return (
    typeof candidate.code === "string" &&
    typeof candidate.message === "string" &&
    "status" in candidate
  );
}
