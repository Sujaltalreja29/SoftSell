"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SimpleThemeToggle from '../ui/SimpleThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [scrolled, setScrolled] = useState(false);
  
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
    
    // Track scroll for header appearance
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i : any) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, overflow: 'hidden' },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Nav items for reuse
  const navItems = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 backdrop-blur-sm ${
        scrolled 
          ? 'shadow-lg' 
          : 'shadow-sm'
      } ${
        theme === 'dark' 
          ? 'bg-gray-900/95 text-white border-b border-gray-800' 
          : 'bg-white/95 text-gray-900 border-b border-gray-100'
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 flex items-center"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href="/" className="flex items-center gap-2">
              <motion.div 
                className="w-8 h-8 pt-0.5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SS
              </motion.div>
              <motion.span 
                className={`text-2xl font-display font-bold ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}
                whileHover={{ scale: 1.03 }}
              >
                SoftSell
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={item.href} 
                  className={`px-3 py-2 text-sm font-medium relative group`}
                >
                  <span className={`${
                    theme === 'dark' 
                      ? 'text-gray-300 group-hover:text-blue-400' 
                      : 'text-gray-600 group-hover:text-blue-600'
                  } transition-colors duration-200`}>
                    {item.name}
                  </span>
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                    theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                  } group-hover:w-full transition-all duration-300`} />
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              variants={navItemVariants}
              custom={3}
              initial="hidden"
              animate="visible"
            >
              <SimpleThemeToggle />
            </motion.div>
            
            <motion.div
              variants={navItemVariants}
              custom={4}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="#contact" 
                className={`
                  relative overflow-hidden px-5 py-2.5 rounded-full text-sm font-medium 
                  ${theme === 'dark' 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  } transition-all duration-300
                `}
              >
                Get Started
                
              </Link>
            </motion.div>
          </nav>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <SimpleThemeToggle />
            </motion.div>
            
            <motion.button
              type="button"
              className={`ml-2 inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu open/close */}
              <motion.svg 
                animate={{ rotate: isMenuOpen ? 90 : 0, opacity: isMenuOpen ? 0 : 1 }}
                className={`h-6 w-6 ${isMenuOpen ? 'absolute' : 'relative'}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
              <motion.svg 
                animate={{ rotate: isMenuOpen ? 0 : -90, opacity: isMenuOpen ? 1 : 0 }}
                className={`h-6 w-6 ${isMenuOpen ? 'relative' : 'absolute'}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}>
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: i * 0.1 } 
                  }}
                >
                  <Link 
                    href={item.href} 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    } transition-colors duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: navItems.length * 0.1 } 
                }}
              >
                <Link 
                  href="#contact" 
                  className={`
                    block px-4 py-2.5 rounded-md text-base font-medium 
                    bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
                    hover:shadow-lg transition-all duration-300
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}