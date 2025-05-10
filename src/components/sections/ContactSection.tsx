"use client";
import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Define interfaces for our form data and errors
interface FormData {
  name: string;
  email: string;
  company: string;
  licenseType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  licenseType?: string;
}

export default function ContactSection() {
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

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.licenseType) newErrors.licenseType = 'Please select a license type';
    
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field if it exists
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        licenseType: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const formVariants = {
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

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    },
    focus: { 
      scale: 1.01,
      borderColor: theme === 'dark' ? '#3b82f6' : '#2563eb',
      boxShadow: theme === 'dark' 
        ? '0 0 0 3px rgba(59, 130, 246, 0.3)' 
        : '0 0 0 3px rgba(37, 99, 235, 0.3)',
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12,
        delay: 0.4
      }
    },
    hover: { 
      scale: 1.03,
      boxShadow: theme === 'dark' 
        ? '0 5px 15px rgba(0, 0, 0, 0.3)' 
        : '0 5px 15px rgba(0, 0, 0, 0.1)',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.97 
    },
    loading: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
      }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { 
        duration: 0.3
      }
    }
  };

  const formFields = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Your name',
      value: formData.name,
      error: errors.name,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'you@company.com',
      value: formData.email,
      error: errors.email,
    },
    {
      id: 'company',
      label: 'Company',
      type: 'text',
      placeholder: 'Your company name',
      value: formData.company,
      error: errors.company,
    }
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`py-24 relative overflow-hidden ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
          : 'bg-gradient-to-b from-white to-gray-100 text-gray-900'
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className={`absolute -bottom-20 right-0 w-96 h-96 rounded-full opacity-10 ${
            theme === 'dark' ? 'bg-blue-700' : 'bg-blue-300'
          }`}
          animate={{
            y: [10, -10, 10],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className={`absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10 ${
            theme === 'dark' ? 'bg-purple-700' : 'bg-purple-300'
          }`}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.1, 0.15, 0.1]
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
              Get Your License Valuation
            </h2>
          </motion.div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-2 mb-6 rounded-full"></div>
          <p className={`max-w-2xl text-xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Fill out the form below and we'll get back to you with a competitive valuation within 24 hours.
          </p>
        </motion.div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact info side panel */}
            <motion.div 
              className={`lg:col-span-2 p-8 rounded-2xl ${
                theme === 'dark' 
                  ? 'bg-gray-800/70 border border-gray-700' 
                  : 'bg-white/80 shadow-xl border border-gray-200'
              }`}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ 
                type: "spring", 
                stiffness: 60, 
                damping: 12 
              }}
            >
              <h3 className={`text-xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 p-2 rounded-full ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'
                  }`}>
                    <svg 
                      className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                    }`}>Phone</p>
                    <p className={`mt-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={`flex-shrink-0 p-2 rounded-full ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'
                  }`}>
                    <svg 
                      className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                    }`}>Email</p>
                    <p className={`mt-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>valuation@softsell.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={`flex-shrink-0 p-2 rounded-full ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'
                  }`}>
                    <svg 
                      className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                    }`}>Location</p>
                    <p className={`mt-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>San Francisco, CA</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-dashed">
                <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                  theme === 'dark' ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'
                }`}>
                  Follow us
                </h4>
                <div className="flex space-x-4">
                  {['twitter', 'linkedin', 'facebook'].map((platform) => (
                    <motion.a
                      key={platform}
                      href={`#${platform}`}
                      className={`p-2 rounded-full ${
                        theme === 'dark' 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      } transition-colors duration-200`}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="sr-only">{platform}</span>
                      <svg 
                        className={`h-5 w-5 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`} 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        {platform === 'twitter' && (
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        )}
                        {platform === 'linkedin' && (
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        )}
                                                {platform === 'facebook' && (
                          <path d="M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        )}
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Form container */}
            <motion.div 
              className="lg:col-span-3"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {submitSuccess && (
                <motion.div 
                  className={`p-6 rounded-xl mb-8 ${
                    theme === 'dark' 
                      ? 'bg-green-900/30 border border-green-800' 
                      : 'bg-green-50 border border-green-200'
                  } flex items-start`}
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className={`flex-shrink-0 p-1.5 rounded-full ${
                    theme === 'dark' ? 'bg-green-800' : 'bg-green-100'
                  }`}>
                    <svg 
                      className={`h-5 w-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-medium ${
                      theme === 'dark' ? 'text-green-400' : 'text-green-800'
                    }`}>
                      Thank you for your submission!
                    </h3>
                    <p className={`mt-1 text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Our team will review your information and get back to you with a valuation within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}

              <motion.form 
                onSubmit={handleSubmit} 
                className={`p-8 rounded-2xl shadow-xl ${
                  theme === 'dark' 
                    ? 'bg-gray-800/70 border border-gray-700 backdrop-blur-sm' 
                    : 'bg-white/90 border border-gray-200 backdrop-blur-sm'
                }`}
                variants={formVariants}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {formFields.map((field, index) => (
                    <motion.div 
                      key={field.id} 
                      className={`${field.id === 'email' ? 'sm:col-span-2' : ''}`}
                      variants={inputVariants}
                      animate={focusedField === field.id ? "focus" : "visible"}
                      custom={index}
                    >
                      <label 
                        htmlFor={field.id} 
                        className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        {field.label}
                      </label>
                      <motion.input
                        type={field.type}
                        name={field.id}
                        id={field.id}
                        value={field.value}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        onFocus={() => handleFocus(field.id)}
                        onBlur={handleBlur}
                        className={`py-3 px-4 block w-full shadow-sm rounded-lg focus:outline-none ${
                          field.error 
                            ? `border-red-500 ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'}`
                            : theme === 'dark' 
                              ? 'border-gray-600 bg-gray-700/80 text-white focus:border-blue-500' 
                              : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        }`}
                      />
                      {field.error && (
                        <motion.p 
                          className="mt-2 text-sm text-red-500"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          {field.error}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}

                  <motion.div 
                    className="sm:col-span-2" 
                    variants={inputVariants}
                    animate={focusedField === 'licenseType' ? "focus" : "visible"}
                  >
                    <label 
                      htmlFor="licenseType" 
                      className={`block text-sm font-medium mb-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      License Type
                    </label>
                    <motion.select
                      id="licenseType"
                      name="licenseType"
                      value={formData.licenseType}
                      onChange={handleChange}
                      onFocus={() => handleFocus('licenseType')}
                      onBlur={handleBlur}
                      className={`py-3 px-4 block w-full shadow-sm rounded-lg focus:outline-none ${
                        errors.licenseType
                          ? `border-red-500 ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'}`
                          : theme === 'dark' 
                            ? 'border-gray-600 bg-gray-700/80 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                      }`}
                    >
                      <option value="">Select License Type</option>
                      <option value="enterprise">Enterprise Software</option>
                      <option value="saas">SaaS Subscription</option>
                      <option value="desktop">Desktop Application</option>
                      <option value="server">Server License</option>
                      <option value="other">Other</option>
                    </motion.select>
                    {errors.licenseType && (
                      <motion.p 
                        className="mt-2 text-sm text-red-500"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {errors.licenseType}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div 
                    className="sm:col-span-2" 
                    variants={inputVariants}
                    animate={focusedField === 'message' ? "focus" : "visible"}
                  >
                    <label 
                      htmlFor="message" 
                      className={`block text-sm font-medium mb-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Additional Details
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      className={`py-3 px-4 block w-full shadow-sm rounded-lg focus:outline-none ${
                        theme === 'dark' 
                          ? 'border-gray-600 bg-gray-700/80 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                      }`}
                      placeholder="Please provide any additional information about your licenses"
                    />
                  </motion.div>
                </div>
                
                <motion.div 
                  className="mt-8"
                  variants={buttonVariants}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-6 py-3.5 rounded-xl shadow-lg text-base font-medium text-white 
                      ${isSubmitting 
                        ? 'bg-blue-500' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
                      } focus:outline-none transition-all duration-300`}
                    whileHover={!isSubmitting ? "hover" : undefined}
                    whileTap={!isSubmitting ? "tap" : undefined}
                    animate={isSubmitting ? "loading" : "visible"}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Get Your Free Valuation'
                    )}
                  </motion.button>
                </motion.div>
                
                <motion.p 
                  className={`mt-4 text-center text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  By submitting this form, you agree to our 
                  <a href="#" className={`${
                    theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                  } mx-1`}>Privacy Policy</a> 
                  and 
                  <a href="#" className={`${
                    theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                  } ml-1`}>Terms of Service</a>.
                </motion.p>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}