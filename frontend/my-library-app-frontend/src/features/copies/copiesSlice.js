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
            const response = await axios.get('http://localhost:5000/api/copies/');
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createCopy = createAsyncThunk(
    'copies/createCopy',
    async (copy) => {
       return  axios.post('http://localhost:5000/api/copies/', copy)
        .then((response) => {
            const newCopy= response.data
            return newCopy
    }
    )
}
)




// export const createCopy = createAsyncThunk(
//     'copies/createCopy',
//     async (copy, { rejectWithValue }) => {
//         try {
//             console.log(copy);
//             const response = await axios.post('http://localhost:5000/api/copies/', copy);
//             return response.data;
//         }
//         catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

export const editCopy = createAsyncThunk(
    'copies/editCopy',
    async (copy, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/copies/${copy._id}`, copy);
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
            const response = await axios.delete(`http://localhost:5000/api/copies/${copyId}`);
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
        builder.addCase(fetchCopies.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchCopies.fulfilled, (state, action) => {
            state.loading = false;
            state.copies = action.payload;
        })
        builder.addCase(fetchCopies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export default copiesSlice.reducer;

