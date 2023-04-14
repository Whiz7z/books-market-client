import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const states = getState();
      if (states.user.userInfo && states.user.userInfo.token) {
        headers.set("authorization", `Bearer ${states.user.userInfo.token}`);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getAllProducts: builder.query({
        providesTags: (result, error) => {
          return [
            { type: "Product Updated" },
            { type: "Product Created" },
            { type: "Product Deleted" },
          ];
        },
        query: (category) => {
          return {
            url: "/products",
            params: {
              category: category,
            },
            method: "GET",
          };
        },
      }),
      getProductsByTags: builder.query({
        query: (tags) => {
          return {
            url: "/products/byTags",
            params: {
              tags: tags,
            },
            method: "GET",
          };
        },
      }),
      getProductById: builder.query({
        query: (id) => {
          return {
            url: "/products/byId",
            params: {
              id: id,
            },
            method: "GET",
          };
        },
      }),
      getProductOfTheWeek: builder.query({
        query: () => {
          return {
            url: "/products/ofTheWeek",

            method: "GET",
          };
        },
      }),
      getCategoriesAndPreview: builder.query({
        query: () => {
          return {
            url: "/products/categories",
            method: "GET",
          };
        },
      }),
      getAllTags: builder.query({
        query: () => {
          return {
            url: "/tags",
            method: "GET",
          };
        },
      }),
      updateProduct: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Product Updated" }];
        },
        query: (product) => {
          return {
            url: "/products/",
            method: "PUT",
            body: {
              product,
            },
          };
        },
      }),
      setProductOnTheBanner: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Product Updated" }];
        },
        query: (id) => {
          return {
            url: "/products/setOnTheBanner",
            method: "PUT",
            body: {
              id,
            },
          };
        },
      }),
      removeProductFromTheBanner: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Product Updated" }];
        },
        query: (id) => {
          return {
            url: "/products/removeFromTheBanner",
            method: "PUT",
            body: {
              id,
            },
          };
        },
      }),
      createProduct: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Product Created" }];
        },
        query: (product) => {
          return {
            url: "/products/",
            method: "POST",
            body: {
              product,
            },
          };
        },
      }),
      deleteProduct: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Product Deleted" }];
        },
        query: (productId) => {
          return {
            url: "/products/",
            method: "DELETE",
            body: {
              productId,
            },
          };
        },
      }),
    };
  },
});

export const {
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesAndPreviewQuery,
  useGetAllTagsQuery,
  useLazyGetProductsByTagsQuery,
  useGetProductByIdQuery,
  useSetProductOnTheBannerMutation,
  useRemoveProductFromTheBannerMutation,
  useGetProductOfTheWeekQuery,
} = productsApi;
export { productsApi };
