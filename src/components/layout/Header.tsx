import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#28DF99] shadow-md py-2' 
          : 'bg-[#28DF99] py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white font-bold text-xl md:text-2xl transition-transform hover:scale-105"
          >
            <ShoppingBag size={28} />
            <span className="font-['Fira_Sans']">EcoShop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-[#F6F7D4] transition-colors font-['Fira_Sans']">
              Home
            </Link>
            <Link to="/?category=electronics" className="text-white hover:text-[#F6F7D4] transition-colors font-['Fira_Sans']">
              Electronics
            </Link>
            <Link to="/?category=clothing" className="text-white hover:text-[#F6F7D4] transition-colors font-['Fira_Sans']">
              Clothing
            </Link>
            <Link to="/?category=home" className="text-white hover:text-[#F6F7D4] transition-colors font-['Fira_Sans']">
              Home & Living
            </Link>
          </nav>

          {/* Search, Cart, User Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/90 rounded-full py-2 pl-4 pr-10 w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-[#99F3BD] text-gray-800 placeholder-gray-500"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#28DF99]"
              >
                <Search size={18} />
              </button>
            </form>

            <Link 
              to="/cart" 
              className="text-white hover:text-[#F6F7D4] transition-colors relative"
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F6F7D4] text-[#28DF99] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="text-white hover:text-[#F6F7D4] transition-colors">
                  <User size={24} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    Hi, {user.name}
                  </div>
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-white hover:text-[#F6F7D4] transition-colors"
              >
                <User size={24} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/90 rounded-full py-2 pl-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-[#99F3BD] text-gray-800"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#28DF99]"
              >
                <Search size={18} />
              </button>
            </form>

            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-white hover:text-[#F6F7D4] transition-colors font-['Fira_Sans']"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/?category=electronics" 
                className="text-white hover:text-[#F6F7D4] transition-colors font-['Fira_Sans']"
                onClick={() => setIsMenuOpen(false)}
              >
                Electronics
              </Link>
              <Link 
                to="/?category=clothing" 
                className="text-white hover:text-[#F6F7D4] transition-colors font-['Fira_Sans']"
                onClick={() => setIsMenuOpen(false)}
              >
                Clothing
              </Link>
              <Link 
                to="/?category=home" 
                className="text-white hover:text-[#F6F7D4] transition-colors font-['Fira_Sans']"
                onClick={() => setIsMenuOpen(false)}
              >
                Home & Living
              </Link>
              <div className="border-t border-white/20 pt-3 mt-2">
                <Link 
                  to="/cart" 
                  className="flex items-center text-white hover:text-[#F6F7D4] transition-colors font-['Fira_Sans']"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Cart {cartItemCount > 0 && `(${cartItemCount})`}
                </Link>
                {user ? (
                  <>
                    <Link 
                      to="/profile" 
                      className="flex items-center mt-3 text-white hover:text-[#F6F7D4] transition-colors font-['Fira_Sans']"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={20} className="mr-2" />
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center mt-3 text-white hover:text-[#F6F7D4] transition-colors font-['Fira_Sans']"
                    >
                      <LogOut size={20} className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    className="flex items-center mt-3 text-white hover:text-[#F6F7D4] transition-colors font-['Fira_Sans']"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} className="mr-2" />
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;