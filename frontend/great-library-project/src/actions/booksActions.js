import axios from 'axios';

// ADD BOOK ACTIONS

export const fetchBooksRequest = () => {
  return { type: 'FETCH_BOOKS_REQUEST' };
};

export const fetchBooksSuccess = (books) => {
  return { type: 'FETCH_BOOKS_SUCCESS', payload: books };
};

export const fetchBooksFailure = (error) => {
  return { type: 'FETCH_BOOKS_FAILURE', payload: error };
};

export const fetchBooks = () => {
  return (dispatch) => {
    dispatch(fetchBooksRequest());
    axios
      .get('http://localhost:5000/api/books')
      .then((response) => {
        const books = response.data;
        dispatch(fetchBooksSuccess(books));
      })
      .catch((error) => {
        dispatch(fetchBooksFailure(error.message));
      });
  };
};

// EDIT BOOK ACTIONS

export const editBookSuccess = (book) => {
  return { type: 'EDIT_BOOK_SUCCESS', payload: book };
}

export const editBookRequest = () => {
  return { type: 'EDIT_BOOK_REQUEST' };
};

export const editBookFailure = (error) => {
  return { type: 'EDIT_BOOK_FAILURE', payload: error };
};

export const editBook = (bookId, updatedBookData) => {
  return (dispatch) => {
    dispatch(editBookRequest());
    axios
      .put(`http://localhost:5000/api/books/${bookId}`, updatedBookData)
      .then((response) => {
        const editedBook = response.data;
        dispatch(editBookSuccess(editedBook));
      })
      .catch((error) => {
        dispatch(editBookFailure(error.message));
      });
  };
};




// UPLOAD IMAGE ACTIONS


export const uploadImageRequest = () => {
  return { type: 'UPLOAD_IMAGE_REQUEST' };
};

export const uploadImageFailure = (error) => {
  return { type: 'UPLOAD_IMAGE_FAILURE', payload: error };
};

export const uploadImageSuccess = (fileURL) => {
  return { type: 'UPLOAD_IMAGE_SUCCESS', payload: fileURL };
};



export const uploadImage = (formData) => {
  return (dispatch) => {
    dispatch(uploadImageRequest());
    axios
      .post(`http://localhost:5000/api/books/upload`, formData)
      .then((response) => {
        console.log(response.data.fileURL)
        const fileURL = response.data.fileURL; // Assuming the response contains the file URL
        dispatch(uploadImageSuccess(fileURL));
      })
      .catch((error) => {
        dispatch(uploadImageFailure(error.message));
      });
  };
};


// Other book-related actions
