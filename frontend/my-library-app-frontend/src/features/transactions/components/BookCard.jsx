import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'; 

const BookCard = ({book, handleBookSelection}) => {

    const addToCart = () => {
        handleBookSelection(book);
    };

  return (
    <div>
        <img src={book.bookCover} alt={book.title} />
        <h3>{book.title}</h3>
        <button onClick={addToCart} >add to cart</button>
    </div>
  )
}

export default BookCard