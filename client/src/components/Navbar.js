import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/0 shadow-sm z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-sky-400 font-extrabold text-5xl tracking-wide">
          <Link to="/">Manzafir</Link>
        </div>

        {/* Links */}
        <div className="flex text-xl items-center space-x-6">
          
          {user ? (
            <>
            <Link
            to="/"
            className="text-sky-500 hover:text-sky-200 font-medium transition"
          >
            Home
          </Link>
              <Link
                to="/matching"
                className="text-sky-500 hover:text-sky-200 font-medium transition"
              >
                Matching
              </Link>
              <Link
                to="/tours"
                className="text-sky-500 hover:text-sky-200 font-medium transition"
              >
                Tours
              </Link>
              <Link 
                to="/about"
                className="text-sky-500 hover:text-sky-200 font-medium transition"
              >
                About Us
              </Link>
              <Link 
                to="/contact"
                className="text-sky-500 hover:text-sky-200 font-medium transition"
              >
                Contact Us
              </Link>
              <Link 
                to="/blog"
                className="text-sky-500 hover:text-sky-200 font-medium transition"
              >
                Blog
              </Link>
              {/* Profile Dropdown */}
              <div className="relative inline-block">
                <button
                  onClick={toggleMenu}
                  className="text-sky-500 translate-y-1 hover:text-sky-200 transition-all duration-200 focus:outline-none"
                >
                  <CgProfile size={28} />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white/40 rounded-lg shadow-lg  transition-all duration-300"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100/70 rounded-md transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100/70 rounded-md transition-all duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
             <Link
            to="/"
            className="text-gray-500 hover:text-sky-200 font-medium transition"
          >
            Home
          </Link>
              <Link
                to="/login"
                className="text-gray-500 hover:text-sky-200 font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-500 hover:text-sky-200 font-medium transition"
              >
                Sign Up
              </Link>
              <Link 
                to="/about"
                className="text-gray-500 hover:text-sky-200 font-medium transition"
              >
                About Us
              </Link>
              <Link 
                to="/contact"
                className="text-sky-500 hover:text-sky-200 font-medium transition"
              >
                Contact Us
              </Link>
              <Link 
                to="/blog"
                className="text-sky-500 hover:text-sky-200 font-medium transition"
              >
                Blog
              </Link>
              

            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
