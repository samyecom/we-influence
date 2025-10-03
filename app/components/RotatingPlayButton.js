'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function RotatingPlayButton({ videoSrc = "/video/hero.mp4" }) {
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const playIconRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tl = useRef(null);

  useEffect(() => {
    if (!buttonRef.current || !textRef.current || !playIconRef.current) return;

    const button = buttonRef.current;
    const text = textRef.current;
    const playIcon = playIconRef.current;

    tl.current = gsap.timeline({ repeat: -1 });

    tl.current.to(text, {
      rotation: 360,
      duration: 10,
      ease: "none"
    });

    gsap.set(button, { scale: 1 });

    const pulseAnimation = gsap.to(button, {
      scale: 1.05,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    const hoverAnimation = () => {
      gsap.to(button, {
        scale: 1.15,
        duration: 0.3,
        ease: "power2.out"
      });
      pulseAnimation.pause();
    };

    const hoverOutAnimation = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      pulseAnimation.resume();
    };

    button.addEventListener('mouseenter', hoverAnimation);
    button.addEventListener('mouseleave', hoverOutAnimation);

    return () => {
      button.removeEventListener('mouseenter', hoverAnimation);
      button.removeEventListener('mouseleave', hoverOutAnimation);
      if (tl.current) {
        tl.current.kill();
      }
      pulseAnimation.kill();
    };
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="relative w-24 h-24 bg-white/90 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer group border-2 border-white/50 backdrop-blur-sm ring-2 ring-white/30 hover:ring-white/60"
        aria-label="Play Video"
      >
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <svg
            ref={playIconRef}
            className="w-8 h-8 text-gray-900 drop-shadow-sm"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <svg
            ref={textRef}
            className="w-full h-full"
            viewBox="0 0 100 100"
          >
            <defs>
              <path
                id="circle"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              />
            </defs>
            <text className="fill-gray-800 text-[9px] font-black uppercase tracking-wider drop-shadow-md">
              <textPath href="#circle" startOffset="0">
                PLAY VIDEO • PLAY VIDEO • PLAY VIDEO • PLAY VIDEO • PLAY VIDEO • PLAY VIDEO • PLAY VIDEO • PLAY VIDEO • PLAY VIDEO •
              </textPath>
            </text>
          </svg>
        </div>
      </button>

      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-300"
          onClick={handleBackdropClick}
        >
          <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"></div>
          <div className="relative w-full max-w-5xl mx-4 z-10 animate-in zoom-in-95 duration-300">
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 text-white text-4xl font-bold hover:text-gray-300 transition-colors duration-200 z-20 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm"
              aria-label="Close Modal"
            >
              ✕
            </button>
            
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm">
              <video
                src={videoSrc}
                controls
                autoPlay
                className="w-full h-full object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
