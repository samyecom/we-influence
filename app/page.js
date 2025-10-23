'use client';

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MegaMenu from "./components/MegaMenu";
import Hero from "./components/Hero";
import ProfessorsSection from "./components/ProfessorsSection";
import OfferingsSection from "./components/OfferingsSection";
import CallToActionBanner from "./components/CallToActionBanner";
import VideoShowcaseSection from "./components/VideoShowcaseSection";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <MegaMenu />
        <Hero />
        <ProfessorsSection />
        <OfferingsSection />
        <CallToActionBanner />
        <VideoShowcaseSection />
        <Footer />
      </div>
    </div>
  );
}

