import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import SplitText from "@/ui/SplitText";
import { useGetBookByIdQuery } from "@/redux/features/api/booksApi"; // single book fetch hook
import { useBorrowBookMutation } from "@/redux/features/api/borrowApi";

const BorrowBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch the single book by ID
  const { data, isLoading, isError } = useGetBookByIdQuery(id!);
  const book = data?.data;

  const [borrowBook] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load book data.");
      navigate("/", { replace: true });
    }
  }, [isError, navigate]);

  if (isLoading) {
    return <p className="text-center mt-10">Loading book details...</p>;
  }

  if (!book) {
    return null; // or some fallback UI
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity < 1 || quantity > book.copies) {
      toast.error(`You can borrow up to ${book.copies} copies.`);
      return;
    }

    if (!dueDate) {
      toast.error("Please select a due date.");
      return;
    }

    try {
      await borrowBook({
        data: {
          book: book._id, // matches backend expect 'book'
          quantity,
          dueDate,
        },
      }).unwrap();

      toast.success(`You borrowed ${quantity} copy(ies) of "${book.title}".`);

      navigate("/borrow-summary");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to borrow book.");
    }
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
        <p className="text-lg mb-4">
          Title: <span className="font-semibold">{book.title}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="mb-2" htmlFor="quantity">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              max={book.copies}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
            <p className="text-xs mt-2 text-muted-foreground">
              Available copies: {book.copies}
            </p>
          </div>

          <div>
            <Label className="mb-2" htmlFor="dueDate">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Confirm Borrow
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BorrowBookPage;
