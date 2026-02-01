"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // আইকন ব্যবহারের জন্য
import HeroSearch from "./HeroSearch";

interface HeroProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  // এখন আমরা একাধিক ইমেজ সাপোর্ট করবো
  images?: (string | StaticImageData)[];
}

const Hero: React.FC<HeroProps> = ({
  title = "Explore the World",
  subtitle = "Discover handpicked experiences and hidden gems around the globe.",
  ctaText = "Explore Now",
  ctaHref = "/tours",
  images = [
    "/assets/images/hero1.webp",
    "/assets/images/hero2.webp",
    "/assets/images/hero3.webp",
  ],
}) => {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // স্লাইড পরিবর্তনের লজিক
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Auto-play after every 5 seconds
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* ১. ব্যাকগ্রাউন্ড স্লাইডার অংশ */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {mounted && (
              <Image
                src={images[currentIndex]}
                alt={`Hero background ${currentIndex}`}
                fill
                priority
                className="object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>
        {/* অন্ধকার ওভারলে (টেক্সট ক্লিয়ার রাখার জন্য) */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] z-10" />
      </div>

      {/* ২. স্ট্যাটিক কন্টেন্ট (যা স্লাইড হবে না) */}
      <div className="container relative z-20 mx-auto px-6 pt-20 pb-32 text-center text-white">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
            {title}
          </h1>

          <p
            suppressHydrationWarning
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 mb-10 leading-relaxed"
          >
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href={ctaHref}
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 transition-all rounded-full text-white font-semibold shadow-xl hover:scale-105 active:scale-95"
            >
              {ctaText}
            </Link>
          </div>

          <HeroSearch />
        </motion.div>
      </div>

      {/* ৩. ম্যানুয়াল নেভিগেশন বাটন (ঐচ্ছিক) */}
      <div className="absolute inset-x-0 bottom-10 z-30 flex justify-center gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 transition-all rounded-full ${
              currentIndex === index ? "w-8 bg-blue-500" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Left/Right Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 z-30 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all hidden md:block"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 z-30 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all hidden md:block"
      >
        <ChevronRight size={32} />
      </button>
    </section>
  );
};

export default Hero;
