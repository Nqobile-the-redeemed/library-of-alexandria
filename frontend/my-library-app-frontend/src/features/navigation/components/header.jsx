import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <nav>
        <Link to="/">Home</Link>
        <ul>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            <Link to="/copies">Copies</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
          <li>
            <Link to="/transactions/new">New Transaction</Link>
          </li>
        </ul>
      </nav>
  )
}

