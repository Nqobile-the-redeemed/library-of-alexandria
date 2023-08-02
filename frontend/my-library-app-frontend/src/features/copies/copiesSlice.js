import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    loading: false,
    error: "",
    copies:[],
}

export const fetchCopiesByBookName = createAsyncThunk(
    'copies/fetchCopiesByBookName',
    async (bookName) => {
         return axios.get(`http://localhost:5000/api/copies/book/${bookName}`)
        .then((response) => {
            const copies= response.data
            return copies
        })
    }
)


const copiesSlice = createSlice({
    name: 'copies',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(fetchCopiesByBookName.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchCopiesByBookName.fulfilled, (state, action) => {
            state.loading = false
            state.copies = action.payload
            state.error = ""
        })
        builder.addCase(fetchCopiesByBookName.rejected, (state, action) => {
            state.loading = false
            state.copies = []
            state.error = action.error.message
        })
    }
})

export default copiesSlice.reducer;

