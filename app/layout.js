import { Geist, Ubuntu } from "next/font/google";
import "./globals.css";
import PreloaderWrapper from './components/PreloaderWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "We influence",
  description: "we influence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${ubuntu.variable} antialiased`}
        data-new-gr-c-s-check-loaded="14.1255.0"
        data-gr-ext-installed=""
      >
        <PreloaderWrapper>
          {children}
        </PreloaderWrapper>
      </body>
    </html>
  );
}
