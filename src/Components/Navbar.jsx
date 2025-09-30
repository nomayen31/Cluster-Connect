import React, { useContext, useState } from 'react';
import { LuUser, LuChevronDown, LuMenu } from "react-icons/lu";
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const styles = {
  deepGreen: '#1a3a37', 
  accentGreen: '#3f984a', 
};

const Navbar = () => {
  const { user, logout, auth } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout(auth)
      .then(() => alert("You have successfully logged out!"))
      .catch(() => alert("An error occurred while logging out."));
  };

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Add Task', to: '/add-task' },
    { name: 'Browse Tasks', to: '/browse-tasks' },
    { name: 'My Posted Tasks', to: '/my-posted-task' },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full bg-[${styles.deepGreen}] text-white p-4 border-b border-gray-700 z-50`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Main Links (Left Side) */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center text-xl font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="flex-shrink-0 w-5 h-5 rounded-full dark:text-gray-50">
                <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
              </svg>
              <Link to="/"><span className="font-extrabold text-2xl">Cluster Connect</span></Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex space-x-6 text-sm">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center hover:text-green-300 transition-colors ${isActive ? "text-green-300" : ""}`
                  }
                >
                  {link.name}
                  {link.isDropdown && <LuChevronDown className="w-4 h-4 ml-1 opacity-75" />}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* User Profile Picture and Name */}
                <div className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <img 
                      src={user?.photoURL} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover" 
                    />
                  ) : (
                    <LuUser className="w-8 h-8 text-white" />
                  )}
                  <span className="text-sm">{user.displayName || "User"}</span>
                </div>
                <button
                  className="text-white bg-[#3f984a] text-sm font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-all"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/auth/login" className="text-sm hover:text-green-300 transition-colors">
                  Login
                </NavLink>
                <NavLink
                  to="/auth/register"
                  className=" text-white bg-[#3f984a] text-sm font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-all"
                >
                  Register
                </NavLink>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <LuMenu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-gray-800 shadow-xl rounded-b-lg p-4 transition-all duration-300 z-40">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `block px-4 py-2 text-white hover:bg-gray-700 transition-colors rounded-md flex items-center justify-between ${
                    isActive ? "text-green-300" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="border-t border-gray-700 my-2 pt-2 space-y-2">
              {user ? (
                <button
                  className={`w-full bg-[${styles.accentGreen}] text-white text-sm font-semibold px-4 py-2 mt-2 rounded-lg hover:bg-green-600 transition-all`}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/auth/login"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/auth/register"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content hiding under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
