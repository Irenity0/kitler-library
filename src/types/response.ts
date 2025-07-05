import type { IBook } from "./common";

export interface BooksResponse {
  success: boolean;
  message: string;
  data: IBook[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface BookResponse {
  success: boolean;
  message: string;
  data: IBook; // NOT IBook[]
}