'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);
  const progressBarRef = useRef(null);
  const percentageRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      const assets = [
        { type: 'video', src: '/video/hero.mp4', weight: 50 },
        { type: 'image', src: '/images/prof1.png', weight: 15 },
        { type: 'image', src: '/images/prof2.png', weight: 15 },
        { type: 'image', src: '/images/prof3.png', weight: 15 },
        { type: 'font', name: 'Ubuntu', weight: 5 }
      ];

      let loadedWeight = 0;
      const totalWeight = assets.reduce((sum, asset) => sum + asset.weight, 0);

      const updateProgress = (weight) => {
        loadedWeight += weight;
        const newProgress = Math.min((loadedWeight / totalWeight) * 100, 100);
        setProgress(newProgress);
      };

      const loadPromises = assets.map((asset) => {
        return new Promise((resolve) => {
          if (asset.type === 'video') {
            const video = document.createElement('video');
            video.src = asset.src;
            video.preload = 'auto';
            
            video.addEventListener('canplaythrough', () => {
              updateProgress(asset.weight);
              resolve();
            });

            video.addEventListener('error', () => {
              updateProgress(asset.weight);
              resolve();
            });

            video.load();
          } else if (asset.type === 'image') {
            const img = new Image();
            img.src = asset.src;
            
            img.onload = () => {
              updateProgress(asset.weight);
              resolve();
            };

            img.onerror = () => {
              updateProgress(asset.weight);
              resolve();
            };
          } else if (asset.type === 'font') {
            if (document.fonts) {
              document.fonts.ready.then(() => {
                updateProgress(asset.weight);
                resolve();
              });
            } else {
              updateProgress(asset.weight);
              resolve();
            }
          }
        });
      });

      await Promise.all(loadPromises);

      setTimeout(() => {
        setProgress(100);
        setIsComplete(true);
      }, 500);
    };

    loadAssets();
  }, []);

  useEffect(() => {
    const logo = logoRef.current;
    const progressBar = progressBarRef.current;
    const percentage = percentageRef.current;
    const preloader = preloaderRef.current;

    if (!logo || !progressBar || !percentage || !preloader) return;

    const tl = gsap.timeline();
    
    tl.from(logo, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
    })
    .from(progressBar.parentElement, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3');

  }, []);

  useEffect(() => {
    const percentage = percentageRef.current;
    const progressBar = progressBarRef.current;

    if (!percentage || !progressBar) return;

    gsap.to(percentage, {
      innerText: Math.floor(progress),
      duration: 0.3,
      snap: { innerText: 1 },
      ease: 'power1.out',
      onUpdate: function() {
        percentage.innerText = Math.floor(this.targets()[0].innerText);
      }
    });

    gsap.to(progressBar, {
      width: `${progress}%`,
      duration: 0.3,
      ease: 'power2.out',
    });

  }, [progress]);

  useEffect(() => {
    if (!isComplete) return;

    const preloader = preloaderRef.current;
    if (!preloader) return;

    const exitTl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    exitTl
      .to(preloader, {
        y: '-100%',
        duration: 1,
        ease: 'power3.inOut',
        delay: 0.3,
      });

  }, [isComplete, onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: '#f7e9c6' }}
    >
      <div className="relative max-w-4xl mx-auto text-center px-6">
        <div className="space-y-12">
          <div ref={logoRef} className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight">
                <span className="text-black">WE </span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">INFLUENCE</span>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black/80 tracking-wider">ACADEMY</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-black/60 max-w-2xl mx-auto leading-relaxed">
                Preparing your influence journey...
              </p>
            </div>
          </div>

          <div className="max-w-lg mx-auto space-y-6">
            <div className="relative">
              <div className="h-3 bg-black/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  ref={progressBarRef}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: '0%' }}
                ></div>
              </div>
              <div className="absolute inset-0 h-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-sm"></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-black/50 text-sm font-medium tracking-wider uppercase">Loading Assets</span>
              <div className="flex items-center space-x-2">
                <span ref={percentageRef} className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  0
                </span>
                <span className="text-black/60 text-lg">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
