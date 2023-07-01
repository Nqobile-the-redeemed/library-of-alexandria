  const initialState = {
    loading: false,
    copies: [],
    error: '',
  };


const copiesReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COPIES_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_COPIES_SUCCESS':
      return { ...state, loading: false, copies: action.payload, error: '' };
    case 'FETCH_COPIES_FAILURE':
      return { ...state, loading: false, copies: [], error: action.payload };
    default:
      return state;
  }
};
  
  export default copiesReducers;
  
  