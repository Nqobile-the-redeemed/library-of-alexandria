import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../transactionSlice';
import "../../../app.css"
import OrderDetailCard from './OrderDetailCard';

const NewTransactionForm = ({ handleDeleteBookEntry, user, userLoading, userError, books, loading, error, copies, copiesLoading, copiesError, transactionBooks, setTransactionBooks, transactionCopies, setTransactionCopies, transactionUser, setTransactionUser, transactionCheckoutDate, setTransactionCheckoutDate, transactionDueDate, setTransactionDueDate, transactionEmail, setTransactionEmail, transactionPhone, setTransactionPhone, newTransaction }) => {
  
  const handleCopyChange = (selectedCopyId) => {
    const selectedCopy = transactionCopies.find(copy => copy === selectedCopyId);

    // If the selected copy is not already in transactionCopies, add it
    if (!selectedCopy) {
      setTransactionCopies(prevCopies => [...prevCopies, selectedCopyId]);
      console.log(transactionCopies);
    }
  };

  const handleRemoveCopy = (copyId) => {
    setTransactionCopies(prevCopies => prevCopies.filter(copy => copy !== copyId));
    console.log(transactionCopies);
  };

  // Retrieve the details of selected books based on their IDs
  const selectedBookDetails = transactionBooks.map(bookId =>
    books.find(book => book._id === bookId)
  );


  return (
    <div>NewTransactionForm
      
      <div>
        <div className='order-details-section'>
          <h4  className='order-details-header'>Order Details</h4>
          <div className='order-details'>
          {selectedBookDetails.map(book => (
            <OrderDetailCard
              key={book._id}
              book={book}
              availableCopies={book.copies.filter(copy => copy.availability === 'Available')}
              selectedCopies={transactionCopies}
              handleCopyChange={handleCopyChange}
              handleRemoveCopy={handleRemoveCopy}
              handleDeleteBookEntry={handleDeleteBookEntry}
              copies={copies}
            />
          ))}
          </div>
        </div>
        
        <div className = "user-details">
          <div className = "user-details-header">
            <h4>User Details</h4>
            <button 
              className = "user-details-button"
            >Create New User</button>
          </div>
          
        </div>
        <div className = "checkout-details">

        </div>
      </div>
    </div>
  )
}

export default NewTransactionForm