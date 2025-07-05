import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAddBookMutation } from "@/redux/features/api/booksApi";
import toast from "react-hot-toast";
import { GenreOptions, type Genre } from "@/types/genre";

type FormData = {
  title: string;
  author: string;
  genre: Genre | "";  // allow empty string for default
  isbn: string;
  description: string;
  copies: number;
};

const AddBookForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCreateRoute = location.pathname === "/create-book";

  const [addBook, { isLoading, error }] = useAddBookMutation();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.genre) {
      toast.error("Please select a genre");
      return;
    }

    try {
      await addBook({
        ...formData,
        available: formData.copies > 0,
      }).unwrap();

      toast.success("Book added successfully!");
      navigate("/books");

      setFormData({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        description: "",
        copies: 0,
      });
    } catch (err) {
      console.error("Failed to add book:", err);
      toast.error("Failed to add book. Please try again.");
    }
  };

  const errorMessage =
    error && typeof error === "object" && "data" in error && error.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? (error as any).data.message
      : null;

  return (
    <div
      className={`p-6 rounded-lg mx-auto shadow border border-border ${
        isCreateRoute ? "w-1/2" : "w-full m-4"
      }`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Title */}
        <div>
          <Label className="mb-2" htmlFor="title">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book title"
            required
          />
        </div>

        {/* Author */}
        <div>
          <Label className="mb-2" htmlFor="author">
            Author
          </Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author name"
            required
          />
        </div>

        {/* Genre select */}
        <div>
          <Label className="mb-2" htmlFor="genre">
            Genre
          </Label>
          <select
  id="genre"
  name="genre"
  value={formData.genre}
  onChange={handleChange}
  required
  className="w-full rounded border border-gray-300 px-3 py-2"
>
  <option value="">Select a genre</option>
  {GenreOptions.map((g) => (
    <option key={g} value={g}>
      {g.replace("_", " ")}
    </option>
  ))}
</select>
        </div>

        {/* Description */}
        <div>
          <Label className="mb-2" htmlFor="description">
            Description
          </Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional description"
          />
        </div>

        {/* ISBN */}
        <div>
          <Label className="mb-2" htmlFor="isbn">
            ISBN
          </Label>
          <Input
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="ISBN number"
            required
          />
        </div>

        {/* Copies */}
        <div>
          <Label className="mb-2" htmlFor="copies">
            Copies
          </Label>
          <Input
            id="copies"
            name="copies"
            type="number"
            min="0"
            value={formData.copies}
            onChange={handleChange}
          />
        </div>

        {/* Error message */}
        {errorMessage && <p className="text-red-500">Error: {errorMessage}</p>}

        {/* Submit button */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Book"}
        </Button>
      </form>
    </div>
  );
};

export default AddBookForm;