import axios from "axios";
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const uploadImage = createAsyncThunk(
//     'books/uploadImage',
//     async (formData) => {
//        return axios.post(`http://localhost:5000/api/books/upload`, formData)
//         .then((response) => {
//             const fileURL = response.data.fileURL; // Assuming the response contains the file URL
//             return fileURL
//         })
//         .catch((error) => {
//             console.errorr(error);
//         });
//     }
// )



export const uploadImage = (formData) => {
    return axios
        .post(`http://localhost:5000/api/books/upload`, formData)
        .then((response) => {
        const fileURL = response.data.fileURL; // Assuming the response contains the file URL
        console.log(fileURL);
        return fileURL;
        })
        .catch((error) => {
        console.errorr(error);
        });
  };
