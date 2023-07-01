
  const initialState = {
    loading: false,
    logs: [],
    error: '',
  };


const logsReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LOGS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_LOGS_SUCCESS':
      return { ...state, loading: false, logs: action.payload, error: '' };
    case 'FETCH_LOGS_FAILURE':
      return { ...state, loading: false, logs: [], error: action.payload };
    default:
      return state;
  }
};
  
  export default logsReducers;