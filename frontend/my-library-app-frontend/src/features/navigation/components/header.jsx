import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header>
      <nav>
        <a>
            <Link to="/">Home</Link>
        </a>
        <ul>
          <li>
            <Link to="../features/user s/pages/usersPage.jsx">Users</Link>
          </li>
          <li>
            <Link to="../features/books/pages/bookPage.jsx">Books</Link>
          </li>
          <li>
            <Link to="../features/transactions/pages/transactionPage.jsx">Logs</Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;