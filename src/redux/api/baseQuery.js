import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, HTTP_STATUS } from "@/constants";
import { logout } from "@/redux/slices/authSlice";

/**
 * Single place to configure how every request is made.
 * Auth headers are attached here so no endpoint has to repeat that logic.
 */
const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    if (!headers.has("Accept")) {
      headers.set("Accept", "application/json");
    }
    return headers;
  },
});

/**
 * Wraps the raw query so cross-cutting concerns (401 handling, logging,
 * future token refresh) live in one place.
 */
export const baseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;

    if (status === HTTP_STATUS.UNAUTHORIZED) {
      // Token is invalid/expired: clear it centrally.
      // A refresh-token flow can be slotted in here later.
      if (api.getState()?.auth?.token) {
        api.dispatch(logout());
      }
    }

    if (process.env.NODE_ENV !== "production") {
      // Never silently swallow API failures during development.
      console.error("[api]", status, args, result.error.data ?? result.error);
    }
  }

  return result;
};
