"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
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
    
    return () => observer.disconnect();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 80,
        delay: 0.4
      }
    }
  };

  // Floating animation for the illustration
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  // Button hover animation
  const buttonHoverAnimation = {
    scale: 1.05,
    boxShadow: theme === 'dark' 
      ? "0 0 0 rgba(59, 130, 246, 0.5)"
      : "0 0 0 rgba(59, 130, 246, 0.3)",
    transition: {
      type: "spring",
      stiffness: 300
    }
  };

  return (
    <section className={`
      relative overflow-hidden
      ${theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900'
      } py-24 sm:py-32`}
    >
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-0 -left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        {theme === 'light' && (
          <div className="absolute bottom-1/2 left-1/2 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        )}
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.div variants={itemVariants}>
              <span className={`inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-6
                ${theme === 'dark'
                  ? 'bg-blue-900/30 text-blue-300 border border-blue-800'
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}
              >
                #1 Software License Marketplace
              </span>
            </motion.div>
            
            <motion.h1 
              className={`text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              variants={itemVariants}
            >
              <span className="block">Transform Unused</span>
              <span className={`block ${theme === 'dark' 
                ? 'bg-gradient-to-r from-blue-300 to-indigo-400 text-transparent bg-clip-text' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text'
              }`}>
                Software Licenses
              </span>
              <span className="block">into Cash</span>
            </motion.h1>
            
            <motion.p 
              className={`mt-5 text-lg sm:text-xl max-w-md mx-auto lg:mx-0 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
              variants={itemVariants}
            >
              SoftSell helps businesses recover value from underutilized software investments with our secure, fast license resale platform.
            </motion.p>
            
            <motion.div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start" variants={itemVariants}>
              <motion.div whileHover={buttonHoverAnimation} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#contact"
                  className={`inline-block px-8 py-3.5 text-base font-medium rounded-full
                    text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500
                    shadow-lg md:py-4 md:text-lg md:px-10 transition-all duration-300`}
                >
                  Get Your Valuation
                </Link>
              </motion.div>
              
              <motion.div whileHover={buttonHoverAnimation} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#how-it-works"
                  className={`inline-block px-8 py-3.5 border text-base font-medium rounded-full 
                    ${theme === 'dark' 
                      ? 'text-white border-gray-700 bg-gray-800/70 hover:bg-gray-700/70 backdrop-blur-sm' 
                      : 'text-gray-900 border-gray-200 bg-white/70 hover:bg-gray-50/90 backdrop-blur-sm'
                    } md:py-4 md:text-lg md:px-10 shadow-md transition-all duration-300`}
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-16 lg:mt-0"
            variants={imageVariants}
            animate={floatingAnimation}
          >
            <div className={`rounded-2xl shadow-2xl overflow-hidden max-w-lg mx-auto 
              ${theme === 'dark' 
                ? 'bg-gray-800/70 border border-gray-700 backdrop-blur-md' 
                : 'bg-white/80 border border-gray-100 backdrop-blur-md'
              }`}
            >
              <div className={`h-64 flex items-center justify-center relative overflow-hidden
                ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900 to-indigo-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
              }`}>
                <motion.div 
                  whileHover={{ 
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 } 
                  }}
                >
                  <svg className={`h-32 w-32 ${
                    theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                  }`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 7h8v2h-8zm0 4h8v2h-8zm0 4h8v2h-8zM3 5a2 2 0 012-2h4a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v14a1 1 0 001 1h4a1 1 0 001-1V5a1 1 0 00-1-1H5z"/>
                  </svg>
                </motion.div>
                
                {/* Decorative elements */}
                <motion.div 
                  className={`absolute w-20 h-20 rounded-full -top-5 -right-5 
                    ${theme === 'dark' ? 'bg-purple-600/30 backdrop-blur-xl' : 'bg-purple-200/50 backdrop-blur-xl'}`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div 
                  className={`absolute w-16 h-16 rounded-full -bottom-8 -left-8 
                    ${theme === 'dark' ? 'bg-blue-600/30 backdrop-blur-xl' : 'bg-blue-200/50 backdrop-blur-xl'}`}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
              
              <motion.div 
                className="px-8 py-6"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`font-bold text-xl mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>Software License Resale Made Simple</div>
                <p className={`text-base ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Unlock the value of your unused software licenses with our easy 3-step process.
                </p>
                <div className="mt-4 pt-4 border-t border-dashed flex items-center justify-between">
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Trusted by 2,500+ companies
                  </div>
                  <motion.button 
                    className={`text-sm font-medium flex items-center gap-1
                      ${theme === 'dark' ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-500'}`}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Get started
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}