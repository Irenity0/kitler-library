import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import type { Book } from "@/ui/BookTable";
import { Button } from "@/components/ui/button";

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

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const book = books.find((b) => b._id === id);

  useEffect(() => {
    if (!book) {
      const timeout = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [book, navigate]);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-neutral-300 p-4">
        <p className="text-xl font-semibold mb-2">Book not found 😕</p>
        <p className="text-neutral-400">Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
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
        <p
          className={`mb-4 font-semibold ${
            book.copies > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {book.copies > 0
            ? `Available copies: ${book.copies}`
            : "Currently unavailable"}
        </p>

        <Button
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>
      </div>
    </div>
  );
};

export default DetailsPage;