import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="./pages/users">Users</Link>
          </li>
          <li>
            <Link to="./pages/Books">Books</Link>
          </li>
          <li>
            <Link to="./pages/Logs">Logs</Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;