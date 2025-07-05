import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useGetBookByIdQuery } from "@/redux/features/api/booksApi";

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetBookByIdQuery(id!);

  const book = data?.data; // ✅ unwrap your book!

  useEffect(() => {
    if (isError) {
      const timeout = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isError, navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-neutral-300 p-4">
        <p className="text-xl font-semibold mb-2">Loading book details...</p>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="flex flex-col justify-center items-center text-neutral-300 p-4">
        <p className="text-xl font-semibold mb-2">Book not found 😕</p>
        <p className="text-neutral-400">Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="h-[643px] flex justify-center items-center p-6">
      <div className="max-w-md w-full rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4 text-neutral-300">{book.title}</h1>
        <p className="text-neutral-400 mb-2">
          <span className="font-semibold">Author:</span> {book.author}
        </p>
        <p className="text-neutral-400 mb-2">
          <span className="font-semibold">Genre:</span> {book.genre}
        </p>
        <p className="text-neutral-400 mb-2">
          <span className="font-semibold">ISBN:</span> {book.isbn}
        </p>
        <p className="text-neutral-400 mb-2">
          <span className="font-semibold">Description:</span> {book.description}
        </p>
        <p
          className={`mb-4 font-semibold ${
            book.copies > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {book.copies > 0
            ? `Available copies: ${book.copies}`
            : "Currently unavailable"}
        </p>

        <Button onClick={() => navigate(-1)}>← Back</Button>
      </div>
    </div>
  );
};

export default DetailsPage;