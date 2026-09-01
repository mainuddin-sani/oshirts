import { createApi } from "@reduxjs/toolkit/query/react";
import { TAG_TYPES } from "@/constants";
import { baseQuery } from "./baseQuery";

/**
 * Root RTK Query API. Feature modules extend it with `injectEndpoints`
 * (see src/features/products/productApi.js) so there is exactly one
 * reducer/middleware and one shared cache.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: Object.values(TAG_TYPES),
  endpoints: () => ({}),
});
