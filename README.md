# ooshirts

Next.js (App Router, JavaScript only) + Redux Toolkit + RTK Query.

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit NEXT_PUBLIC_API_URL
npm run dev
```

Open http://localhost:3000.

## Environment

| Variable              | Purpose                                   |
| --------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL for every RTK Query request.     |

The repo ships with a small in-memory mock API under `src/app/api/**` so the
UI is fully functional out of the box. `.env.local` points at it
(`http://localhost:3000/api`). Change it to your real backend
(e.g. `http://localhost:8000/api`) — no component or endpoint file needs to change.

## Architecture

```
src/
├── app/                      # App Router (server components by default)
│   ├── layout.js             # wraps the tree in <Providers/>
│   ├── providers.js          # "use client" – Redux <Provider/>
│   ├── page.js               # products list
│   ├── products/[id]/        # product detail
│   ├── products/new/         # create product
│   └── api/products/**       # mock REST API (dev only)
├── redux/
│   ├── store.js              # configureStore + RTK Query middleware
│   ├── api/baseQuery.js      # fetchBaseQuery + auth header + 401 handling
│   ├── api/baseApi.js        # createApi root; features inject endpoints
│   └── slices/authSlice.js   # token storage used by baseQuery
├── features/products/
│   ├── productApi.js         # injectEndpoints: CRUD + tags
│   └── components/           # client components using generated hooks
├── components/               # shared UI (Spinner, ErrorMessage, …)
├── hooks/                    # useDebounce
├── utils/                    # normalizeApiError, formatters
├── constants/                # tags, pagination, HTTP status codes
└── mocks/                    # in-memory data for the mock API
```

### Adding a new feature module

```js
// src/features/orders/orderApi.js
import { baseApi } from "@/redux/api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({ query: (params) => ({ url: "/orders", params }) }),
  }),
});

export const { useGetOrdersQuery } = orderApi;
```

Add any new tag names to `TAG_TYPES` in `src/constants/index.js`.

### Auth

`baseQuery.js` reads `state.auth.token` and sends it as a `Bearer` header on
every request. Dispatch `setCredentials({ token, user })` after login; a `401`
response clears the token automatically.

### Errors

`normalizeApiError(error)` (in `src/utils/apiError.js`) turns any RTK Query
error (400/401/403/404/422/500, network, parsing) into
`{ status, message, fieldErrors }`. `ErrorMessage` and `ProductForm` use it.

### Testing error states with the mock API

- `GET /api/products?fail=500` (or `401`, `403`) returns a simulated error.
- Submitting an empty product form returns a `422` with field errors.
- Visiting `/products/does-not-exist` returns a `404`.
