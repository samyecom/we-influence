"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  useEffect(() => {
    // Initialize smooth scroll
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2, // higher = smoother
      effects: true,
    });

    // Example: fade-in section animation
    gsap.utils.toArray(".fade-section").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    });

    return () => {
      smoother.kill(); // cleanup when leaving the page
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <section className="h-screen flex items-center justify-center bg-blue-500 text-white text-4xl font-bold">
          Hero Section
        </section>
        <section className="h-screen flex items-center justify-center bg-gray-100 fade-section text-black text-4xl">
          Smooth Scrolling Content
        </section>
        <section className="h-screen flex items-center justify-center bg-green-400 fade-section text-white text-4xl">
          Parallax + ScrollTrigger Ready 🚀
        </section>
      </div>
    </div>
  );
}
