import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../actions/booksActions';
import BookList from '../components/BookList';
import BookDetails from '../components/BookDetails';



const BooksPage = () => {

  const [selectedBookId, setSelectedBookId] = useState(null);

  const onSelectBook = (bookId) => {
    setSelectedBookId(bookId);
  };

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
    <div className="books-page">
        <h1 className="title">Books Page</h1>
        < BookList books={books} selectedBookId={selectedBookId} onSelectBook={onSelectBook}/>
        {selectedBookId && (
        <BookDetails book={books.find((book) => book._id === selectedBookId)} 
        onSaveSuccess={() => setSelectedBookId(null)} // Add a callback to reset selectedBookId
         />
      )}
    </div>
  );
};

export default BooksPage;
