import EditBookModal from "@/components/EditBookModal";
import RootLayout from "@/layouts/RootLayout";
import BorrowBookPage from "@/pages/BorrowBookForm";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";
import CreateBookPage from "@/pages/CreateBookPage";
import DetailsPage from "@/pages/DetailsPage";
import HomePage from "@/pages/HomePage";
import BookTable from "@/ui/BookTable";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "ping",
        element: <p>pong</p>,
      },
      {
        path: "books",
        element: <BookTable/>,
      },
      {
        path: "create-book",
        element: <CreateBookPage/>,
      },
      {
        path: "books/:id",
        element: <DetailsPage/>,
      },
      {
        path: "edit-book/:id",
        element: <EditBookModal/>,
      },
      {
        path: "borrow/:id",
        element: <BorrowBookPage/>,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummaryPage/>,
      }
    ],
  },
]);

export default router;