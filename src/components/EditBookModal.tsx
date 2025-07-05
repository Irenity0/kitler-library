import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SplitText from "@/ui/SplitText";
import toast from "react-hot-toast";

import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/features/api/booksApi";

const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // ✅ Fetch single book
  const { data, isLoading, isError } = useGetBookByIdQuery(id!);
  const book = data?.data;

  // ✅ Local form state
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    copies: 0,
  });

  // ✅ Pre-fill form when book is loaded
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        copies: book.copies,
      });
    }
  }, [book]);

  // ✅ Update book mutation
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await updateBook({ id, data: formData }).unwrap();
      toast.success("Book updated successfully!");
      navigate("/"); // Or navigate to books list
    } catch (error) {
      console.error(error);
      toast.error("Failed to update book.");
    }
  };

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  if (isLoading) {
    return (
      <div className="text-center text-muted-foreground p-8">
        Loading book data...
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="text-center text-red-500 p-8">
        Book not found or failed to load.
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center my-8">
        <SplitText
          text="Edit Book"
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
      <div className="p-6 rounded-lg mx-auto shadow border border-border w-1/2 my-8">
        <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <Label className="mb-2" htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Book title"
              required
            />
          </div>

          <div>
            <Label className="mb-2" htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author name"
              required
            />
          </div>

          <div>
            <Label className="mb-2" htmlFor="genre">Genre</Label>
            <Input
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="e.g. Manga, Fantasy"
              required
            />
          </div>

          <div>
            <Label className="mb-2" htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="ISBN number"
              required
            />
          </div>

          <div>
            <Label className="mb-2" htmlFor="copies">Copies</Label>
            <Input
              id="copies"
              name="copies"
              type="number"
              min="0"
              value={formData.copies}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditBookPage;