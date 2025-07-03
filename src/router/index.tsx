import RootLayout from "@/layouts/RootLayout";
import HomePage from "@/pages/HomePage";
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
        element: <p>Books List</p>,
      },
      {
        path: "create-book",
        element: <p>Create Book Form</p>,
      },
      {
        path: "books/:id",
        element: <p>Book Details</p>,
      },
      {
        path: "edit-book/:id",
        element: <p>Edit Book</p>,
      },
      {
        path: "borrow/:bookId",
        element: <p>Borrow Book Form</p>,
      },
      {
        path: "borrow-summary",
        element: <p>Borrow Summary</p>,
      },
      {
        path: "events",
        element: <p>Events List</p>,
      },
      {
        path: "add-event",
        element: <p>Add Event Form</p>,
      },
      {
        path: "my-events",
        element: <p>My Events</p>,
      },
    ],
  },
]);

export default router;