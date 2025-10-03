'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function MegaMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const overlayRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      firstFocusableRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const handleTabKey = (e) => {
      if (!isMenuOpen) return;

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableRef.current) {
            lastFocusableRef.current?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableRef.current) {
            firstFocusableRef.current?.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      closeMenu();
    }
  };

  const menuData = [
    {
      title: 'Programs',
      links: [
        { name: 'Digital Marketing', href: '/programs/digital-marketing' },
        { name: 'Web Development', href: '/programs/web-development' },
        { name: 'UI/UX Design', href: '/programs/ui-ux-design' },
        { name: 'Data Science', href: '/programs/data-science' },
        { name: 'Business Strategy', href: '/programs/business-strategy' },
        { name: 'Content Creation', href: '/programs/content-creation' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Templates', href: '/templates' },
        { name: 'Tools', href: '/tools' },
        { name: 'E-books', href: '/ebooks' },
        { name: 'Webinars', href: '/webinars' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Team', href: '/team' },
        { name: 'Careers', href: '/careers' },
        { name: 'Partners', href: '/partners' },
        { name: 'Press', href: '/press' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Documentation', href: '/docs' },
        { name: 'Community', href: '/community' },
        { name: 'Status', href: '/status' },
        { name: 'API', href: '/api' },
        { name: 'Integrations', href: '/integrations' }
      ]
    }
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-transparent">
        <div className="w-full px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <img 
                  src="/influence-logo.png" 
                  alt="We Influence Logo" 
                  className="h-12 w-auto group-hover:scale-105 transition-transform duration-200"
                />
              </Link>
            </div>

            {/* Hamburger Menu */}
            <div className="flex-shrink-0">
              <button
                onClick={toggleMenu}
                className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl text-white hover:text-gray-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                aria-expanded={isMenuOpen}
                aria-controls="mega-menu"
                aria-label="Toggle navigation menu"
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`absolute top-1 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
                    }`}
                  ></span>
                  <span
                    className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  ></span>
                  <span
                    className={`absolute top-4 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega Menu Overlay */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className={`fixed inset-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-500 ease-out ${
          isMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
        }`}
        id="mega-menu"
      >
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center">
              <img 
                src="/influence-logo.png" 
                alt="We Influence Logo" 
                className="h-10 w-auto"
              />
            </div>
            
            <button
              ref={lastFocusableRef}
              onClick={closeMenu}
              className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
              aria-label="Close navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mega Menu Content */}
          <div className="flex-1 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {menuData.map((section, sectionIndex) => (
                  <div
                    key={section.title}
                    className={`space-y-6 transition-all duration-700 ease-out ${
                      isMenuOpen
                        ? 'opacity-100 transform translate-y-0'
                        : 'opacity-0 transform translate-y-8'
                    }`}
                    style={{
                      transitionDelay: isMenuOpen ? `${sectionIndex * 150}ms` : '0ms',
                    }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
                      {section.title}
                    </h3>
                    <nav className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <Link
                          key={link.name}
                          ref={linkIndex === 0 && sectionIndex === 0 ? firstFocusableRef : null}
                          href={link.href}
                          onClick={closeMenu}
                          className={`block text-gray-600 hover:text-gray-900 hover:translate-x-2 transition-all duration-300 group ${
                            isMenuOpen
                              ? 'opacity-100 transform translate-x-0'
                              : 'opacity-0 transform translate-x-4'
                          }`}
                          style={{
                            transitionDelay: isMenuOpen ? `${(sectionIndex * 150) + (linkIndex * 50)}ms` : '0ms',
                          }}
                        >
                          <span className="relative">
                            {link.name}
                            <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-3"></span>
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex justify-center space-x-8">
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
