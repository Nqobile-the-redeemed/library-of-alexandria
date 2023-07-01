import React from 'react';

function BookList({ books, selectedBookId, onSelectBook  }) {
  
    return (
        <div>
          {books.map(book => (
            <div key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>  
          ))}
        </div>
      );

}

export default BookList;
