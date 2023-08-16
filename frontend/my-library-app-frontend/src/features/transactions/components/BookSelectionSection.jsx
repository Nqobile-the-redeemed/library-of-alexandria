import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../navigation/components/SearchBar';
import BookCard from './BookCard';

const BookSelectionSection = ({ books, loading, error, transactionBooks, setTransactionBooks }) => {

    // create and import variables

    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(books);


    // create and import functions

    const handleSearch = (e) => {
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBooks(filteredBooks);
    }

    const handleBookSelection = (selectedBook) => {
        // Check if the book is already selected
        if (!transactionBooks.some(book => book.id === selectedBook.id)) {
            setTransactionBooks(prevBooks => [...prevBooks, selectedBook]);
        }

        console.log(transactionBooks);
    }



    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

  return (
    <div>BookSelectionSection
        <div>
            <SearchBar searchQuery = {searchQuery} setSearchQuery = {setSearchQuery} handleSearch = {handleSearch} />
            <div>
                {filteredBooks.map((book) => (
                    <BookCard key = {book.id} book = {book} handleBookSelection = {handleBookSelection} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default BookSelectionSection