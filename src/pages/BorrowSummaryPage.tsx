import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import SplitText from "@/ui/SplitText";

interface BorrowedBook {
  id: string;
  title: string;
  quantity: number;
  dueDate: string; // ISO date string
}

// Example data — replace with real source
const borrowedBooks: BorrowedBook[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    quantity: 1,
    dueDate: "2025-07-30",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    quantity: 2,
    dueDate: "2025-08-05",
  },
];

const BorrowSummaryPage = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div className="mx-auto p-6">
      <div className="flex items-center justify-center my-10">
        <SplitText
          text="Borrowed Books Summary"
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

      {borrowedBooks.length === 0 ? (
        <p className="text-muted-foreground">
          You haven’t borrowed any books yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-2 py-1 text-left">Title</th>
                <th className="px-2 py-1 text-left">Quantity</th>
                <th className="px-2 py-1 text-left">Due Date</th>
                <th className="px-5 py-1 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {borrowedBooks.map((book) => (
                <tr key={book.id} className="hover:bg-muted/40">
                  <td className="px-2 py-1">{book.title}</td>
                  <td className="px-2 py-1">{book.quantity}</td>
                  <td className="px-2 py-1">
                    {new Date(book.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-1">
                    <Button variant="link" size="sm">
                      <Link to={`/books/${book.id}`}>Details</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BorrowSummaryPage;
