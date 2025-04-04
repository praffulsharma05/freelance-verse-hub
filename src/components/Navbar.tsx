
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  isAuthenticated?: boolean;
}

const Navbar = ({ isAuthenticated: propIsAuthenticated }: NavbarProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Use the prop if provided, otherwise use the auth context
  const isAuthenticated = propIsAuthenticated !== undefined ? propIsAuthenticated : !!user;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-black text-white shadow-md w-full">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-light tracking-tighter">Co-Lancer</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to={isAuthenticated ? "/home" : "/"} className="hover:text-colancer-lightpurple transition">Home</Link>
            {isAuthenticated && (
              <>
                <Link to="/projects" className="hover:text-colancer-lightpurple transition">Projects</Link>
                <Link to="/circular" className="hover:text-colancer-lightpurple transition">Circular</Link>
                <Link to="/competition" className="hover:text-colancer-lightpurple transition">Competition</Link>
              </>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 pr-10 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-colancer-purple focus:bg-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 text-gray-400" size={18} />
          </div>

          {/* User Profile / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="hover:text-colancer-lightpurple transition flex items-center"
                    title="Admin Panel"
                  >
                    <Shield size={20} />
                  </Link>
                )}
                <Link to="/profile" className="hover:text-colancer-lightpurple transition">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <User size={20} />
                  </div>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="hover:text-colancer-lightpurple transition"
                  title="Sign out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/" className="hover:text-colancer-lightpurple transition">Login / Register</Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 pr-10 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-colancer-purple focus:bg-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-2 text-gray-400" size={18} />
            </div>
            <Link to={isAuthenticated ? "/home" : "/"} className="block py-2 hover:text-colancer-lightpurple transition">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/projects" className="block py-2 hover:text-colancer-lightpurple transition">Projects</Link>
                <Link to="/circular" className="block py-2 hover:text-colancer-lightpurple transition">Circular</Link>
                <Link to="/competition" className="block py-2 hover:text-colancer-lightpurple transition">Competition</Link>
                {isAdmin && (
                  <Link to="/admin" className="block py-2 hover:text-colancer-lightpurple transition flex items-center">
                    <Shield size={18} className="mr-2" />
                    Admin Panel
                  </Link>
                )}
                <Link to="/profile" className="block py-2 hover:text-colancer-lightpurple transition">Profile</Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left py-2 hover:text-colancer-lightpurple transition"
                >
                  <div className="flex items-center">
                    <LogOut size={18} className="mr-2" />
                    Sign out
                  </div>
                </button>
              </>
            ) : (
              <Link to="/" className="block py-2 hover:text-colancer-lightpurple transition">Login / Register</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
