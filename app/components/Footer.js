'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navigationLinks = [
  {
    title: 'Learn',
    links: [
      { name: 'Courses', href: '/courses' },
      { name: 'Community', href: '/community' },
      { name: 'Coaching', href: '/coaching' },
      { name: 'Resources', href: '/resources' }
    ]
  },
  {
    title: 'Discover',
    links: [
      { name: 'Faculty', href: '/faculty' },
      { name: 'About Us', href: '/about' },
      { name: 'Success Stories', href: '/stories' },
      { name: 'Events', href: '/events' }
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Careers', href: '/careers' }
    ]
  }
];

const socialLinks = [
  { name: 'Instagram', href: '#', icon: 'IG' },
  { name: 'Twitter', href: '#', icon: 'TW' },
  { name: 'LinkedIn', href: '#', icon: 'IN' },
  { name: 'YouTube', href: '#', icon: 'YT' }
];

export default function Footer() {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const submitButtonRef = useRef(null);
  const [email, setEmail] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    const logo = logoRef.current;
    const leftColumn = leftColumnRef.current;
    const rightColumn = rightColumnRef.current;

    if (!footer || !logo || !leftColumn || !rightColumn) return;

    gsap.set(footer, { yPercent: 10, scale: 0.97, opacity: 0 });
    gsap.set([leftColumn, rightColumn], { opacity: 0, y: 20 });

    ScrollTrigger.create({
      trigger: footer,
      start: 'top bottom',
      end: 'top 60%',
      scrub: 1,
      onEnter: () => {
        const tl = gsap.timeline();
        
        tl.to(footer, {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out'
        })
        .to([leftColumn, rightColumn], {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.5');
      }
    });

    ScrollTrigger.create({
      trigger: footer,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(logo, {
          y: progress * 50,
          rotationZ: progress * 10,
          ease: 'none'
        });
      }
    });

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const button = submitButtonRef.current;
    
    gsap.timeline()
      .to(button, {
        x: 10,
        duration: 0.1,
        ease: 'power2.out'
      })
      .to(button, {
        x: 0,
        duration: 0.2,
        ease: 'elastic.out(1, 0.3)'
      });

    console.log('Email submitted:', email);
    setEmail('');
  };

  const handleSubmitHover = () => {
    setIsSubmitHovered(true);
    const button = submitButtonRef.current;
    gsap.to(button, {
      scale: 1.1,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
  };

  const handleSubmitLeave = () => {
    setIsSubmitHovered(false);
    const button = submitButtonRef.current;
    gsap.to(button, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <>
      {hoveredLink && (
        <div
          className="fixed w-12 h-12 rounded-full border-2 border-yellow-400 pointer-events-none z-50 transition-transform duration-200"
          style={{
            left: cursorPos.x - 24,
            top: cursorPos.y - 24,
            transform: 'scale(1.5)',
          }}
        />
      )}

      {isSubmitHovered && (
        <div
          className="fixed w-16 h-16 rounded-full border-4 border-yellow-400 pointer-events-none z-50 animate-pulse"
          style={{
            left: cursorPos.x - 32,
            top: cursorPos.y - 32,
            transform: 'scale(0.8)',
          }}
        />
      )}

      <footer
        ref={footerRef}
        id="Academy-Final-Footer"
        className="relative text-black overflow-hidden"
        style={{ backgroundColor: '#fed775' }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            
            <div ref={leftColumnRef} className="space-y-8">
              <h3 className="text-2xl font-bold text-black/60 mb-6">Navigate</h3>
              <div className="grid grid-cols-3 gap-8">
                {navigationLinks.map((group, groupIndex) => (
                  <div key={groupIndex} className="space-y-4">
                    <h4 className="text-sm font-bold text-black/80 uppercase tracking-wider">
                      {group.title}
                    </h4>
                    <ul className="space-y-3">
                      {group.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            onMouseEnter={() => setHoveredLink(`${groupIndex}-${linkIndex}`)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className="text-black/70 hover:text-black transition-colors duration-200 text-sm"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div ref={logoRef} className="flex items-center justify-center">
              <div className="bg-black rounded-[20px] p-8">
                <img 
                  src="/influence-logo.png" 
                  alt="We Influence Academy Logo" 
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>

            <div ref={rightColumnRef} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-black">
                  Unlock Your Exclusive<br />Influence Roadmap
                </h3>
                <p className="text-black/60">
                  Get Early Access & Start Your Journey
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-6 py-4 bg-black/10 border border-black/20 rounded-full text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                  />
                  <button
                    ref={submitButtonRef}
                    type="submit"
                    onMouseEnter={handleSubmitHover}
                    onMouseLeave={handleSubmitLeave}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black rounded-full flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </form>

              <div className="pt-8 border-t border-black/10">
                <p className="text-black/40 text-sm mb-4">Follow Us</p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      onMouseEnter={() => setHoveredLink(`social-${index}`)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:border-black hover:bg-black/10 transition-all duration-300"
                    >
                      <span className="text-xs font-bold text-black">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-black/40 text-sm">
              © 2025 We Influence Academy. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-black/40 hover:text-black text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-black/40 hover:text-black text-sm transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
