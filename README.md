# Minimal Library Management System

## Overview

A minimal library management system built with **React**, **TypeScript**, and **RTK Query**. Users can view, add, edit, delete, and borrow books. No authentication or payments.

## Features

* **Book Management**: View all books, add new, edit, delete.
* **Borrow Books**: Borrow books with quantity and due date.
* **Borrow Summary**: View total borrowed books.
* **Responsive UI**: Clean, minimal, works on all devices.

## Pages

* `/books` – List all books
* `/create-book` – Add a new book
* `/books/:id` – View single book
* `/edit-book/:id` – Edit book
* `/borrow/:bookId` – Borrow book form
* `/borrow-summary` – Borrow summary

## Tech Stack

* **Frontend**: React, TypeScript, Tailwind CSS
* **State Management**: Redux Toolkit, RTK Query
* **Backend**: Node.js, Express.js, MongoDB, Mongoose

## Requirements

* CRUD operations for books and borrows
* API integration with RTK Query
* Typed API calls
* Proper error handling
* Backend supports pagination

## Optional Bonuses

* Optimistic updates
* Toast notifications
* Fully responsive
* Type-safe forms
