import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}`,
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
            url: "/api/products",
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
            url: "/api/products/byTags",
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
            url: "/api/products/byId",
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
            url: "/api/products/ofTheWeek",

            method: "GET",
          };
        },
      }),
      getCategoriesAndPreview: builder.query({
        query: () => {
          return {
            url: "/api/products/categories",
            method: "GET",
          };
        },
      }),
      getAllTags: builder.query({
        providesTags: (result, error) => {
          return [
            { type: "Product Updated" },
            { type: "Product Created" },
            { type: "Tags Updated" },
          ];
        },
        query: () => {
          return {
            url: "/api/tags",
            method: "GET",
          };
        },
      }),
      deleteChoosenTags: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Tags Updated" }];
        },
        query: (tags) => {
          return {
            url: "/api/tags/delete/",
            method: "PUT",
            body: {
              tags: tags,
            },
          };
        },
      }),
      updateProduct: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Product Updated" }];
        },
        query: (product) => {
          return {
            url: "/api/products/",
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
            url: "/api/products/setOnTheBanner",
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
            url: "/api/products/removeFromTheBanner",
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
            url: "/api/products/",
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
            url: "/api/products/",
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
  useDeleteChoosenTagsMutation,
} = productsApi;
export { productsApi };
