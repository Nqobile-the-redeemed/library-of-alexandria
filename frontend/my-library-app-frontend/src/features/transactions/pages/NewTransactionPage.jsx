import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import  BookSelectionSection  from '../components/BookSelectionSection';
import  NewTransactionForm from '../components/NewTransactionForm';
import { fetchBooks } from '../../books/bookSlice';
import { fetchCopies } from '../../copies/copiesSlice'; // Import fetchCopies from copiesSlice
import { fetchTransactions } from '../transactionSlice'; // Import fetchTransactions from transactionsSlice
import { fetchUsers } from '../../users/userSlice'; // Import fetchUser from usersSlice


const NewTransactionPage = () => {

  //Variouse imports  
  const dispatch = useDispatch();


  // IMPORTING THE Book STATE FROM THE STORE
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  //Importing the copies state from the store
  const copies = useSelector((state) => state.copies.copies);
  const copiesLoading = useSelector((state) => state.copies.loading);
  const copiesError = useSelector((state) => state.copies.error);

  //Importing the transactions state from the store
  const transactions = useSelector((state) => state.transactions.transactions);
  const transactionsLoading = useSelector((state) => state.transactions.loading);
  const transactionsError = useSelector((state) => state.transactions.error);


  //Importing the user state from the store
  const user = useSelector((state) => state.users.user);
  const userLoading = useSelector((state) => state.users.loading);
  const userError = useSelector((state) => state.users.error);

  const [transactionBooks, setTransactionBooks] = useState([]);
  const [transactionCopies, setTransactionCopies] = useState([]);
  const [transactionUser, setTransactionUser] = useState(null);
  const [transactionCheckoutDate, setTransactionCheckoutDate] = useState(null);
  const [transactionDueDate, setTransactionDueDate] = useState(null);
  const [transactionEmail, setTransactionEmail] = useState(null);
  const [transactionPhone, setTransactionPhone] = useState(null);

  const newTransaction = {
    books: transactionBooks,
    copies: transactionCopies,
    user: transactionUser,
    checkoutDate: transactionCheckoutDate,
    returnDate: transactionDueDate,
    email: transactionEmail,
    phoneNumber: transactionPhone
  }

  //FUNCTION TO FETCH DATA ON LOAD FROM THE BACKEND
  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchCopies()); // Fetch copies when the component mounts
    dispatch(fetchTransactions()); // Fetch transactions when the component mounts
    dispatch(fetchUsers()); // Fetch user when the component mounts
  }, []);



  return (
    <div>
      NewTransactionPage
      <div>
        <BookSelectionSection books = {books} loading = {loading} error = {error} transactionBooks = {transactionBooks} setTransactionBooks = {setTransactionBooks} />
        <NewTransactionForm />
      </div>
    </div>
  )
}

export default NewTransactionPage