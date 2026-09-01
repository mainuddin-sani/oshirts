export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const TAG_TYPES = {
  PRODUCT: "Product",
};

export const LIST_TAG_ID = "LIST";

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 5,
  LIMIT_OPTIONS: [5, 10, 20],
};

export const PRODUCT_CATEGORIES = ["t-shirt", "hoodie", "cap", "mug"];
export const PRODUCT_STATUSES = ["active", "draft", "archived"];

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

export const AUTH_STORAGE_KEY = "ooshirts.auth.token";
