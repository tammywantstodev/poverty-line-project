import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import LogoutButton from './LogoutButton.jsx';


export default function Navbar({user}) {
  const location = useLocation();
  const showLogout = ['/dashboard', '/profile'].includes(location.pathname);
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">PovAware</Link>

      <div className="navbar-links">
        <Link to="/about" className="navbar-link">About</Link>
        <Link to="/features" className="navbar-link">Features</Link>
        <Link to="/joblistings" className="navbar-link">Find Jobs</Link>
        {user ? (
        <Link to="/dashboard/user">
          <button>Account</button>
        </Link>
      ) : (
        <Link to="/auth/signin">
          <button>Sign In</button>
        </Link>
      )}
      </div>
    </nav>
  );
}
