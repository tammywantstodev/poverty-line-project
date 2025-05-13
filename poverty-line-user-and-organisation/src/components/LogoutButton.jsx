import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include', // important for cookies/session
      });

      if (res.ok) {
        // Navigate to login page or update UI
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
