import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import DropDownSelector from '../../navigation/components/DropDownSelector';

const OrderDetailCard = ({ book, copies, transactionCopy, setTransactionCopy, handleDeleteBookEntry, availableCopies, selectedCopies, handleCopyChange, handleRemoveCopy }) => {
  return (
    <div>
      <img src={book.bookCover} alt={book.title} />
      <p className='book-title'>{book.title}</p>
      <p className='book-author'>{book.author}</p>
      <p className='book-isbn'>{book.ssid}</p>
      <p className='book-description'>{book.description}</p>
      <DropDownSelector copies={copies} book={book} handleCopyChange={handleCopyChange} availableCopies={availableCopies} selectedCopies={selectedCopies} handleRemoveCopy={handleRemoveCopy} />
      <button className='delete-book-entry' onClick={() => handleDeleteBookEntry(book._id)}>Delete</button>
    </div>
  )
}

export default OrderDetailCard 