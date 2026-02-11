"use client";

import { useState, useEffect } from "react";
// Removed duplicate import
import { AnimatePresence, motion } from "framer-motion";
import LoadingLines from "@/components/ui/LoadingLines";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });
const HeroOverlay = dynamic(() => import("@/components/sections/HeroOverlay"), { ssr: false });
const ValentineAsk = dynamic(() => import("@/components/sections/ValentineAsk"), { ssr: false });
const FocusCards = dynamic(() => import("@/components/ui/focus-cards").then(mod => mod.FocusCards), { ssr: false });

const GALLERY_IMAGES = [
  { src: "/gallery/photo1.JPG", alt: "Us 1" },
  { src: "/gallery/photo2.JPG", alt: "Us 2" },
  { src: "/gallery/photo3.JPG", alt: "Us 3" },
  { src: "/gallery/photo4.JPG", alt: "Us 4" },
  { src: "/gallery/photo5.JPG", alt: "Us 5" },
  { src: "/gallery/photo6.JPG", alt: "Us 6" },
  { src: "/gallery/photo7.JPG", alt: "Us 7" },
  { src: "/gallery/photo8.JPG", alt: "Us 8" },
  { src: "/gallery/photo9.JPG", alt: "Us 9" },
  { src: "/gallery/photo10.JPG", alt: "Us 10 - Center" }, // Center
  { src: "/gallery/photo11.JPG", alt: "Us 11" },
  { src: "/gallery/photo12.JPG", alt: "Us 12" },
  { src: "/gallery/photo13.JPG", alt: "Us 13" },
  { src: "/gallery/photo14.JPG", alt: "Us 14" },
  { src: "/gallery/photo15.JPG", alt: "Us 15" },
];
const AudioPlayer = dynamic(() => import("@/components/ui/AudioPlayer"), { ssr: false });
const TimeTogether = dynamic(() => import("@/components/sections/TimeTogether"), { ssr: false });
const ReasonsGrid = dynamic(() => import("@/components/sections/ReasonsGrid"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show preloader for 4 seconds then fade out
    console.log("Setting timeout for loader");
    const timer = setTimeout(() => {
      console.log("Timeout reached, setting isLoading false");
      setIsLoading(false);
    }, 5000); // Extended to 5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen w-full">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <LoadingLines />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Background - Fixed */}
      <div className="fixed inset-0 z-0">
        <HeroScene />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full">
        {/* Full-screen Hero Section */}
        <section className="h-screen relative w-full">
          <HeroOverlay />
        </section>

        {/* Time Together & Particle Text */}
        <TimeTogether />

        {/* Reasons Grid (Bento) */}
        <ReasonsGrid />

        {/* Kinetic Gallery Section */}
        {/* Focus Cards Gallery Section */}
        <div className="py-20 px-4">
          <FocusCards cards={GALLERY_IMAGES.map(img => ({ title: img.alt, src: img.src }))} />
        </div>

        {/* Ask Section */}
        <ValentineAsk />
      </div>

      {/* Audio Player - Fixed */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="hidden md:block">
          <AudioPlayer src="/gallery/love_theme.mp3" title="Romantic Theme" />
        </div>
        {/* Simplified mobile view could be added here if needed */}
        <div className="md:hidden">
          {/* Render player but maybe scaled down? Or same component handles responsiveness */}
          <AudioPlayer src="/gallery/love_theme.mp3" title="Romantic Theme" />
        </div>
      </div>
    </main>
  );
}
