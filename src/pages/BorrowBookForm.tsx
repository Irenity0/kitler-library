import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Book } from "@/ui/BookTable";
import toast from "react-hot-toast";
import SplitText from "@/ui/SplitText";

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

const BorrowBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const book = books.find((b) => b._id === id);

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

    const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  useEffect(() => {
    if (!book) {
      toast("Book not found :/");
      navigate("/", { replace: true });
    }
  }, [book, navigate]);

  if (!book) {
    return null; // Or a skeleton/placeholder
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity < 1 || quantity > book.copies) {
      toast(`You can borrow up to ${book.copies} copies.`);
      return;
    }

    if (!dueDate) {
      toast("Please select a due date.");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update copies logic: In real app, send to backend
    if (quantity >= book.copies) {
      book.copies = 0;
    } else {
      book.copies -= quantity;
    }

    toast(`You borrowed ${quantity} copy(ies) of "${book.title}".`);

    navigate("/borrow-summary");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div>
        <SplitText
          text="Borrow Book"
          className="text-3xl my-10 text-center font-bold"
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
      <div className="max-w-md w-full p-6 border border-border rounded-lg shadow bg-background">
        <h1 className="text-2xl font-bold mb-2">Borrow Book</h1>
        <p className="text-lg mb-4">Title: <span className="font-semibold">{book.title}</span></p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="mb-2" htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              max={book.copies}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
            <p className="text-xs mt-2 text-muted-foreground">Available copies: {book.copies}</p>
          </div>

          <div>
            <Label className="mb-2" htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">Confirm Borrow</Button>
        </form>
      </div>
    </div>
  );
};

export default BorrowBookPage;