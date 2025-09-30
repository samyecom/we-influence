import { Londrina_Solid, Ubuntu } from "next/font/google";
import "./globals.css";
import Navigation from '../components/Navigation';

import SplashCursor from '../components/SplashCursor'

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

export const metadata = {
  title: "We Influence Academy: Your Journey to Digital Stardom",
  description: "Transform your digital presence and become a social media influencer with We Influence Academy. Learn content creation, brand building, and monetization strategies to achieve digital stardom.",
  keywords: [
    "social media influencer",
    "digital marketing",
    "content creation",
    "brand building",
    "social media strategy",
    "influencer marketing",
    "digital stardom",
    "online presence",
    "social media growth",
    "content marketing"
  ],
  authors: [{ name: "We Influence Academy" }],
  creator: "We Influence Academy",
  publisher: "We Influence Academy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://weinfluenceacademy.com",
    title: "We Influence Academy: Your Journey to Digital Stardom",
    description: "Transform your digital presence and become a social media influencer with We Influence Academy. Learn content creation, brand building, and monetization strategies.",
    siteName: "We Influence Academy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "We Influence Academy - Your Journey to Digital Stardom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "We Influence Academy: Your Journey to Digital Stardom",
    description: "Transform your digital presence and become a social media influencer with We Influence Academy.",
    images: ["/twitter-image.jpg"],
    creator: "@weinfluenceacademy",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${londrinaSolid.variable} ${ubuntu.variable} antialiased bg-black`}
        data-new-gr-c-s-check-loaded="14.1255.0"
        data-gr-ext-installed=""
      >

        <SplashCursor />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
