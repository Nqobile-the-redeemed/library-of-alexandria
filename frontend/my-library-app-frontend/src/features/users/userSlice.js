import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: "",
    users: []
}

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {

        try{
            const response = await axios.get('http://localhost:5000/api/users/');
            return response.data;
        } 
        catch(error) {
            return rejectWithValue(error.response.data);
        }
    }
)


export const createUser = createAsyncThunk(
    'users/createUser',
    async (user, { rejectWithValue }) => {

        try{
            const response = await axios.post('http://localhost:5000/api/users/', user);
            return response.data;
        } 
        catch(error) {
            return rejectWithValue(error.response.data);
        }
    }
)


const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(createUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})


export default usersSlice.reducer;
       