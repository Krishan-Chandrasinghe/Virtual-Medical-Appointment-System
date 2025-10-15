import { useState } from 'react';
import { Link } from 'react-router-dom'
import UniLogo from '../assets/UniLogo.webp';
import { useAuthContext } from '../hooks/useAuthContext';
import api from '../api/apiConfig';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, dispatch } = useAuthContext();

  const handleLogout = async () => {
    dispatch({ type: 'LOGOUT' });
    await api.post('users/logout');
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-8"
                src={UniLogo}
                alt="Your Company"
              />
              <span className="ml-2 text-xl font-bold text-[#3a1031]">
                Medical Center
              </span>
            </div>
          </div>

          {/* Desktop Menu - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Contact Us
            </a>
          </div>

          {/* Desktop Menu - Right Side */}
          {
            user &&
            <div className="hidden md:flex items-center space-x-4">
              <h4 className='text-[#3a1031] text-sm font-bold'>{user.firstName}</h4>
              <button onClick={handleLogout} className="border border-red-600 hover:bg-red-700 text-gray-700 hover:text-white px-2 py-1 rounded-md text-sm font-medium transition duration-300">
                Log Out
              </button>
            </div>
          }
          {
            !user &&
            <div className="hidden md:flex items-center space-x-4">
              <Link to={'/login'} className="border border-[#3a1031] hover:bg-[#3a1031] text-[#3a1031] hover:text-white px-2 py-1 rounded-md text-sm font-medium transition duration-300">
                Log in
              </Link>
            </div>
          }

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact Us
          </a>
          <div className="border-t border-gray-200 pt-4 pb-3">
            {
              user &&
              <div className="mt-3 space-y-1">
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50">
                  Log out
                </button>
              </div>
            }
            {
              !user &&
              <div className="mt-3 space-y-1">
                <Link to={'/login'} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#3a1031] hover:bg-gray-50">
                  Log in
                </Link>
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;