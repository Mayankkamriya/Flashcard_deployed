import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, Menu, X, User, Search } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import DarkModeToggle from "./DarkModeToggle";

function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-lg fixed top-0 w-full z-50 border-b border-gray-200 dark:border-gray-700 transition-all">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600 dark:from-cyan-300 dark:to-blue-500">
        🚀 UltraFlash
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className={`px-4 py-2 rounded-md transition-all duration-200 font-medium ${isActive("/dashboard") ? "bg-indigo-500 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
            Dashboard
          </Link>
          <Link to="/review" className={`px-4 py-2 rounded-md transition-all duration-200 font-medium ${isActive("/review") ? "bg-indigo-500 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
            Review Cards
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
            <Search className="w-5 h-5" />
          </button>

          {/* Dark Mode Toggle */}
          <DarkModeToggle />

          {/* Profile Section */}
          <div className="relative">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              <User className="w-5 h-5" />
              <span>{user?.name}</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-md p-2 transition-all">
                <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md w-full">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-16 p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 transition-all">
          <div className="flex flex-col space-y-2">
            <Link to="/dashboard" className={`px-4 py-3 rounded-md transition-all duration-200 ${isActive("/dashboard") ? "bg-indigo-500 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`} onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </Link>
            <Link to="/review" className={`px-4 py-3 rounded-md transition-all duration-200 ${isActive("/review") ? "bg-indigo-500 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`} onClick={() => setIsMobileMenuOpen(false)}>
              Review Cards
            </Link>
            <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-3 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md w-full">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;