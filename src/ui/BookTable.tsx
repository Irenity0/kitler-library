import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import SplitText from "./SplitText";
import AddBookModal from "@/components/ui/AddBookModal";
import toast from "react-hot-toast";

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

  const loading = false;
  const isError = false;

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDelete = (bookId: string) => {
  toast.success("Book deleted successfully!");
  // TODO: Here you can add logic to actually remove it from your state or DB
};


  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
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

        {loading ? (
          <p className="text-sm text-center text-muted-foreground">
            Loading books...
          </p>
        ) : isError ? (
          <p className="text-sm text-red-500 text-center">
            ⚠️ Failed to load books. Please try again later.
          </p>
        ) : books.length === 0 ? (
          <p className="text-center text-muted-foreground">
            You haven’t added any books yet {">.<"}
          </p>
        ) : (
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
                    <tr
                      key={book._id}
                      className="hover:bg-muted/60 transition-colors"
                    >
                      <td className="px-2 py-2">
                        <Link to={`/books/${book._id}`} className="underline">
                          {book.title}
                        </Link>
                      </td>
                      <td className="px-2 py-2">{book.author}</td>
                      <td className="px-2 py-2">{book.genre}</td>
                      <td className="px-2 py-2">{book.isbn}</td>
                      <td className="px-2 py-2">{book.copies}</td>
                      <td className="px-2 py-2">
                        <span
                          className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                            isAvailable
                              ? "text-blue-400 bg-blue-400/10"
                              : "text-purple-400 bg-purple-600/10"
                          }`}
                        >
                          {isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="px-2 py-2 flex gap-1">
                        <Button size="sm"><Link to={`/edit-book/${book._id}`}>Edit</Link></Button>
                        <Button onClick={() => handleDelete(book._id)} variant="destructive" size="sm">
                          Delete
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className={
                            isAvailable
                              ? "pt-1.5"
                              : "bg-muted text-muted-foreground cursor-not-allowed"
                          }
                          disabled={!isAvailable}
                        >
                          <Link
                            to={`/borrow/${book._id}`}
                            className="w-full h-full"
                          >
                            Borrow
                          </Link>
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
        )}
      </div>

      {/* Add Book Modal */}
      <AddBookModal open={open} onOpenChange={setOpen} />
    </>
  );
};

export default BookTable;
