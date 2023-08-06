import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    loading: false,
    error: "",
    copies:[],
}


export const fetchCopies = createAsyncThunk(
    'copies/fetchCopies',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/copies');
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const createCopy = createAsyncThunk(
    'copies/createCopy',
    async (copy, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/copies', copy);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editCopy = createAsyncThunk(
    'copies/editCopy',
    async (copy, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/copies/${copy._id}`, copy);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCopy = createAsyncThunk(
    'copies/deleteCopy',
    async (copyId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/copies/${copyId}`);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);




const copiesSlice = createSlice({
    name: 'copies',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(createCopy.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(createCopy.fulfilled, (state, action) => {
            state.loading = false;
            state.copies.push(action.payload);
        })
        builder.addCase(createCopy.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(editCopy.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(editCopy.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.copies.findIndex(copy => copy._id === action.payload._id);
            state.copies[index] = action.payload;
        })
        builder.addCase(editCopy.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(deleteCopy.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(deleteCopy.fulfilled, (state, action) => {
            state.loading = false;
            state.copies = state.copies.filter(copy => copy._id !== action.payload._id);
        })
        builder.addCase(deleteCopy.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export default copiesSlice.reducer;

