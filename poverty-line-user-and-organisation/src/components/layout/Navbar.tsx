import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LogoutButton from './LogoutButton';

interface NavbarProps {
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();  // Access the current location

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = () => {
    window.location.href = 'http://localhost:5000/account'; 
  };

  const handleSignin = () => {
    window.location.href = 'http://localhost:5000/login'; 
  };

  // Check if the current path is one of the user or organization pages
  const isUserOrOrganizationPage = location.pathname.includes('/dashboard/user') || location.pathname.includes('/dashboard/organization');

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">PL</span>
              </div>
              <span className="font-montserrat font-bold text-xl text-gray-800">
                Poverty<span className="text-primary">Link</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <button onClick={handleClick}>Account</button>
                <LogoutButton />
              </>
            ) : !isUserOrOrganizationPage && (  // Check if not on user/org pages
              <button onClick={handleSignin} className="text-sm border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition m-2">Signin</button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              About
            </Link>

            {user && (
              <>
                <Link
                  to="/dashboard/user"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  User Dashboard
                </Link>
                <Link
                  to="/dashboard/organization"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Organization Dashboard
                </Link>
                <Link
                  to="/dashboard/admin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Admin Dashboard
                </Link>
              </>
            )}

            <div className="pt-4 flex flex-col space-y-2">
              {user ? (
                <>
                  <button onClick={handleClick}>Account</button>
                  <LogoutButton />
                </>
              ) : !isUserOrOrganizationPage && (
                <button onClick={handleSignin} className="text-sm border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition m-2">Signin</button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
