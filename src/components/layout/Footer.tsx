"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [theme, setTheme] = useState('light');
  
  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };
    
    // Initial check
    checkTheme();
    
    // Set up a mutation observer to watch for class changes on the html element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    // Also listen for custom theme change events
    window.addEventListener('themeChange', checkTheme);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('themeChange', checkTheme);
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">SoftSell</h3>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-300'}`}>
              Transforming unused software licenses into cash through a secure, fast, and compliant platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-white'}`}>
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-white'}`}>
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#how-it-works" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'} transition-colors`}>
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#why-choose-us" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'} transition-colors`}>
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'} transition-colors`}>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#contact" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'} transition-colors`}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@softsell.example.com</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Software Lane, San Francisco, CA 94107</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-700'} mt-8 pt-8 flex flex-col md:flex-row justify-between items-center`}>
          <p className="text-gray-400">© {currentYear} SoftSell. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white mr-4">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}