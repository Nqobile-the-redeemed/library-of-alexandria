const initialState = {
    loading: false,
    books: [],
    error: '',
    fileURL: '' // Add the fileURL property to the initial state
  };


const booksReducers = (state = initialState, action) => {
  switch (action.type) {

    // Fetch books reducers
    
    case 'FETCH_BOOKS_REQUEST':
      return { ...state, loading: true };
    
    case 'FETCH_BOOKS_SUCCESS':
      return { ...state, loading: false, books: action.payload, error: '' };
    
    case 'FETCH_BOOKS_FAILURE':
      return { ...state, loading: false, books: [], error: action.payload };

    // Edit book reducers
    
    case 'EDIT_BOOK_REQUEST':
      return { ...state, loading: true };

    case 'EDIT_BOOK_SUCCESS':
      const editedBook = action.payload;
      const updatedBooks = state.books.map((book) =>
      book._id === editedBook._id ? editedBook : book
      );
      return { ...state, loading: false, books: updatedBooks };
    
    case 'EDIT_BOOK_FAILURE':
        return { ...state, error: action.payload, loading: false };

    // Upload image reducers

    case 'UPLOAD_IMAGE_REQUEST':
      return { ...state, loading: true };

    case 'UPLOAD_IMAGE_SUCCESS':
      return { ...state, loading: false, fileURL: action.payload, error: "" };

    case 'UPLOAD_IMAGE_FAILURE':
      return { ...state, error: action.payload, loading: false };
      


    default:
      return state;
  }
};
  
  export default booksReducers;
  