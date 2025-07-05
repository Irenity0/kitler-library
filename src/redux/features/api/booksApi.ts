import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook } from "../../../types/common";
import type { BookResponse, BooksResponse } from "@/types/response";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-2-three-alpha.vercel.app/api", // 🔗 Replace with your backend API base URL
  }),
  tagTypes: ["Books", "Borrows", "BorrowSummary"],

  endpoints: (builder) => ({
    // 👉 GET: Fetch all books
    getBooks: builder.query<BooksResponse, number>({
      query: (page = 1) => `/books?page=${page}`,
      providesTags: ["Books"],
    }),

    // 👉 GET: Fetch single book by ID
    getBookById: builder.query<BookResponse, string>({
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

    // 👉 PUT: Update book by ID
    updateBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
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