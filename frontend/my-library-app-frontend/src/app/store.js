import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import bookReducer from '../features/books/bookSlice';
import copyReducer from '../features/copies/copiesSlice';


const logger = createLogger();

const store = configureStore({
    reducer: {
        books: bookReducer,
        copies: copyReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store;