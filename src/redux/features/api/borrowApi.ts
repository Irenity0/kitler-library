import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBorrow, IBorrowSummary } from "../../../types/common";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["Borrows", "BorrowSummary"],

  endpoints: (builder) => ({
    borrowBook: builder.mutation<
      IBorrow,
      { bookId: string; data: Partial<IBorrow> }
    >({
      query: ({ bookId, data }) => ({
        url: `/borrow/${bookId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrows", "BorrowSummary"], // if you have separate caches
    }),

    getBorrowSummary: builder.query<IBorrowSummary[], void>({
      query: () => "/borrow-summary",
      providesTags: ["BorrowSummary"],
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = borrowApi;