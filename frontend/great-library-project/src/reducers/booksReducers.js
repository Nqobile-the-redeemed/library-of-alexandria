const initialState = {
    loading: false,
    books: [],
    error: '',
  };


const booksReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_BOOKS_SUCCESS':
      return { ...state, loading: false, books: action.payload, error: '' };
    case 'FETCH_BOOKS_FAILURE':
      return { ...state, loading: false, books: [], error: action.payload };
    default:
      return state;
  }
};
  
  export default booksReducers;
  