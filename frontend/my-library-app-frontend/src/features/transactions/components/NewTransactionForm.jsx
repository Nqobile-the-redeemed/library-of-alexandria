import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../transactionSlice';
import "../../../app.css"
import OrderDetailCard from './OrderDetailCard';
import NewUserForm from '../../users/components/NewUserForm';

const NewTransactionForm = ({ handleNewUserForm ,newUserFormState, setNewUserFormState ,handleDeleteBookEntry, user, userLoading, userError, books, loading, error, copies, copiesLoading, copiesError, transactionBooks, setTransactionBooks, transactionCopies, setTransactionCopies, transactionUser, setTransactionUser, transactionCheckoutDate, setTransactionCheckoutDate, transactionDueDate, setTransactionDueDate, transactionEmail, setTransactionEmail, transactionPhone, setTransactionPhone, newTransaction }) => {
  
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

  // Temporary variable to hold the users full details
  const [userDetails, setUserDetails] = useState({});

  // Handle a change in the value of the selected user
  const handleUserChange = (user) => {
    setTransactionUser(user._id);
    setUserDetails(user);
    console.log(transactionUser);
  };



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
              onClick = {handleNewUserForm}
            >Create New User</button>
            <div className = "new-user-details-form">
              <NewUserForm 
                newUserFormState = {newUserFormState}
                setNewUserFormState = {setNewUserFormState}
                user = {user}
                userLoading = {userLoading}
                userError = {userError}
                handleNewUserForm={handleNewUserForm}
              />
              <div>
                <div>
                  <label htmlFor="UserSelection">Select User</label>
                  <select
                    id="UserSelection"
                    value=""
                    onChange={(e) => handleUserChange(e.target.value)}
                  >
                    <option value="" disabled>Select User</option>
                    {user.map(user => (
                      <option key={user._id} value={user._id}>{user.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className = "checkout-details">

        </div>
      </div>
    </div>
  )
}

export default NewTransactionForm