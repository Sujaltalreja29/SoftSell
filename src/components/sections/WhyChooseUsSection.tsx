"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TestimonialsSection() {
  const [theme, setTheme] = useState('light');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
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

  const testimonials = [
    {
      id: 1,
      content: "SoftSell helped us recover over $50,000 from unused enterprise licenses. Their process was smooth and the team was incredibly knowledgeable about software licensing regulations.",
      author: "Sarah Johnson",
      role: "CTO",
      company: "TechStream Inc.",
      rating: 5,
      avatarBg: "from-blue-500 to-indigo-600",
    },
    {
      id: 2,
      content: "After downsizing our team, we had dozens of premium subscriptions going unused. SoftSell's valuation was fair and payment was processed within 36 hours. Highly recommended!",
      author: "Michael Chen",
      role: "IT Director",
      company: "Quantum Solutions",
      rating: 5,
      avatarBg: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      content: "The compliance team at SoftSell ensured all our license transfers were fully compliant with vendor terms. This was crucial for us as a financial institution with strict regulatory requirements.",
      author: "Emily Rodriguez",
      role: "Compliance Officer",
      company: "Global Finance Partners",
      rating: 4,
      avatarBg: "from-green-500 to-teal-600",
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
        stiffness: 60, 
        damping: 12 
      }
    }
  };

  const quoteIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 0.3, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        delay: 0.5 
      }
    }
  };

  // Star rating component
  const StarRating = ({ rating }:any) => {
    return (
      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <motion.svg 
            key={i} 
            className={`h-4 w-4 ${
              i < rating 
                ? theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500' 
                : theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
            }`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { delay: 0.6 + (i * 0.1) } 
            }}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </motion.svg>
        ))}
      </div>
    );
  };

  // Card hover animation
  const cardHoverAnimation = {
    scale: 1.02,
    boxShadow: theme === 'dark' 
      ? "0 10px 25px -5px rgba(0, 0, 0, 0.7)" 
      : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 300
    }
  };

  // Mobile carousel navigation
  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className={`absolute top-40 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 ${
            theme === 'dark' ? 'bg-blue-900' : 'bg-blue-200'
          }`}
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className={`absolute bottom-10 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 ${
            theme === 'dark' ? 'bg-purple-900' : 'bg-purple-200'
          }`}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

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
              Customer Testimonials
            </h2>
          </motion.div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-2 mb-6 rounded-full"></div>
          <p className={`max-w-2xl text-xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Don't take our word for it—hear what our customers have to say.
          </p>
        </motion.div>

        {/* Desktop layout */}
        <motion.div 
          className="mt-16 hidden lg:grid gap-8 lg:grid-cols-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id} 
              variants={cardVariants}
              whileHover={cardHoverAnimation}
              className={`p-8 rounded-2xl border relative backdrop-blur-sm shadow-lg h-full
                ${theme === 'dark' 
                  ? 'bg-gray-800/60 border-gray-700' 
                  : 'bg-white/80 border-gray-200'
                }
              `}
            >
              <motion.div 
                className={`absolute top-6 left-6 opacity-30 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-300'
                }`}
                variants={quoteIconVariants}
              >
                <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                </svg>
              </motion.div>
              
              <div className="relative z-10">
                <StarRating rating={testimonial.rating} />
                
                <p className={`text-lg leading-relaxed mb-6 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>"{testimonial.content}"</p>
                
                <div className="flex items-center mt-8 pt-6 border-t border-dashed">
                  <motion.div 
                    className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold 
                      bg-gradient-to-br ${testimonial.avatarBg}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {testimonial.author.charAt(0)}
                  </motion.div>
                  <div className="ml-4">
                    <p className={`text-sm font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{testimonial.author}</p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile carousel */}
        <div className="mt-16 lg:hidden relative">
          <motion.div 
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className={`p-8 rounded-2xl border relative backdrop-blur-sm shadow-lg mx-auto max-w-md
                ${theme === 'dark' 
                  ? 'bg-gray-800/60 border-gray-700' 
                  : 'bg-white/80 border-gray-200'
                }
              `}
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <motion.div 
                className={`absolute top-6 left-6 opacity-30 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-300'
                }`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                </svg>
              </motion.div>
              
              <div className="relative z-10">
                <StarRating rating={testimonials[activeTestimonial].rating} />
                
                <p className={`text-lg leading-relaxed mb-6 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>"{testimonials[activeTestimonial].content}"</p>
                
                <div className="flex items-center mt-8 pt-6 border-t border-dashed">
                  <motion.div 
                    className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold 
                      bg-gradient-to-br ${testimonials[activeTestimonial].avatarBg}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  >
                    {testimonials[activeTestimonial].author.charAt(0)}
                  </motion.div>
                  <div className="ml-4">
                    <p className={`text-sm font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{testimonials[activeTestimonial].author}</p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation arrows */}
            <div className="flex justify-center mt-8 gap-4">
              <motion.button
                onClick={handlePrev}
                className={`p-2 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700' 
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                } shadow-md`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      activeTestimonial === index
                        ? theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                        : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                    }`}
                    whileHover={{ scale: 1.5 }}
                    onClick={() => setActiveTestimonial(index)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
              
                            <motion.button
                onClick={handleNext}
                className={`p-2 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700' 
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                } shadow-md`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className={`mt-16 p-8 rounded-2xl border shadow-lg ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-800/30' 
              : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100'
          } max-w-4xl mx-auto`}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ 
            delay: 0.8,
            type: "spring",
            stiffness: 50
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className={`text-xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Ready to turn your unused licenses into cash?</h3>
              <p className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Join thousands of satisfied customers who have recovered value from their software investments.
              </p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="#contact" 
                className={`inline-block px-6 py-3 rounded-full font-medium
                  text-white bg-gradient-to-r from-blue-600 to-indigo-600 
                  hover:from-blue-500 hover:to-indigo-500 shadow-md
                  transition-all duration-300`}
              >
                Get Your Free Valuation
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <p className={`text-sm uppercase font-semibold tracking-wider mb-6 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Trusted by companies worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {['Microsoft', 'Adobe', 'Oracle', 'IBM', 'SAP'].map((company, index) => (
              <motion.div 
                key={company}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 0.7, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1 + (index * 0.1) }}
                whileHover={{ opacity: 1 }}
                className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}