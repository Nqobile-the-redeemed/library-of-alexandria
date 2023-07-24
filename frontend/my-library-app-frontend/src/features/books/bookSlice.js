import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
    loading: false,
    error: "",
    books:[],
}



export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
       return axios.get('http://localhost:5000/api/books')
        .then((response) => {
            const books= response.data
            return books
        })
    }
)


export const uploadImage = createAsyncThunk(
    'books/uploadImage',
    async (formData) => {
       return axios.post(`http://localhost:5000/api/books/upload`, formData)
        .then((response) => {
            const fileURL = response.data.fileURL; // Assuming the response contains the file URL
            return fileURL
        })
    }
)





const booksSlice = createSlice({
    name: 'books',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(fetchBooks.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.loading = false
            state.books = action.payload
            state.error = ""
        })
        builder.addCase(fetchBooks.rejected, (state, action) => {
            state.loading = false
            state.books = []
            state.error = action.error.message
        })
        builder.addCase(fetchBooks.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.loading = false
            state.books = action.payload
            state.error = ""
        })
        builder.addCase(fetchBooks.rejected, (state, action) => {
            state.loading = false
            state.books = []
            state.error = action.error.message
        })
    }
})

export default booksSlice.reducer;


case 'UPLOAD_IMAGE_REQUEST':
    return { ...state, loading: true };

  case 'UPLOAD_IMAGE_SUCCESS':
    return { ...state, loading: false, fileURL: action.payload, error: "" };

  case 'UPLOAD_IMAGE_FAILURE':
    return { ...state, error: action.payload, loading: false };