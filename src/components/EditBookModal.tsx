"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Book } from "@/ui/BookTable";
import SplitText from "@/ui/SplitText";

// Example books list — replace with API or context if needed
const books: Book[] = [
  {
    _id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    isbn: "9780743273565",
    copies: 3,
  },
  {
    _id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    isbn: "9780451524935",
    copies: 0,
  },
  {
    _id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Historical",
    isbn: "9780061120084",
    copies: 5,
  },
  {
    _id: "4",
    title: "Omniscient Reader's Viewpoint",
    author: "Sing Shong",
    genre: "Web Novel, Fantasy",
    isbn: "9781648965239",
    copies: 4,
  },
  {
    _id: "5",
    title: "Death Note (Vol. 1)",
    author: "Tsugumi Ohba",
    genre: "Manga, Thriller",
    isbn: "9781421501686",
    copies: 0,
  },
  {
    _id: "6",
    title: "Tokyo Ghoul (Vol. 1)",
    author: "Sui Ishida",
    genre: "Manga, Horror",
    isbn: "9781421599575",
    copies: 3,
  },
  {
    _id: "7",
    title: "Monster",
    author: "Naoki Urasawa",
    genre: "Manga, Psychological Thriller",
    isbn: "9781421529199",
    copies: 1,
  },
  {
    _id: "8",
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    genre: "Psychology, Non-fiction",
    isbn: "9780140280197",
    copies: 6,
  },
  {
    _id: "9",
    title: "Berserk (Vol. 1)",
    author: "Kentaro Miura",
    genre: "Manga, Dark Fantasy",
    isbn: "9781591168918",
    copies: 2,
  },
  {
    _id: "10",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Psychological Thriller",
    isbn: "9781250301697",
    copies: 0,
  },
  {
    _id: "11",
    title: "Goodnight Punpun",
    author: "Inio Asano",
    genre: "Manga, Psychological",
    isbn: "9781596434025",
    copies: 1,
  },
  {
    _id: "12",
    title: "Killing Stalking (Vol. 1)",
    author: "Koogi",
    genre: "Manhwa, Psychological Thriller",
    isbn: "9781626927318",
    copies: 3,
  },
  {
    _id: "13",
    title: "Parasyte (Vol. 1)",
    author: "Hitoshi Iwaaki",
    genre: "Manga, Sci-Fi Horror",
    isbn: "9781421520241",
    copies: 0,
  },
  {
    _id: "14",
    title: "Legend of the Sun Knight",
    author: "Yu Wo",
    genre: "Light Novel, Fantasy",
    isbn: "9781948286798",
    copies: 5,
  },
  {
    _id: "15",
    title: "Chainsaw Man (Vol. 1)",
    author: "Tatsuki Fujimoto",
    genre: "Manga, Dark Fantasy",
    isbn: "9781974709034",
    copies: 4,
  },
  {
    _id: "16",
    title: "Noragami (Vol. 1)",
    author: "Adachitoka",
    genre: "Manga, Supernatural",
    isbn: "9780316209840",
    copies: 0,
  },
  {
    _id: "17",
    title: "Death Parade: End of the World",
    author: "Yuzuki N",
    genre: "Light Novel, Psychological",
    isbn: "9784049129321",
    copies: 2,
  },
  {
    _id: "18",
    title: "Solanin",
    author: "Inio Asano",
    genre: "Manga, Slice of Life",
    isbn: "9781934287256",
    copies: 2,
  },
  {
    _id: "19",
    title: "The Book Thief",
    author: "Markus Zusak",
    genre: "Historical Fiction",
    isbn: "9780375842207",
    copies: 4,
  },
  {
    _id: "20",
    title: "Made in Abyss (Vol. 1)",
    author: "Akihito Tsukushi",
    genre: "Manga, Fantasy",
    isbn: "9781974709393",
    copies: 3,
  },
];

const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    copies: 0,
  });

  useEffect(() => {
    const foundBook = books.find((b) => b._id === id);
    if (foundBook) {
      setFormData({
        title: foundBook.title,
        author: foundBook.author,
        genre: foundBook.genre,
        isbn: foundBook.isbn,
        copies: foundBook.copies,
      });
    } else {
      // If not found, redirect or show error
      navigate("/");
    }
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Submit your update via API
    console.log("Updated Book:", formData);

    // Redirect or show success
    navigate("/");
  };

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

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

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditBookPage;
