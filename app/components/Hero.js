'use client';

import { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import RotatingPlayButton from './RotatingPlayButton';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const heroWrapperRef = useRef(null);
  const sectionsContainerRef = useRef(null);
  const scrollTriggerInstance = useRef(null);
  const firstHeadingRef = useRef(null);
  const firstDescRef = useRef(null);
  const secondHeadingRef = useRef(null);
  const secondDescRef = useRef(null);
  const splitTextInstances = useRef([]);

  useEffect(() => {
    const heroWrapper = heroWrapperRef.current;
    const sectionsContainer = sectionsContainerRef.current;
    const firstHeading = firstHeadingRef.current;
    const firstDesc = firstDescRef.current;
    const secondHeading = secondHeadingRef.current;
    const secondDesc = secondDescRef.current;

    if (!heroWrapper || !sectionsContainer) return;

    const textElements = [firstHeading, firstDesc, secondHeading, secondDesc].filter(Boolean);
    
    textElements.forEach((element, index) => {
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
        
        if (index === 0) {
          gsap.to(splitText.chars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'back.out(1.7)',
            delay: 0.5
          });
        } else if (index === 1) {
          gsap.to(splitText.chars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'back.out(1.7)',
            delay: 1.0
          });
        } else {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          });
          
          tl.to(splitText.chars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'back.out(1.7)'
          });
        }
      }
    });

    const updateScrollTrigger = () => {
      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill();
      }

      const totalHeight = sectionsContainer.scrollHeight;

      scrollTriggerInstance.current = ScrollTrigger.create({
        trigger: heroWrapper,
        start: "top top",
        end: `+=${totalHeight}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const scrollAmount = progress * (totalHeight - heroWrapper.offsetHeight);
          sectionsContainer.style.transform = `translateY(-${scrollAmount}px)`;
        },
      });
    };

    updateScrollTrigger();

    const handleResize = () => {
      updateScrollTrigger();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
  }, []);

  return (
    <div ref={heroWrapperRef} className="relative h-max lg:h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <video
          src="/video/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute bottom-8 right-8 z-50">
        <RotatingPlayButton videoSrc="/video/hero.mp4" />
      </div>
        
      <div ref={sectionsContainerRef} className="relative z-10">
        <section className="lg:min-h-screen flex items-center justify-start py-12 sm:py-16 md:py-20">
          <div className="w-full px-6 lg:px-8">
            <div className="relative z-10 text-left space-y-4 sm:space-y-6 md:space-y-8">
            <h1 ref={firstHeadingRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-tight">
              <div className="text-white">WE</div>
              <div className="inline-block mt-2">
                <span 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 transform -skew-x-12 inline-block shadow-2xl"
                  style={{ backgroundColor: '#fed775' }}
                >
                  INFLUENCE
                </span>
              </div>
            </h1>
            <p ref={firstDescRef} className="text-base sm:text-lg md:text-xl lg:text-4xl leading-relaxed max-w-xl lg:max-w-5xl" style={{ color: '#ffffff' }}>
              Transform your ideas into powerful digital experiences.
            </p>
            </div>
          </div>
        </section>

        <section className="lg:min-h-screen relative  flex items-center justify-center py-12 sm:py-16 md:py-20"
        >
          <div className="absolute inset-0 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0"
          style={{
            maskImage: 'linear-gradient(to top, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent)'
          }}
          ></div>
          
          <div className="w-full px-6 lg:px-8">
            <div className="relative z-10 text-center space-y-2 sm:space-y-4 md:space-y-6">
            <h1 ref={secondHeadingRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-tight">
              <span className="text-white">SCALE YOUR </span>
              <span style={{ color: '#fed775' }}>IMPACT</span>
            </h1>
            <p ref={secondDescRef} className="text-base sm:text-lg md:text-xl lg:text-4xl leading-relaxed max-w-xl lg:max-w-5xl mx-auto" style={{ color: '#ffffff' }}>
              Reach more people through cutting-edge technology and strategic design.
            </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
