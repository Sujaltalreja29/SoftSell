"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-sm sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-display font-bold text-blue-600">
                SoftSell
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="#how-it-works" 
              className={`${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} px-3 py-2 text-sm font-medium`}
            >
              How It Works
            </Link>
            <Link 
              href="#why-choose-us" 
              className={`${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} px-3 py-2 text-sm font-medium`}
            >
              Why Choose Us
            </Link>
            <Link 
              href="#testimonials" 
              className={`${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} px-3 py-2 text-sm font-medium`}
            >
              Testimonials
            </Link>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md focus:outline-none"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                // Moon icon for dark mode
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                // Sun icon for light mode
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            
            <Link 
              href="#contact" 
              className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center">
            {/* Theme Toggle Button for Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md focus:outline-none"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            
            <button
              type="button"
              className={`ml-2 inline-flex items-center justify-center p-2 rounded-md ${
                theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              } focus:outline-none`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu open/close */}
              <svg 
                className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          <Link 
            href="#how-it-works" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link 
            href="#why-choose-us" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Why Choose Us
          </Link>
          <Link 
            href="#testimonials" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Testimonials
          </Link>
          <Link 
            href="#contact" 
            className="block px-3 py-2 rounded-md text-base font-medium bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}