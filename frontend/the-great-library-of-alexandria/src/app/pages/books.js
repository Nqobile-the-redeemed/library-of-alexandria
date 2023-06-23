import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SideMenu = () => {



    return (
        <div className="side-menu">
            <h2>Books</h2>
            <ul>
                {books.map((book) => (
                <li key={book.id} onClick={() => onSelectBook(book)}>
                    {book.title}
                </li>
                ))}
            </ul>
        </div>
    );
};

const BookDetails = () => {
    if (!book) {
        return <div>No book selected</div>;
      }
    
      return (
        <div className="book-details">
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Description: {book.description}</p>
          {/* Display other book details */}
        </div>
      );
};

const BookPage = () => {

    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/books').then((response) => {
            setBooks(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
        ;
    });

    const handleBookSelection = (book) => {
        setSelectedBook(book);
      };

    return (
        <div>
        <h1>Library</h1>
        <div className="container">
          <SideMenu books={books} onSelectBook={handleBookSelection} />
          <BookDetails book={selectedBook} />
        </div>
      </div>
    );
  };


export default BookPage;