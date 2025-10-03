'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const professors = [
  {
    id: 1,
    name: '"THE" PROFESSOR',
    title: 'PHDribbles at AnkleBreakerU',
    description: '"The Professor" - legendary instructor at We Influence who once TP-ed an entire neighborhood single-handedly in one night. The Professor teaches students how to one-ply, two-ply, and A-ply themselves in the real world.',
    image: '/images/prof1.png',
    bgColor: 'bg-amber-900'
  },
  {
    id: 2,
    name: '"THE ROOKIE"',
    title: 'Masters at FreshStartU',
    description: '"The Rookie" - rising star instructor at We Influence who brings fresh perspectives and innovative teaching methods. Specializes in helping students break through creative barriers and discover their unique voice.',
    image: '/images/prof2.png',
    bgColor: 'bg-blue-900'
  },
  {
    id: 3,
    name: '"THE VETERAN"',
    title: 'PhD at ExperienceU',
    description: '"The Veteran" - seasoned expert at We Influence with decades of industry experience. Known for transforming complex concepts into actionable strategies that deliver real-world results.',
    image: '/images/prof3.png',
    bgColor: 'bg-purple-900'
  },
];

export default function ProfessorsSection() {
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggerInstance = useRef(null);
  const mainTitleRef = useRef(null);
  const mobileTitleRef = useRef(null);
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
    const section = sectionRef.current;
    const leftColumn = leftColumnRef.current;
    const cardsContainer = cardsContainerRef.current;
    const mainTitle = mainTitleRef.current;
    const mobileTitle = mobileTitleRef.current;

    if (isMobile) {
      if (mobileTitle) {
        const splitText = new SplitText(mobileTitle, {
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
          trigger: mobileTitle,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(splitText.chars, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.02,
              ease: 'back.out(1.7)'
            });
          }
        });
      }
      return;
    }

    if (!section || !leftColumn || !cardsContainer || !mainTitle) return;

    const cards = Array.from(cardsContainer.querySelectorAll('.professor-card'));
    const textContents = Array.from(leftColumn.querySelectorAll('.text-content'));

    const titleSplitText = new SplitText(mainTitle, {
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
      trigger: mainTitle,
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

    cards.forEach((card, index) => {
      gsap.set(card, {
        scale: 1,
        y: index === 0 ? 0 : 100,
        rotation: 0,
        opacity: index === 0 ? 1 : 0,
        zIndex: professors.length - index,
        transformOrigin: 'center center',
      });
    });

    textContents.forEach((content, index) => {
      gsap.set(content, {
        opacity: index === 0 ? 1 : 0,
        y: index === 0 ? 0 : 30,
      });
    });

    scrollTriggerInstance.current = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${window.innerHeight * (professors.length + 0.5)}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalProgress = progress * professors.length;
        const currentIndex = Math.min(
          Math.floor(totalProgress),
          professors.length - 1
        );
        
        setActiveIndex(currentIndex);

        cards.forEach((card, index) => {
          if (index <= currentIndex) {
            const stackPosition = currentIndex - index;
            const scale = 1 - stackPosition * 0.08;
            const yOffset = -stackPosition * 25;
            const rotation = -stackPosition * 5;
            const opacity = 1;
            
            gsap.to(card, {
              scale: scale,
              y: yOffset,
              rotation: rotation,
              opacity: opacity,
              zIndex: professors.length - stackPosition,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          } else {
            gsap.to(card, {
              y: 100,
              opacity: 0,
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        });

        textContents.forEach((content, index) => {
          if (index === currentIndex) {
            gsap.to(content, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          } else {
            gsap.to(content, {
              opacity: 0,
              y: index < currentIndex ? -30 : 30,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        });
      },
    });

    return () => {
      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill();
      }
      splitTextInstances.current.forEach(instance => {
        if (instance && instance.revert) {
          instance.revert();
        }
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="bg-gray-900">
        <div className="bg-amber-900 px-6 py-12 text-center">
          <h2 ref={mobileTitleRef} className="text-4xl sm:text-5xl font-black text-white leading-none mb-4">
            MEET YOUR
          </h2>
          <div className="inline-block">
            <span className="text-4xl sm:text-5xl font-black text-amber-900 bg-yellow-400 px-6 py-3 transform -skew-x-12 inline-block shadow-lg">
              PROFESSORS
            </span>
          </div>
        </div>

        {professors.map((prof, index) => (
          <div key={prof.id} className="mb-0">
            <div className="relative h-[500px] w-full">
              <Image
                src={prof.image}
                alt={`${prof.name}`}
                fill
                className="object-cover"
                priority={index === 0}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.nextElementSibling;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div 
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800" 
                style={{display: 'none'}}
              >
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-white font-medium">{prof.name}</p>
                </div>
              </div>
            </div>

            <div className={`${prof.bgColor} px-6 py-8 space-y-4`}>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {prof.name}
              </h3>
              <p className="text-sm sm:text-base text-yellow-300 font-semibold">
                {prof.title}
              </p>
              <p className="text-base sm:text-lg text-white leading-relaxed">
                {prof.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative min-h-screen">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div 
          ref={leftColumnRef}
          className={`w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 lg:px-16 py-12 lg:py-20 transition-colors duration-500 ${professors[activeIndex].bgColor}`}
        >
          <div className="max-w-2xl w-full">
            <div className="space-y-3 mb-8">
              <h2 ref={mainTitleRef} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-none">
                MEET YOUR
              </h2>
              <div className="inline-block">
                <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-amber-900 bg-yellow-400 px-4 sm:px-6 py-2 sm:py-3 transform -skew-x-12 inline-block shadow-lg">
                  PROFESSORS
                </span>
              </div>
            </div>

            <div className="relative h-64 sm:h-72">
              {professors.map((prof, index) => (
                <div
                  key={prof.id}
                  className="text-content absolute inset-0 space-y-4"
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {prof.name}
                  </h3>
                  <p className="text-sm sm:text-base text-yellow-300 font-semibold">
                    {prof.title}
                  </p>
                  <p className="text-base sm:text-lg text-white leading-relaxed">
                    {prof.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-8">
              {professors.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-12 bg-yellow-400'
                      : 'w-8 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div ref={cardsContainerRef} className="relative w-full lg:w-1/2 min-h-[500px] lg:min-h-screen bg-gray-900 overflow-hidden">
          {professors.map((prof, index) => (
            <div
              key={prof.id}
              className="professor-card absolute top-0 left-0 right-0 bottom-0 m-4 sm:m-6 lg:m-8"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-gray-800">
                <Image
                  src={prof.image}
                  alt={`${prof.name} holding basketball`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextElementSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800" 
                  style={{display: 'none'}}
                >
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">{prof.name}</p>
                    <p className="text-sm text-gray-300">Professor {index + 1}</p>
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
