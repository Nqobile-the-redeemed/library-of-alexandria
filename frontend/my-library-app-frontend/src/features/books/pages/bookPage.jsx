import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCopies } from '../../copies/copiesSlice'; // Import fetchCopies from copiesSlice
import { BookListSection } from '../components/bookListSection'
import { BookDetails } from '../components/bookDetails'
import { fetchBooks } from '../bookSlice';



export const BookPage = () => {



  //The variouse states of the book page
  const [selectedBookId, setSelectedBookId] = useState(null);


  //Variouse imports  
  const dispatch = useDispatch();


  // IMPORTING THE Book STATE FROM THE STORE
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  //Importing the copies state from the store
  const copies = useSelector((state) => state.copies.copies);
  const copiesLoading = useSelector((state) => state.copies.loading);
  const copiesError = useSelector((state) => state.copies.error);

  //Importing the transactions state from the store
  const transactions = useSelector((state) => state.transactions.transactions);
  const transactionsLoading = useSelector((state) => state.transactions.loading);
  const transactionsError = useSelector((state) => state.transactions.error);



  //Function to update the selected book id state
  const onSelectBook = (bookId) => {
    setSelectedBookId(bookId);
  };


  //FUNCTION TO FETCH DATA ON LOAD FROM THE BACKEND
  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchCopies()); // Fetch copies when the component mounts
  }, []);


  //Booklist related handleclicks
  const handleSelectBook = (bookId) => {
    onSelectBook(bookId);
  };

  console.log(copies);


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
            copies={copies.filter((copy) => copy.book._id === selectedBookId)} // Pass filtered copies to BookDetails
            copiesLoading={copiesLoading}
            copiesError={copiesError}
            transactions={transactions.filter((transaction) => transaction.book._id === selectedBookId)}
            transactionsLoading={transactionsLoading}
            transactionsError={transactionsError}
          />
        )}
    </div>
  )
}
