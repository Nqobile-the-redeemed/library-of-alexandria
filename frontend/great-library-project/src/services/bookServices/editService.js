import axios from "axios";

export const editBook = (bookId, updatedBookData) => {
    return axios
        .put(`http://localhost:5000/api/books/${bookId}`, updatedBookData)
        .then((response) => {
            const editedBook = response.data; // Assuming the response contains the file URL
            console.log(editedBook);
            dispatch(editBookSuccess(editedBook));
            return editedBook;
        })
        .catch((error) => {
        console.errorr(error);
        dispatch(editBookFailure(error.message));
        });
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
  