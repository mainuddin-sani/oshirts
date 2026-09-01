import { HTTP_STATUS } from "@/constants";

const STATUS_MESSAGES = {
  [HTTP_STATUS.BAD_REQUEST]: "The request was invalid.",
  [HTTP_STATUS.UNAUTHORIZED]: "You need to sign in to do that.",
  [HTTP_STATUS.FORBIDDEN]: "You don't have permission to do that.",
  [HTTP_STATUS.NOT_FOUND]: "The requested resource was not found.",
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]: "Some fields are invalid.",
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]:
    "Something went wrong on the server. Please try again.",
};

const NETWORK_MESSAGES = {
  FETCH_ERROR: "Unable to reach the server. Check your connection.",
  PARSING_ERROR: "The server returned an unexpected response.",
  TIMEOUT_ERROR: "The request timed out. Please try again.",
  CUSTOM_ERROR: "An unexpected error occurred.",
};

/**
 * Normalize any RTK Query / fetchBaseQuery error into a predictable shape:
 *   { status, message, fieldErrors, raw }
 *
 * - `status`      numeric HTTP status, or a string like "FETCH_ERROR"
 * - `message`     human readable summary (server message wins over default)
 * - `fieldErrors` { [field]: string } for 400/422 validation responses
 */
export function normalizeApiError(error) {
  if (!error) {
    return { status: null, message: "", fieldErrors: {}, raw: null };
  }

  const status = error.status ?? error.originalStatus ?? null;
  const data = error.data;

  const serverMessage =
    (data && typeof data === "object" && (data.message || data.error)) ||
    (typeof data === "string" && data.trim()) ||
    null;

  let message;
  if (typeof status === "number") {
    message =
      serverMessage ||
      STATUS_MESSAGES[status] ||
      (status >= 500
        ? STATUS_MESSAGES[HTTP_STATUS.INTERNAL_SERVER_ERROR]
        : `Request failed with status ${status}.`);
  } else {
    message =
      NETWORK_MESSAGES[status] ||
      error.error ||
      serverMessage ||
      NETWORK_MESSAGES.CUSTOM_ERROR;
  }

  const fieldErrors = extractFieldErrors(data);

  return { status, message, fieldErrors, raw: error };
}

function extractFieldErrors(data) {
  if (!data || typeof data !== "object") return {};
  const source = data.errors || data.fieldErrors;
  if (!source || typeof source !== "object") return {};

  return Object.entries(source).reduce((acc, [field, value]) => {
    acc[field] = Array.isArray(value) ? value.join(" ") : String(value);
    return acc;
  }, {});
}

export function isStatus(error, status) {
  return normalizeApiError(error).status === status;
}
