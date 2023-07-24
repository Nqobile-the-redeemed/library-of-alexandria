import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import bookReducer from '../features/books/bookSlice';


const logger = createLogger();

const store = configureStore({
    reducer: {
        books: bookReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store;