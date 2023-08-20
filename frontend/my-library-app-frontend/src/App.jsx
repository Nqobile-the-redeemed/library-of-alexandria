import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BookPage } from './features/books/pages/bookPage.jsx'
import { CopiesPage } from './features/copies/pages/copiesPage.jsx'
import { UsersPage } from './features/users/pages/usersPage.jsx'
import  { HomePage }  from './features/home/pages/homePage.jsx'
import { TransactionPage } from './features/transactions/pages/transactionPage.jsx'
import { Header } from './features/navigation/components/header.jsx'
import { Footer } from './features/navigation/components/footer.jsx'
import NewTransactionPage from './features/transactions/pages/NewTransactionPage'
import DatePicker from "react-datepicker";


function App() {

  return (
    <>
      <Header />
      <Routes>
        < Route path="/" element={<HomePage />} />  
        < Route path="/books" element={<BookPage />} />
        < Route path="/copies" element={<CopiesPage />} />
        < Route path="/users" element={<UsersPage />} />
        < Route path="/transactions" element={<TransactionPage />} />
        < Route path="/transactions/new" element={<NewTransactionPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
