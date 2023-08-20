import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../transactionSlice';
import "../../../app.css"
import "../../../index.css"
import "react-datepicker/dist/react-datepicker.css";
import OrderDetailCard from './OrderDetailCard';
import NewUserForm from '../../users/components/NewUserForm';
import { Link } from 'react-router-dom';

const NewTransactionForm = ({ handleNewUserForm ,newUserFormState, setNewUserFormState ,handleDeleteBookEntry, user, userLoading, userError, books, loading, error, copies, copiesLoading, copiesError, transactionBooks, setTransactionBooks, transactionCopies, setTransactionCopies, transactionUser, setTransactionUser, transactionCheckoutDate, setTransactionCheckoutDate, transactionDueDate, setTransactionDueDate, transactionEmail, setTransactionEmail, transactionPhone, setTransactionPhone, newTransaction, transactionAddress, setTransactionAddress }) => {
  
  const handleCopyChange = (selectedCopyId) => {
    const selectedCopy = transactionCopies.find(copy => copy === selectedCopyId);
    

    // If the selected copy is not already in transactionCopies, add it
    if (!selectedCopy) {
      setTransactionCopies(prevCopies => [...prevCopies, selectedCopyId]);
      console.log(transactionCopies);
    }
  };

  const dispatch = useDispatch();

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
  const handleUserChange = (userId) => {
    setTransactionUser(userId); // Use userId, not user
    const selectedUser = user.find(u => u._id === userId);
    setUserDetails(selectedUser);
    console.log(transactionUser);
  };

  const handleCancelFormSubmission = () => {

    setTransactionBooks([]);
    setTransactionCopies([]);
    setTransactionUser(null);
    setTransactionCheckoutDate(new Date());
    setTransactionDueDate(null);
    setTransactionEmail(null);
    setTransactionPhone(null);
    setTransactionAddress(null);

  }

  const handleSubmitForm = () => {
    console.log(newTransaction);
    dispatch(addTransaction(newTransaction));
    handleCancelFormSubmission();
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
                    value={transactionUser || ''}
                    onChange={(e) => handleUserChange(e.target.value)}
                  >
                    <option value="" disabled>Select User</option>
                    {user && user.map(user => (
                      <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
                    ))}
                  </select>
                </div>
                <div className='selected-user-details'>
                  <div className='firstName'>{userDetails.firstName}</div>
                  <div className='middleName'>{userDetails.middleName}</div>
                  <div className='lastName'>{userDetails.lastName}</div>
                </div>
                <div className='selected-user-contact-details'>
                  <div className='email'>
                    <label htmlFor='email'>Email</label>
                    <input
                      id='email'
                      type='text'
                      value={userDetails.email || ''}
                      onChange={(e) => setTransactionEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor='phone'>Phone</label>
                    <input
                      id='phone'
                      type='text'
                      value={userDetails.phoneNumber || ''}
                      onChange={(e) => setTransactionPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor='address'>address</label>
                    <input
                      id='address'
                      type='text'
                      value={userDetails.address || ''}
                      onChange={(e) => setTransactionAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className = "checkout-details">
          <div className = 'DueDate'>
            <label htmlFor='DueDate'>Due Date</label>
            <DatePicker
              showIcon
              id='DueDate'
              selected={transactionDueDate}
              onChange={(date) => setTransactionDueDate(date)}
              dateFormat='dd/MM/yyyy'
              minDate={new Date()}
              isClearable
              placeholderText='Select Due Date'
            />
          </div>
          <div className = 'CheckoutDate'>
            <label htmlFor='CheckoutDate'>Checkout Date</label>
            <DatePicker
              showIcon
              id='CheckoutDate'
              selected={transactionCheckoutDate}
              onChange={(date) => setTransactionCheckoutDate(date)}
              dateFormat='dd/MM/yyyy'
              maxDate={new Date()}
              isClearable
              placeholderText='Select Checkout Date'
            />
          </div>
        </div>
        <div className="buttons">
          <Link to="/">
            <button
              className="cancel-button"
              onClick={handleCancelFormSubmission}
            >
              Cancel
            </button>
          </Link>
          <Link to="/">
            <button
              className="submit-button"
              onClick={handleSubmitForm}
            >
              Submit
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewTransactionForm