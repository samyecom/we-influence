'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const offerings = [
  {
    id: 1,
    title: 'Course',
    name: 'Influence Academy',
    coreBenefit: 'Structured learning path designed to transform beginners into confident creators.',
    gradient: 'from-blue-600 via-purple-600 to-indigo-600',
    hoverContent: {
      title: 'Key Modules',
      items: [
        'Foundation Fundamentals',
        'Content Creation Mastery',
        'Audience Building Strategies',
        'Monetization Blueprint',
        'Advanced Analytics'
      ],
      duration: '12 Weeks • Self-Paced'
    }
  },
  {
    id: 2,
    title: 'Community',
    name: 'Mastermind Network',
    coreBenefit: 'Network access with like-minded creators and industry leaders.',
    gradient: 'from-pink-500 via-rose-500 to-orange-500',
    hoverContent: {
      title: 'Access & Benefits',
      items: [
        'Private Members Forum',
        'Weekly Q&A Calls',
        'Resource Library',
        'Networking Events',
        'Exclusive Workshops'
      ],
      duration: 'Lifetime Access'
    }
  },
  {
    id: 3,
    title: 'Coaching',
    name: '1:1 Mentorship',
    coreBenefit: 'Personalized roadmap with dedicated mentor guidance.',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    hoverContent: {
      title: '3-Step Process',
      items: [
        '1. Discovery - Assess your goals and current state',
        '2. Strategy - Build your custom action plan',
        '3. Execution - Weekly accountability & guidance'
      ],
      duration: '3-6 Months • 1:1 Sessions'
    }
  }
];

export default function OfferingsSection() {
  const containerRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const hoverTimelines = useRef({});
  const mobileTitleRef = useRef(null);
  const mobileDescRef = useRef(null);
  const splitTextInstances = useRef([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const scrollTrack = scrollTrackRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;
    const mobileTitle = mobileTitleRef.current;
    const mobileDesc = mobileDescRef.current;

    if (isMobile) {
      const mobileElements = [mobileTitle, mobileDesc].filter(Boolean);
      
      mobileElements.forEach((element, index) => {
        if (element) {
          const splitText = new SplitText(element, {
            type: 'words,chars',
            wordsClass: 'split-word',
            charsClass: 'split-char'
          });
          
          splitTextInstances.current.push(splitText);
          
          gsap.set(splitText.chars, {
            opacity: 0,
            y: 30,
            scale: 0.8
          });
          
          ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            onEnter: () => {
              gsap.to(splitText.chars, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.02,
                ease: 'back.out(1.7)',
                delay: index * 0.2
              });
            }
          });
        }
      });
      return;
    }

    if (!container || !scrollTrack || !title) return;

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const cardWidth = windowHeight * 0.6;
    const titleWidth = windowHeight;
    const gap = windowHeight * 0.1;
    const endPadding = windowWidth * 0.5;
    
    const totalTrackWidth = titleWidth + (cardWidth + gap) * 3 + endPadding;
    
    scrollTrack.style.width = `${totalTrackWidth}px`;

    const maxScroll = totalTrackWidth - windowWidth;

    const titleSplitText = new SplitText(title, {
      type: 'words,chars',
      wordsClass: 'split-word',
      charsClass: 'split-char'
    });
    
    splitTextInstances.current.push(titleSplitText);
    
    gsap.set(titleSplitText.chars, {
      opacity: 0,
      y: 50,
      rotationX: -90
    });

    ScrollTrigger.create({
      trigger: title,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(titleSplitText.chars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'back.out(1.7)'
        });
      }
    });

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${windowHeight * 4}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const xValue = -progress * maxScroll;
        gsap.set(scrollTrack, { x: xValue });
      }
    });

    cards.forEach((card, index) => {
      if (!card) return;

      const mainContent = card.querySelector('.main-card-content');
      const overlay = card.querySelector('.card-detail-overlay');

      if (!mainContent || !overlay) return;

      const hoverTl = gsap.timeline({ paused: true });
      
      hoverTl
        .to(mainContent, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        }, 0)
        .fromTo(overlay, 
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: 0.3,
            ease: 'power2.out'
          }, 0
        );

      hoverTimelines.current[index] = hoverTl;
    });

    return () => {
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      Object.values(hoverTimelines.current).forEach(tl => tl.kill());
      splitTextInstances.current.forEach(instance => {
        if (instance && instance.revert) {
          instance.revert();
        }
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  const handleCardEnter = (index) => {
    if (isMobile) return;
    hoverTimelines.current[index]?.play();
  };

  const handleCardLeave = (index) => {
    if (isMobile) return;
    hoverTimelines.current[index]?.reverse();
  };

  if (isMobile) {
    return (
      <div className="bg-black py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h2 ref={mobileTitleRef} className="text-5xl font-black text-white">Our Offerings</h2>
            <p ref={mobileDescRef} className="text-xl text-white/60">Course. Community. Coaching.</p>
          </div>
          
          {offerings.map((offering) => (
            <div key={offering.id} className={`rounded-3xl overflow-hidden bg-gradient-to-br ${offering.gradient} p-8 space-y-6`}>
              <span className="text-sm font-bold text-white/60 tracking-widest uppercase">
                0{offering.id}
              </span>
              <h3 className="text-5xl font-black text-white">{offering.title}</h3>
              <p className="text-2xl font-bold text-white">
                {offering.name}
              </p>
              <p className="text-lg text-white/90">{offering.coreBenefit}</p>
              
              <div className="space-y-4 pt-4 border-t border-white/20">
                <p className="text-white font-bold text-xl">{offering.hoverContent.title}</p>
                {offering.hoverContent.items.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0"></div>
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
                <p className="text-white/60 text-sm pt-2">{offering.hoverContent.duration}</p>
              </div>

              <button className="w-full mt-4 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-colors duration-300">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      id="Offerings-Container" 
      className="relative bg-black h-screen overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center">
        <div ref={scrollTrackRef} className="flex items-center gap-[10vh]">
          
          <div 
            ref={titleRef}
            className="flex-shrink-0 flex flex-col items-center justify-center text-center ml-[10vh]"
            style={{ width: '100vh' }}
          >
            <h2 className="text-8xl font-black text-white leading-none mb-8">
              Our Offerings
            </h2>
            <div className="space-y-4">
              <p className="text-6xl font-black text-white drop-shadow-lg">
                Course.
              </p>
              <p className="text-6xl font-black text-white drop-shadow-lg">
                Community.
              </p>
              <p className="text-6xl font-black text-white drop-shadow-lg">
                Coaching.
              </p>
            </div>
          </div>

          {offerings.map((offering, index) => (
            <div
              key={offering.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={() => handleCardEnter(index)}
              onMouseLeave={() => handleCardLeave(index)}
              className="offering-card flex-shrink-0 relative cursor-pointer"
              style={{ width: '60vh', height: '80vh' }}
            >
              <div className={`relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br ${offering.gradient} p-12 flex flex-col justify-between`}>
                
                <div className="main-card-content absolute inset-0 p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <span className="text-sm font-bold text-white/60 tracking-widest uppercase">
                        0{offering.id}
                      </span>
                      <h3 className="text-7xl font-black text-white leading-none">
                        {offering.title}
                      </h3>
                      <div className="h-2 w-32 rounded-full bg-white/30"></div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-3xl font-bold text-white">
                        {offering.name}
                      </p>
                      <p className="text-lg text-white/90 leading-relaxed">
                        {offering.coreBenefit}
                      </p>
                    </div>
                  </div>

                  <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-colors duration-300">
                    Explore {offering.title}
                  </button>
                </div>

                <div className="card-detail-overlay absolute inset-0 p-12 flex flex-col justify-center opacity-0 pointer-events-none">
                  <div className="space-y-6">
                    <h4 className="text-4xl font-bold text-white border-b-2 border-white/30 pb-4">
                      {offering.hoverContent.title}
                    </h4>
                    
                    <div className="space-y-4">
                      {offering.hoverContent.items.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-4">
                          <div className="w-3 h-3 rounded-full bg-white mt-2 flex-shrink-0"></div>
                          <span className="text-xl text-white font-medium">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/30">
                      <p className="text-white/80 text-lg font-semibold">
                        {offering.hoverContent.duration}
                      </p>
                    </div>

                    <button className="w-full px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-colors duration-300 mt-4">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
