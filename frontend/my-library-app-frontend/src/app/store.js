import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import bookReducer from '../features/books/bookSlice';
import copyReducer from '../features/copies/copiesSlice';
import userReducer from '../features/users/userSlice';
import transactionReducer from '../features/transactions/transactionSlice';


const logger = createLogger();

const store = configureStore({
    reducer: {
        books: bookReducer,
        copies: copyReducer,
        users: userReducer,
        transactions: transactionReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store;