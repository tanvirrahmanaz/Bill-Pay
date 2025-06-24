import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import logo from "/pay-bil-logo.jpg";

const Navbar = () => {
  const { user, logoutUser, balance } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProtectedLink = (e, path) => {
    if (!user) {
      e.preventDefault();
      navigate('/login');
    }
  };

  // Get first letter of user's name or email
  const getUserInitial = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return <FaUser className="text-xl" />;
  };

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      {/* Mobile Menu Button - Left aligned */}
      <div className="flex-none lg:hidden">
        <button 
          onClick={toggleMobileMenu}
          className="btn btn-ghost btn-circle"
        >
          {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Logo Section - Left aligned */}
      <div className="flex-1 flex justify-center lg:justify-start">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
          <Link to="/" className="text-xl sm:text-2xl font-bold text-primary hover:text-primary-focus transition-colors ml-1 sm:ml-2">
            BillPay
          </Link>
        </div>
      </div>

      {/* Desktop Navigation - Centered */}
      <div className="hidden lg:flex justify-center absolute left-0 right-0 mx-auto pointer-events-none">
        <ul className="menu menu-horizontal px-1 gap-4 pointer-events-auto">
          <li>
            <Link to="/" className="text-base font-semibold hover:bg-primary hover:text-white transition-colors rounded-lg px-6 py-2">
              Home
            </Link>
          </li>
          <li>
            <Link to="/bills" className="text-base font-semibold hover:bg-primary hover:text-white transition-colors rounded-lg px-6 py-2">
              Bills
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-base font-semibold hover:bg-primary hover:text-white transition-colors rounded-lg px-6 py-2">
              My Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* User Menu - Right aligned */}
      <div className="flex-none ml-4 z-50">
        {user ? (
          <div className="relative">
            <button 
              onClick={toggleDropdown} 
              className="btn btn-circle btn-ghost hover:bg-primary hover:text-white transition-colors"
            >
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || "User"} 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100" 
                />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                  {getUserInitial()}
                </div>
              )}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-base-100 rounded-lg shadow-xl border border-base-200 z-50">
                <div className="p-4 border-b border-base-200">
                  <p className="text-lg font-semibold">{user.displayName || "User"}</p>
                  <p className="text-sm text-base-content/70">{user.email}</p>
                  <div className="mt-2 p-2 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium">Balance</p>
                    <p className="text-xl font-bold text-primary">{balance} BDT</p>
                  </div>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-base-content hover:bg-base-200 rounded-lg transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-primary btn-sm">
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu - Left side with solid background */}
      <div className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
              <button 
                onClick={toggleMobileMenu}
                className="btn btn-ghost btn-circle"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 bg-gray-50">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="block text-lg font-semibold text-gray-800 hover:text-primary transition-colors py-2"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/bills" 
                  className="block text-lg font-semibold text-gray-800 hover:text-primary transition-colors py-2"
                  onClick={toggleMobileMenu}
                >
                  Bills
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className="block text-lg font-semibold text-gray-800 hover:text-primary transition-colors py-2"
                  onClick={toggleMobileMenu}
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;