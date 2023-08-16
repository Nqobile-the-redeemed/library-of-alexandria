import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../transactionSlice';
import "../../../app.css"

const NewTransactionForm = ({ user, userLoading, userError, book, copies, transactionModalState, setTransactionModalState }) => {

  


  if (!transactionModalState) return null;

  return (
    <div>NewTransactionForm
      <button onClick={() => setTransactionModalState(false)}>Close</button>
      <div>
        <div className='book-selection-section'>

        </div>
        <div className = "transaction form">
          
        </div>
      </div>
    </div>
  )
}

export default NewTransactionForm