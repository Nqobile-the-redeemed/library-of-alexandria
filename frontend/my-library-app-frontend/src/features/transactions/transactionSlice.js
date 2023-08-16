import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    transactions: [],
    loading: 'false',
    error: ""
};


export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async () => {

        try{
            const response = await axios.get('http://localhost:5000/api/bookLog/');
            return response.data;
        }
        catch(error){
            console.log(error);
        }
        
    }
);

export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (transaction) => {

        try{
            const response = await axios.post('http://localhost:5000/api/bookLog/', transaction);
            return response.data;
        }
        catch(error){
            console.log(error);
        }
        
    }
);

export const deleteTransaction = createAsyncThunk(
    'transactions/deleteTransaction',
    async (id) => {

        try{
            const response = await axios.delete(`http://localhost:5000/api/bookLog/${id}`);
            return response.data;
        }
        catch(error){
            console.log(error);
        }
        
    }
);


export const editTransaction = createAsyncThunk(
    'transactions/editTransaction',
    async (transaction) => {
            
            try{
                const response = await axios.put(`http://localhost:5000/api/bookLog/${transaction.id}`, transaction);
                return response.data;
            }
            catch(error){
                console.log(error);
            }
            
        }
);

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchTransactions.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchTransactions.fulfilled, (state, action) => {
            state.transactions = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchTransactions.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        builder.addCase(addTransaction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addTransaction.fulfilled, (state, action) => {
            state.transactions.push(action.payload);
            state.loading = false;
        });
        builder.addCase(addTransaction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        builder.addCase(deleteTransaction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteTransaction.fulfilled, (state, action) => {
            state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
            state.loading = false;
        });
        builder.addCase(deleteTransaction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        builder.addCase(editTransaction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(editTransaction.fulfilled, (state, action) => {
            state.transactions = state.transactions.map(transaction => transaction.id === action.payload.id ? action.payload : transaction);
            state.loading = false;
        });
        builder.addCase(editTransaction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export default transactionsSlice.reducer;