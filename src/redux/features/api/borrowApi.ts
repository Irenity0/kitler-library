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
      { data: Partial<IBorrow> }
    >({
      query: ({ data }) => ({
        url: `/borrow`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrows", "BorrowSummary"],
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