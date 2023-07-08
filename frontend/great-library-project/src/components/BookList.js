import React from 'react';

function BookList({ books, selectedBookId, onSelectBook  }) {
  
  const handleSelectBook = (bookId) => {
    onSelectBook(bookId);
  };

    return (
      <div className="book-list">
      {books.map((book) => (
        <button
          key={book._id}
          className={`book-tab ${selectedBookId === book._id ? 'active' : ''}`}
          onClick={() => handleSelectBook(book._id)}
        >
          <img src={book.bookCover} alt={book.title} />
          <h3>{book.title}</h3>
        </button>
      ))}
    </div>
      );

}

export default BookList;
