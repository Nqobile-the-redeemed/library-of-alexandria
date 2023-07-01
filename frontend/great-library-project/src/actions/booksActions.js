import axios from 'axios';

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
// Other book-related actions
