import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../actions/booksActions';
import BookList from '../components/BookList';



const BooksPage = () => {

    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);
    const loading = useSelector((state) => state.books.loading);
    const error = useSelector((state) => state.books.error);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
        <h1 className="title">Books Page</h1>
        < BookList books={books} />
    </div>
  );
};

export default BooksPage;
