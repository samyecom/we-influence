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
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      <div className="text-center space-y-12 px-6">
        <div ref={logoRef} className="space-y-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-full blur-3xl opacity-50"></div>
            <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            We Influence
          </h1>
          
          <p className="text-white/60 text-sm tracking-widest uppercase">
            Preparing your influence journey...
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-full transition-all duration-300"
              style={{ width: '0%' }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-white/40 text-sm">Loading...</span>
            <span ref={percentageRef} className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
