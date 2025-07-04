"use client";

import { useState } from "react";
import { useLocation } from "react-router"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AddBookForm = () => {
  const location = useLocation();
  const isCreateRoute = location.pathname === "/create-book";

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    copies: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Book:", formData);

    // Reset form
    setFormData({
      title: "",
      author: "",
      genre: "",
      isbn: "",
      copies: 0,
    });
  };

  return (
    <div
      className={`p-6 rounded-lg mx-auto shadow border border-border ${
        isCreateRoute ? "w-1/2" : "w-full m-4"
      }`}
    >
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

        <Button type="submit" className="w-full">
          Add Book
        </Button>
      </form>
    </div>
  );
};

export default AddBookForm;