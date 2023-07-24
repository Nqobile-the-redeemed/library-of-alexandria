import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BookListSection } from '../components/bookListSection'
import { BookDetails } from '../components/bookDetails'
import { fetchBooks } from '../bookSlice';



export const BookPage = () => {



  //The variouse states of the book page
  const [selectedBookId, setSelectedBookId] = useState(null);


  //Variouse imports  
  const dispatch = useDispatch();


  // IMPORTING THE STATE FROM THE STORE
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);



  //Function to update the selected book id state
  const onSelectBook = (bookId) => {
    setSelectedBookId(bookId);
  };


  //FUNCTION TO FETCH DATA ON LOAD FROM THE BACKEND
  useEffect(() => {
    dispatch(fetchBooks());
  }, []);


  //Booklist related handleclicks
  const handleSelectBook = (bookId) => {
    onSelectBook(bookId);
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
        <BookListSection 
          books={books} 
          selectedBookId={selectedBookId} 
          onSelectBook={onSelectBook}
          handleSelectBook={handleSelectBook}
          />
        {selectedBookId && (
          <BookDetails 
            book={books.find((book) => book._id === selectedBookId)} 
            onSaveSuccess={() => setSelectedBookId(null)} // Add a callback to reset selectedBookId
          />
        )}
    </div>
  )
}
