import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import EditTransactionForm  from './EditTransactionForm';
import { deleteTransaction, editTransaction } from '../transactionSlice';
import { set } from 'mongoose';

const TransactionTableRow = ({ transactions }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [isOverdue, setIsOverdue] = useState(false);

  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    // Show a confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this copy?');
    if (confirmed) {
      dispatch(deleteTransaction(transactions.id));
    }
  };
  
  const onEditTransaction = (editedTransaction) => {
      dispatch(editTransaction(editedTransaction));
  };

  // Calculate whether the transaction is overdue
  const currentDate = new Date();
  const dueDate = new Date(transactions.dueDate);

  if (currentDate > dueDate) {
    setIsOverdue(true);
  }





  return (
    
    <tr>
    {isEditing ? (
      <td colSpan="10">
        <EditTransactionForm
          initialValues={transactions}
          onSubmit={(editedTransaction) => {
            setIsEditing(false);
            onEditTransaction(editedTransaction);
          }}
        />
      </td>
    ) : (
      <>
        <td>
            {isOverdue ? (
              <div className="circle red"></div>
            ) : (
              <div className="circle green"></div>
            )}
        </td>
        <td>{transactions.users.firstName} {transactions.users.LastName}</td>
        <td>{transactions.books.map((book, index) => (
          <div className='item-tag'>
            {book.title}
          </div>) )}</td>
        <td>{transactions.copies.map((book, index) => (
          <div className='item-tag'>
            {copies.issueID}
          </div>
        ))}</td>
        <td>{transactions.checkoutDate}</td>
        <td>{transactions.returnDate}</td>
        <td>{transactions.email}</td>
        <td>{transactions.phoneNumber}</td>
        <td>{transactions.address}</td>
        <td>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
          <button onClick={handleReturnClick}>Return</button>
        </td>
      </>
    )}
  </tr>

  )
}

export default TransactionTableRow