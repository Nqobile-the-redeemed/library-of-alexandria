import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { uploadImage } from './services/uploadImage';


const initialState = {
    loading: false,
    error: "",
    books:[],
    fileURL: ""
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






export const editBook = createAsyncThunk(
    'books/editBook',
    async (alphaOmegaHolder) => {
        console.log(alphaOmegaHolder);
       return axios.put(`http://localhost:5000/api/books/${alphaOmegaHolder.bookId}`, alphaOmegaHolder.bookData)
        .then((response) => {
            const bookHolder = response.data;
            console.log(bookHolder);
            return bookHolder
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
        // builder.addCase(uploadImage.pending, (state, action) => {
        //     state.loading = true
        // })
        // builder.addCase(uploadImage.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.fileURL = action.payload
        //     state.error = ""
        // })
        // builder.addCase(uploadImage.rejected, (state, action) => {
        //     state.loading = false
        //     state.fileURL = ""
        //     state.error = action.error.message
        // })
        builder.addCase(editBook.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(editBook.fulfilled, (state, action) => {
            state.loading = false
            const editedBook = action.payload; // Access the editedBook from action.payload
            // Update the corresponding book in the state.books array
            state.books = state.books.map((book) =>
                book._id === editedBook._id ? editedBook : book
            );
            state.error = ""
        })
        builder.addCase(editBook.rejected, (state, action) => {
            state.loading = false
            state.books = []
            state.error = action.error.message
        })
    }
})

export default booksSlice.reducer;
