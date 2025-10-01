'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const videoCards = [
  {
    id: 1,
    title: 'Course Highlight',
    thumbnail: '/videos/course-preview.jpg',
    videoUrl: '/videos/course.mp4',
    offer: 'Start Learning Today',
    gradient: 'from-blue-600 to-purple-600'
  },
  {
    id: 2,
    title: 'Community Vibes',
    thumbnail: '/videos/community-preview.jpg',
    videoUrl: '/videos/community.mp4',
    offer: 'Join The Network',
    gradient: 'from-pink-500 to-orange-500'
  },
  {
    id: 3,
    title: 'Coaching Success',
    thumbnail: '/videos/coaching-preview.jpg',
    videoUrl: '/videos/coaching.mp4',
    offer: 'Book Your Session',
    gradient: 'from-emerald-500 to-cyan-500'
  },
  {
    id: 4,
    title: 'Student Stories',
    thumbnail: '/videos/stories-preview.jpg',
    videoUrl: '/videos/stories.mp4',
    offer: 'Hear From Alumni',
    gradient: 'from-yellow-500 to-red-500'
  },
  {
    id: 5,
    title: 'Behind The Scenes',
    thumbnail: '/videos/bts-preview.jpg',
    videoUrl: '/videos/bts.mp4',
    offer: 'See How We Work',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 6,
    title: 'Results & Impact',
    thumbnail: '/videos/results-preview.jpg',
    videoUrl: '/videos/results.mp4',
    offer: 'View Success Stats',
    gradient: 'from-green-500 to-teal-500'
  }
];

export default function VideoShowcaseSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const cardsRef = useRef([]);
  const cursorRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const marqueeTween = useRef(null);
  const splitTextInstance = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const section = sectionRef.current;
    const marqueeTrack = marqueeTrackRef.current;
    const cursor = cursorRef.current;

    if (!header || !section || !marqueeTrack || !cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    xTo.current = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
    yTo.current = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e) => {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    gsap.set(header, { opacity: 0 });

    splitTextInstance.current = new SplitText(header, { 
      type: 'words,chars',
      wordsClass: 'split-word',
      charsClass: 'split-char'
    });

    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        tl.set(header, { opacity: 1 })
          .from(splitTextInstance.current.chars, {
            opacity: 0,
            scale: 0.8,
            rotation: 5,
            stagger: 0.02,
            duration: 0.5,
            ease: 'back.out(1.7)',
          });
      }
    });

    const trackWidth = marqueeTrack.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    marqueeTween.current = gsap.to(marqueeTrack, {
      x: -(trackWidth - viewportWidth),
      duration: 60,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (splitTextInstance.current) splitTextInstance.current.revert();
      if (marqueeTween.current) marqueeTween.current.kill();
    };
  }, []);

  const handleCardEnter = (index) => {
    setHoveredCard(index);
    if (marqueeTween.current) {
      marqueeTween.current.pause();
    }

    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        scale: 1.05,
        rotationY: 5,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleCardLeave = (index) => {
    setHoveredCard(null);
    if (marqueeTween.current) {
      marqueeTween.current.play();
    }

    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative bg-black py-20 overflow-hidden">
      <div
        ref={cursorRef}
        className={`flair fixed w-32 h-32 bg-white rounded-full pointer-events-none z-50 mix-blend-difference flex items-center justify-center transition-opacity duration-300 ${
          hoveredCard !== null ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-black font-black text-sm text-center">
          VIEW<br/>OFFER
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <h2
          ref={headerRef}
          className="split-header text-5xl sm:text-6xl lg:text-8xl font-black text-white text-center leading-tight"
        >
          We Influence in 60 Seconds
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div 
          ref={marqueeTrackRef}
          className="video-marquee-track flex gap-8"
          style={{ width: 'max-content' }}
        >
          {[...videoCards, ...videoCards].map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={() => handleCardEnter(index)}
              onMouseLeave={() => handleCardLeave(index)}
              className="video-card flex-shrink-0 relative cursor-pointer"
              style={{
                width: '300px',
                height: '533px',
              }}
            >
              <div className={`relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br ${card.gradient} shadow-2xl`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <video
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  loop
                  muted
                  playsInline
                  poster={card.thumbnail}
                >
                  <source src={card.videoUrl} type="video/mp4" />
                </video>

                <div className="absolute inset-0 flex flex-col justify-end p-6 space-y-4">
                  <h3 className="text-2xl font-black text-white">
                    {card.title}
                  </h3>
                  
                  {hoveredCard === index && (
                    <div className="space-y-3">
                      <div className="h-1 w-full bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-white rounded-full"></div>
                      </div>
                      <p className="text-white font-bold text-lg">
                        {card.offer}
                      </p>
                      <button className="w-full py-3 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors duration-300">
                        Watch Now
                      </button>
                    </div>
                  )}
                </div>

                {hoveredCard === index && (
                  <div className="absolute inset-0 border-4 border-white rounded-3xl"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16 text-center">
        <p className="text-xl text-white/60">
          Swipe through our stories • Hover to pause • Click to explore
        </p>
      </div>
    </section>
  );
}
