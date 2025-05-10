"use client";
import { useEffect, useState } from 'react';

export default function TestimonialsSection() {
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

  const testimonials = [
    {
      id: 1,
      content: "SoftSell helped us recover over $50,000 from unused enterprise licenses. Their process was smooth and the team was incredibly knowledgeable about software licensing regulations.",
      author: "Sarah Johnson",
      role: "CTO",
      company: "TechStream Inc.",
    },
    {
      id: 2,
      content: "After downsizing our team, we had dozens of premium subscriptions going unused. SoftSell's valuation was fair and payment was processed within 36 hours. Highly recommended!",
      author: "Michael Chen",
      role: "IT Director",
      company: "Quantum Solutions",
    },
  ];

  return (
    <section id="testimonials" className={`py-16 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-3xl font-extrabold sm:text-4xl ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Customer Testimonials
          </h2>
          <p className={`mt-4 max-w-2xl text-xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Don't take our word for it—hear what our customers have to say.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className={`p-6 rounded-lg shadow-sm border relative ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div className={`absolute top-6 left-6 -ml-3 -mt-3 opacity-30 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                </svg>
              </div>
              
              <div className="relative z-10">
                <p className={`text-lg leading-relaxed mb-6 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-blue-500 font-bold ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-blue-100'
                  }`}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{testimonial.author}</p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}