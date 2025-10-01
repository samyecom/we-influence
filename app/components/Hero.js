'use client';

import { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroWrapperRef = useRef(null);
  const sectionsContainerRef = useRef(null);
  const scrollTriggerInstance = useRef(null);

  useEffect(() => {
    const heroWrapper = heroWrapperRef.current;
    const sectionsContainer = sectionsContainerRef.current;

    if (!heroWrapper || !sectionsContainer) return;

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
        
      <div ref={sectionsContainerRef} className="relative z-10">
        <section className="lg:min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20">
          
          <div className="relative z-10 text-center space-y-4 sm:space-y-6 md:space-y-8 px-4 sm:px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-tight">
              WE INFLUENCE
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed max-w-xl lg:max-w-2xl mx-auto">
              Transform your ideas into powerful digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
              <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-white text-black font-bold text-sm sm:text-base md:text-lg rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300">
                GET STARTED
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold text-sm sm:text-base rounded-full hover:bg-white hover:text-black transition-all duration-300">
                Learn More
              </button>
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
          
          <div className="relative z-10 text-center space-y-4 sm:space-y-6 md:space-y-8 px-4 sm:px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-tight">
              SCALE YOUR IMPACT
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed max-w-xl lg:max-w-2xl mx-auto">
              Reach more people through cutting-edge technology and strategic design.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
