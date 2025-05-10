"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function HowItWorksSection() {
  const [theme, setTheme] = useState('light');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
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

  const steps = [
    {
      id: 1,
      title: 'Upload License Details',
      description: 'Provide information about your unused software licenses through our secure form.',
      icon: (
        <svg className={`h-12 w-12 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      bgColor: theme === 'dark' ? 'from-blue-900/30 to-blue-800/30' : 'from-blue-50 to-blue-100/50',
      borderColor: theme === 'dark' ? 'border-blue-800' : 'border-blue-100',
      iconBg: theme === 'dark' ? 'from-blue-900 to-indigo-900' : 'from-blue-50 to-indigo-100',
    },
    {
      id: 2,
      title: 'Receive Valuation',
      description: 'Our experts evaluate your licenses and provide a competitive market valuation within 24 hours.',
      icon: (
        <svg className={`h-12 w-12 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: theme === 'dark' ? 'from-purple-900/30 to-purple-800/30' : 'from-purple-50 to-purple-100/50',
      borderColor: theme === 'dark' ? 'border-purple-800' : 'border-purple-100',
      iconBg: theme === 'dark' ? 'from-purple-900 to-indigo-900' : 'from-purple-50 to-indigo-100',
    },
    {
      id: 3,
      title: 'Get Paid',
      description: 'Accept our offer and receive payment through your preferred method within 48 hours.',
      icon: (
        <svg className={`h-12 w-12 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bgColor: theme === 'dark' ? 'from-green-900/30 to-green-800/30' : 'from-green-50 to-green-100/50',
      borderColor: theme === 'dark' ? 'border-green-800' : 'border-green-100',
      iconBg: theme === 'dark' ? 'from-green-900 to-teal-900' : 'from-green-50 to-teal-100',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -10 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        delay: 0.2 
      }
    }
  };

  const connectorAnimation = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut", 
        delay: 0.5 
      }
    }
  };

  // Hover animation
  const cardHoverAnimation = {
    scale: 1.03,
    y: -5,
    boxShadow: theme === 'dark' 
      ? "0 10px 25px -5px rgba(0, 0, 0, 0.7)" 
      : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 300
    }
  };

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className={`py-24 relative overflow-hidden ${
        theme === 'dark' 
          ? 'bg-gray-900 text-white' 
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div 
          className={`absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-10 ${
            theme === 'dark' ? 'bg-blue-600' : 'bg-blue-300'
          }`} 
        />
        <div 
          className={`absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-10 ${
            theme === 'dark' ? 'bg-purple-600' : 'bg-purple-300'
          }`} 
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
            <h2 className={`text-3xl font-extrabold sm:text-4xl mb-2 inline-block ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-blue-300 to-indigo-400 text-transparent bg-clip-text' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text'
            }`}>
              How It Works
            </h2>
          </motion.div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-2 mb-6 rounded-full"></div>
          <p className={`max-w-2xl text-xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Our simple three-step process makes selling your unused software licenses quick and hassle-free.
          </p>
        </motion.div>

        <motion.div 
          className="mt-20 relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Connector Lines (for desktop) */}
          <div className="hidden md:block">
            <motion.div 
              className={`absolute top-28 left-[30%] right-[70%] h-0.5 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}
              variants={connectorAnimation}
            />
            <motion.div 
              className={`absolute top-28 left-[70%] right-[30%] h-0.5 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}
              variants={connectorAnimation}
            />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-10 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                variants={cardVariants}
                whileHover={cardHoverAnimation}
                className={`relative p-8 rounded-xl border backdrop-blur-sm shadow-lg transition-all duration-300 ${
                  step.borderColor
                } bg-gradient-to-b ${
                  step.bgColor
                } ${
                  theme === 'dark' 
                    ? 'shadow-gray-800/80' 
                    : 'shadow-gray-200/80'
                }`}
              >
                {/* Step number badge */}
                <div className={`absolute -top-4 ${
                  index === 0 ? 'left-6' : 
                  index === 1 ? 'left-1/2 -translate-x-1/2' : 
                  'right-6'
                } rounded-full w-8 h-8 flex items-center justify-center ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-white border border-gray-700' 
                    : 'bg-white text-gray-900 border border-gray-200'
                } shadow-md font-bold text-sm`}>
                  {step.id}
                </div>

                {/* Icon container */}
                <motion.div 
                  className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br ${
                    step.iconBg
                  } ${
                    theme === 'dark' 
                      ? 'shadow-lg shadow-black/20' 
                      : 'shadow-md shadow-gray-200/70'
                  }`}
                  variants={iconVariants}
                  whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                >
                  {step.icon}
                </motion.div>

                <div className="text-center">
                  <h3 className={`text-xl font-bold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{step.title}</h3>
                  <p className={`text-base ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info Box */}
          <motion.div 
            className={`mt-16 mx-auto max-w-3xl p-6 rounded-xl border ${
              theme === 'dark' 
                ? 'bg-gray-800/60 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            } backdrop-blur-sm shadow-lg`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className={`flex-shrink-0 p-3 rounded-full ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'
              }`}>
                <svg className={`h-8 w-8 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className={`text-lg font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Our process is secure and confidential</h4>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  All license information is encrypted and handled with strict confidentiality. 
                  We comply with all relevant regulations and our verification process protects both sellers and buyers.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}