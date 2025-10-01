'use client';

import MegaMenu from "./components/MegaMenu";
import Hero from "./components/Hero";
import ProfessorsSection from "./components/ProfessorsSection";
import OfferingsSection from "./components/OfferingsSection";
import CallToActionBanner from "./components/CallToActionBanner";
import VideoShowcaseSection from "./components/VideoShowcaseSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <MegaMenu />
      <Hero />
      <ProfessorsSection />
      <OfferingsSection />
      <CallToActionBanner />
      <VideoShowcaseSection />
      <Footer />
    </>
  );
}

