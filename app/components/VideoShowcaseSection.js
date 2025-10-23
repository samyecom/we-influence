'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const videoCards = [
  {
    id: 1,
    title: 'Course Highlight',
    thumbnail: '/images/Course.png',
    videoUrl: '/video/Video1.mp4',
    offer: 'Start Learning Today',
    gradient: 'from-blue-600 to-purple-600'
  },
  {
    id: 2,
    title: 'Community Vibes',
    thumbnail: '/images/Community.png',
    videoUrl: '/video/Video2.mp4',
    offer: 'Join The Network',
    gradient: 'from-pink-500 to-orange-500'
  },
  {
    id: 3,
    title: 'Coaching Success',
    thumbnail: '/images/Coaching.png',
    videoUrl: '/video/Video3.mp4',
    offer: 'Book Your Session',
    gradient: 'from-emerald-500 to-cyan-500'
  },
  {
    id: 4,
    title: 'Student Stories',
    thumbnail: '/images/Course.png',
    videoUrl: '/video/Video4.mp4',
    offer: 'Hear From Alumni',
    gradient: 'from-yellow-500 to-red-500'
  },
  {
    id: 5,
    title: 'Behind The Scenes',
    thumbnail: '/images/Community.png',
    videoUrl: '/video/Video5.mp4',
    offer: 'See How We Work',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 6,
    title: 'Results & Impact',
    thumbnail: '/images/Coaching.png',
    videoUrl: '/video/Video6.mp4',
    offer: 'View Success Stats',
    gradient: 'from-green-500 to-teal-500'
  }
];

export default function VideoShowcaseSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const counterRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const cardsRef = useRef([]);
  const cursorRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [counter, setCounter] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const marqueeTween = useRef(null);
  const splitTextInstance = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const counter = counterRef.current;
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
            y: 30,
            stagger: 0.02,
            duration: 0.8,
            ease: 'back.out(1.7)',
          })
          .call(() => {
            gsap.to({}, {
              duration: 2,
              ease: 'power2.out',
              onUpdate: function() {
                const progress = this.progress();
                const currentValue = Math.round(progress * 60);
                setCounter(currentValue);
              }
            });
          });
      }
    });

    // Separate counter animation
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        setTimeout(() => {
          gsap.to({}, {
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              const progress = this.progress();
              const currentValue = Math.round(progress * 60);
              setCounter(currentValue);
            }
          });
        }, 1000);
      }
    });

    const trackWidth = marqueeTrack.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    marqueeTween.current = gsap.to(marqueeTrack, {
      x: -(trackWidth - viewportWidth),
      duration: 30,
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
        scale: 1.02,
        rotationY: 5,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    const video = card?.querySelector('video');
    if (video) {
      video.play();
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

    const video = card?.querySelector('video');
    if (video) {
      video.pause();
    }
  };

  const handleCardClick = (card) => {
    console.log('Card clicked:', card);
    setSelectedVideo(card);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const handleWatchNowClick = (card) => {
    console.log('Watch Now clicked:', card);
    setSelectedVideo(card);
  };

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden" style={{ backgroundColor: '#fed775' }}>
      <div
        ref={cursorRef}
        className={`flair fixed w-32 h-32 bg-black rounded-full pointer-events-none z-50 flex items-center justify-center transition-opacity duration-300 ${
          hoveredCard !== null ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-white font-black text-sm text-center">
          VIEW<br/>OFFER
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <h2
          ref={headerRef}
          className="split-header text-5xl sm:text-6xl lg:text-8xl font-black text-white text-center leading-tight"
        >
          We <span style={{ color: '#000000' }}>Influence</span> in <span style={{ color: '#000000' }}><span ref={counterRef}>{counter}</span> Seconds</span>
        </h2>
      </div>

      <div className="relative overflow-visible">
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
              onClick={() => handleCardClick(card)}
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
                  preload="metadata"
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
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWatchNowClick(card);
                        }}
                        className="w-full py-3 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors duration-300"
                      >
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

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh'
          }}
        >
          <div className="relative w-full max-w-sm">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors duration-200 z-[10000]"
            >
              ✕
            </button>
            <div className="relative w-full bg-black rounded-lg overflow-hidden">
              <video
                className="w-full"
                controls
                autoPlay
                muted
                playsInline
              >
                <source src={selectedVideo.videoUrl} type="video/mp4" />
              </video>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h3>
              <p className="text-white/80 text-sm">{selectedVideo.offer}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
