import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook } from "../../../types/common";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", // 🔗 Replace with your backend API base URL
  }),
  tagTypes: ["Books", "Borrows", "BorrowSummary"],

  endpoints: (builder) => ({
    // 👉 GET: Fetch all books
    getBooks: builder.query<IBook[], void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),

    // 👉 GET: Fetch single book by ID
    getBookById: builder.query<IBook, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Books", id }],
    }),

    // 👉 POST: Add new book
    addBook: builder.mutation<IBook, Partial<IBook>>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    // 👉 PATCH: Update book by ID
    updateBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Books",
        { type: "Books", id },
      ],
    }),

    // 👉 DELETE: Delete book by ID
    deleteBook: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    })
  }),
});

// ✅ Export hooks for usage in components
export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;