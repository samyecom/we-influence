'use client';
import { Londrina_Solid, Ubuntu } from "next/font/google";
import "./globals.css";

const londrinaSolid = Londrina_Solid({
  variable: "--font-londrina-solid",
  subsets: ["latin"],
  weight: ["100", "300", "400", "900"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export default function Home() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex items-center justify-center h-full">
        <h1 className="text-white text-6xl font-bold text-center">
          We Influence
        </h1>
      </div>
    </div>
  );
}
