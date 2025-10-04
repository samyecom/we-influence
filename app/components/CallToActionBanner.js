'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function CallToActionBanner() {
  const headingRef = useRef(null);
  const learnTextRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const splitTextInstances = useRef([]);

  useEffect(() => {
    const heading = headingRef.current;
    const learnText = learnTextRef.current;
    const desc = descRef.current;
    const button = buttonRef.current;

    const elements = [heading, learnText, desc, button].filter(Boolean);
    
    elements.forEach((element, index) => {
      if (element) {
        const splitText = new SplitText(element, {
          type: 'words,chars',
          wordsClass: 'split-word',
          charsClass: 'split-char'
        });
        
        splitTextInstances.current.push(splitText);
        
        gsap.set(splitText.chars, {
          opacity: 0,
          y: 50,
          rotationX: -90
        });
        
        ScrollTrigger.create({
          trigger: element,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(splitText.chars, {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.8,
              stagger: 0.03,
              ease: 'back.out(1.7)',
              delay: index * 0.3
            });
          }
        });
      }
    });

    return () => {
      splitTextInstances.current.forEach(instance => {
        if (instance && instance.revert) {
          instance.revert();
        }
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/cta-banner-bg.jpg"
          alt="Students having fun and learning"
          fill
          className="object-cover"
          priority
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div className="absolute inset-0 bg-black/40" style={{ display: 'none' }}></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 text-center space-y-8 sm:space-y-12">
        <div className="space-y-4">
          <h2 ref={headingRef} className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-none tracking-tight">
            HAVE FUN AND
          </h2>
          <div className="inline-block">
            <span ref={learnTextRef} className="text-5xl sm:text-6xl lg:text-8xl font-black text-black px-6 sm:px-8 lg:px-12 py-3 sm:py-4 transform -skew-x-12 inline-block shadow-2xl" style={{ backgroundColor: '#fed775' }}>
              LEARN!
            </span>
          </div>
        </div>

        <p ref={descRef} className="text-lg sm:text-xl lg:text-2xl text-white leading-relaxed max-w-3xl mx-auto">
          Being a Student Marketeer will not only push you professionally, but will also 
          give you the chance to have the time of your life! This job offers the 
          opportunity to maximize your strengths and develop important Sales and 
          Marketing skills while building relationships for your future career.
        </p>

        <div className="pt-6">
          <button ref={buttonRef} className="group relative inline-flex items-center justify-center px-12 sm:px-16 py-4 sm:py-5 text-black font-black text-lg sm:text-xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50" style={{ backgroundColor: '#fed775' }}>
            <span className="relative z-10">LET&apos;S GO!</span>
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#f5d567' }}></div>
          </button>
        </div>
      </div>
    </section>
  );
}
