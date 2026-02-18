import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-xl sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-xl">ហ</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent khmer-text">
                ហាងសម្លៀកបំពាក់
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-medium khmer-text transition-all duration-200"
            >
              ទំព័រដើម
            </Link>
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-medium khmer-text transition-all duration-200"
            >
              ផលិតផល
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/orders" 
                  className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-medium khmer-text transition-all duration-200"
                >
                  ការបញ្ជាទិញ
                </Link>
                <Link 
                  to="/profile" 
                  className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-medium khmer-text transition-all duration-200"
                >
                  គណនី
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 group"
            >
              <svg className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="khmer-text">{user?.username || 'អ្នកប្រើ'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 khmer-text transition-colors duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      គណនីរបស់ខ្ញុំ
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 khmer-text transition-colors duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      ប្រវត្តិការបញ្ជាទិញ
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 khmer-text transition-colors duration-200"
                    >
                      ចាកចេញ
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-medium khmer-text transition-all duration-200"
                >
                  ចូល
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg khmer-text"
                >
                  ចុះឈ្មោះ
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 hover:text-indigo-600 mr-2"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-all duration-200"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium khmer-text transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              ទំព័រដើម
            </Link>
            <Link 
              to="/products" 
              className="block text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium khmer-text transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              ផលិតផល
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/orders" 
                  className="block text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium khmer-text transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ការបញ្ជាទិញ
                </Link>
                <Link 
                  to="/profile" 
                  className="block text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium khmer-text transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  គណនី
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 bg-indigo-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">
                          {user?.username?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 khmer-text">{user?.username || 'អ្នកប្រើ'}</div>
                        <div className="text-xs text-gray-500 khmer-text">អ្នកប្រើប្រាស់</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left bg-red-500 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-600 khmer-text transition-colors duration-200"
                  >
                    ចាកចេញ
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium khmer-text transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ចូល
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-2 rounded-md text-base font-medium hover:from-indigo-700 hover:to-purple-700 khmer-text transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ចុះឈ្មោះ
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
