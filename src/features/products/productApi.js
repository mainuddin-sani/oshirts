import { baseApi } from "@/redux/api/baseApi";
import { LIST_TAG_ID, TAG_TYPES } from "@/constants";

const PRODUCT = TAG_TYPES.PRODUCT;

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: PRODUCT, id })),
              { type: PRODUCT, id: LIST_TAG_ID },
            ]
          : [{ type: PRODUCT, id: LIST_TAG_ID }],
    }),

    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: PRODUCT, id }],
    }),

    createProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: PRODUCT, id: LIST_TAG_ID }],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: PRODUCT, id },
        { type: PRODUCT, id: LIST_TAG_ID },
      ],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: PRODUCT, id },
        { type: PRODUCT, id: LIST_TAG_ID },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
