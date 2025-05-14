import { Link } from 'react-router-dom';
import '../styles/Navbar.css';


export default function Navbar({user}) {
  const location = useLocation();
  const handleClick = () => {
    window.location.href = 'http://localhost:5000/account'; 
  };
  const handleSignin = () => {
    window.location.href = 'http://localhost:5000/login'; 
  };
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">PovAware</Link>

      <div className="navbar-links">
        <Link to="/about" className="navbar-link">About</Link>
        <Link to="/features" className="navbar-link">Features</Link>
        <Link to="/joblistings" className="navbar-link">Find Jobs</Link>
        {user ? (
        <button onClick={handleClick}>Account</button>
      ) : (
        <button onClick={handleSignin}>Signin</button>
      )}
      </div>
    </nav>
  );
}
