import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BorrowSummaryResponse, IBorrow } from "../../../types/common";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["Borrows", "BorrowSummary", "Books"],

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
      invalidatesTags: ["Borrows", "BorrowSummary", "Books"],
    }),

    getBorrowSummary: builder.query<BorrowSummaryResponse, void>({
      query: () => "/borrow",
      providesTags: ["BorrowSummary"],
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = borrowApi;