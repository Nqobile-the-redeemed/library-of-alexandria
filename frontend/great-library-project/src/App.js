import logo from './logo.svg';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BooksPage from './pages/Books';
import UsersPage from './pages/Users';
import LogsPage from './pages/Logs';

function App() {

  const location = useLocation();
  const isDefaultPath = location.pathname === '/';

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/pages/Books" element={<BooksPage />} />
        <Route path="/pages/Users" element={<UsersPage />} />
        <Route path="/pages/Logs" element={<LogsPage />} />
      </Routes>

      {isDefaultPath && <h2>Hello, World!</h2>}

      <Footer />

    </div>
  );
}

export default App;
