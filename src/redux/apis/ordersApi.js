import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://books-market-server.onrender.com/api",
    prepareHeaders: (headers, { getState }) => {
      const states = getState();
      if (states.user.userInfo.token) {
        headers.set("authorization", `Bearer ${states.user.userInfo.token}`);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getAllOrders: builder.query({
        providesTags: (result, error) => {
          return [{ type: "Order Created" }, { type: "Order Updated" }];
        },
        query: () => {
          return {
            url: "/orders",
            method: "GET",
          };
        },
      }),
      getMyOrders: builder.query({
        providesTags: (result, error) => {
          return [{ type: "Order Updated" }];
        },
        query: () => {
          return {
            url: "/orders/myorders",
            method: "GET",
          };
        },
      }),
      updateOrderStatus: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Order Updated" }];
        },
        query: (payload) => {
          return {
            url: "/orders/",
            method: "PUT",
            body: {
              payload,
            },
          };
        },
      }),
      cancelOrder: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Order Updated" }];
        },
        query: (payload) => {
          return {
            url: "/orders/cancel",
            method: "PUT",
            body: {
              payload,
            },
          };
        },
      }),
    };
  },
});

export const {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetMyOrdersQuery,
  useCancelOrderMutation,
} = ordersApi;
export { ordersApi };
