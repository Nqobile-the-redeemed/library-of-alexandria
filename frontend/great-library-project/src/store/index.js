import { configureStore } from '@reduxjs/toolkit'
import booksReducers from '../reducers/booksReducers';
import usersReducers from '../reducers/usersReducers';
import logsReducers from '../reducers/logsReducers';
import copiesReducers from '../reducers/copiesReducers';


const store = configureStore({
    reducer: {
        books: booksReducers,
        users: usersReducers,
        logs: logsReducers,
        copies: copiesReducers
    }
  })

export default store;


