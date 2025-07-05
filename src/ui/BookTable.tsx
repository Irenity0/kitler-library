import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import SplitText from "./SplitText";
import AddBookModal from "@/components/ui/AddBookModal";
import toast from "react-hot-toast";

import { useGetBooksQuery } from "@/redux/features/api/booksApi";

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
}

const BookTable = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Fetch books for the current page
  const { data, isLoading, isError } = useGetBooksQuery(page);

  const books = data?.data ?? [];
  const pagination = data?.pagination;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDelete = (bookId: string) => {
    toast.success("Book deleted successfully!");
    // TODO: Implement actual delete logic here
  };

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || (pagination && newPage > pagination.pages)) return;
    setPage(newPage);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <SplitText
          text="Our Books Collection"
          className="text-3xl text-center font-bold"
          duration={0.3}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>

      <div className="w-full mx-auto my-8 px-4">
        <div className="mb-4 text-right">
          <Button size="sm" onClick={() => setOpen(true)}>
            + Add New Book
          </Button>
        </div>

        {isLoading ? (
          <p className="text-sm text-center text-muted-foreground">Loading books...</p>
        ) : isError ? (
          <p className="text-sm text-red-500 text-center">
            ⚠️ Failed to load books. Please try again later.
          </p>
        ) : books.length === 0 ? (
          <p className="text-center text-muted-foreground">You haven’t added any books yet {">.<"}</p>
        ) : (
          <>
            <div className="overflow-x-auto rounded-md border border-border bg-muted/40 shadow-sm">
              <table className="min-w-full text-sm border-collapse">
                <thead className="bg-background text-muted-foreground border-b border-border">
                  <tr>
                    <th className="px-2 py-2 text-left">Title</th>
                    <th className="px-2 py-2 text-left">Author</th>
                    <th className="px-2 py-2 text-left">Genre</th>
                    <th className="px-2 py-2 text-left">ISBN</th>
                    <th className="px-2 py-2 text-left">Copies</th>
                    <th className="px-2 py-2 text-left">Availability</th>
                    <th className="px-2 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {books.map((book) => {
                    const isAvailable = book.copies > 0;

                    return (
                      <tr key={book._id} className="hover:bg-muted/60 transition-colors">
                        <td className="px-2 py-2">
                          <Link to={`/books/${book._id}`} className="underline">{book.title}</Link>
                        </td>
                        <td className="px-2 py-2">{book.author}</td>
                        <td className="px-2 py-2">{book.genre}</td>
                        <td className="px-2 py-2">{book.isbn}</td>
                        <td className="px-2 py-2">{book.copies}</td>
                        <td className="px-2 py-2">
                          <span
                            className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                              isAvailable ? "text-blue-400 bg-blue-400/10" : "text-purple-400 bg-purple-600/10"
                            }`}
                          >
                            {isAvailable ? "Available" : "Unavailable"}
                          </span>
                        </td>
                        <td className="px-2 py-2 flex gap-1">
                          <Button size="sm"><Link to={`/edit-book/${book._id}`}>Edit</Link></Button>
                          <Button onClick={() => handleDelete(book._id)} variant="destructive" size="sm">Delete</Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className={isAvailable ? "pt-1.5" : "bg-muted text-muted-foreground cursor-not-allowed"}
                            disabled={!isAvailable}
                          >
                            <Link to={`/borrow/${book._id}`} className="w-full h-full">Borrow</Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/books/${book._id}`}>Details</Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {pagination && (
              <div className="flex justify-center space-x-2 mt-4">
                <Button size={"xs"} disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
                  Previous
                </Button>

                {/* Display page numbers */}
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((pageNum) => (
                  <Button
                  size={"xs"}
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                ))}

                <Button size={"xs"} disabled={page === pagination.pages} onClick={() => handlePageChange(page + 1)}>
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Book Modal */}
      <AddBookModal open={open} onOpenChange={setOpen} />
    </>
  );
};

export default BookTable;
