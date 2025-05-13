// src/components/LogoutButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        navigate('/'); 
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
