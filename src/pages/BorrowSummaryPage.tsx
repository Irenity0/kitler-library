import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import SplitText from "@/ui/SplitText";
import { useGetBorrowSummaryQuery } from "@/redux/features/api/borrowApi";

const BorrowSummaryPage = () => {
  const { data, error, isLoading } = useGetBorrowSummaryQuery();

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  if (isLoading) return <p className="text-center">Loading borrowed books...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load borrowed books.</p>;

  const borrowedBooks = data?.data ?? [];  // <-- data.data contains the array


  return (
    <div className="mx-auto p-6">
      <div className="flex items-center justify-center mt-6 mb-10">
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
                <th className="px-5 py-1 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {borrowedBooks.map((item, index) => (
                <tr key={index} className="hover:bg-muted/40">
                  <td className="px-2 py-1">{item.book.title}</td>
                  <td className="px-2 py-1">{item.totalQuantity}</td>
                  <td className="px-2 py-1">
                    <Button variant="link" size="sm">
                      <Link to={`/books/${item.book.isbn}`}>Details</Link>
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