import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import TransactionTableRow from './TransactionTableRow';

const TransactionsTable = ({ transactions, transactionsError, transactionsLoading }) => {

  // If loading show loading message
  if (transactionsLoading) 
    return 
      <div>Loading...</div>

  
  if (transactionsError)
    return
      <div>Error.....</div>
  
  if (transactions.length === 0)
    return
      <div>No transactions</div>




  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>User</th>
            <th>Books</th>
            <th>Copies</th>
            <th>Checkout Date</th>
            <th>Due Date</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Buttons</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <TransactionTableRow key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionsTable