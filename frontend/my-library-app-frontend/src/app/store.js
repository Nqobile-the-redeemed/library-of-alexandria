import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import bookReducer from '../features/book/bookSlice';


const logger = createLogger();

const store = configureStore({
    reducer: {
        book: bookReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store;