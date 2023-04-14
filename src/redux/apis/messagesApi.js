import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const messagesApi = createApi({
  reducerPath: "messagesApi",
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
      getAllMessages: builder.query({
        providesTags: (result, error) => {
          return [{ type: "Message Updated" }];
        },
        query: () => {
          return {
            url: "messages",
            method: "GET",
          };
        },
      }),
      updateMessageStatus: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Message Updated" }];
        },
        query: (payload) => {
          return {
            url: "/messages/",
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

export const { useGetAllMessagesQuery, useUpdateMessageStatusMutation } =
  messagesApi;
export { messagesApi };
