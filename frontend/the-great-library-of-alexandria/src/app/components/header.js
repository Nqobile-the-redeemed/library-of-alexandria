import Link from 'next/link';

const Header = () => {
  return (
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="./pages/users">Users</Link>
          </li>
          <li>
            <Link href="./pages/books">books</Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
  );
};

export default Header;
