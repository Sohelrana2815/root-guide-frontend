"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";
import Link from "next/link";
import HeroSearch from "./HeroSearch";

interface HeroProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string | StaticImageData;
}

const Hero: React.FC<HeroProps> = ({
  title = "Explore the World",
  subtitle = "Discover handpicked experiences and hidden gems around the globe.",
  ctaText = "Explore Now",
  ctaHref = "/tours",
  backgroundImage = "/assets/images/hero.jpg",
}) => {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Content Area */}
      <div className="container relative z-10 mx-auto px-6 pt-20 pb-32 text-center text-white">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
          {title}
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
          {subtitle}
        </p>

        <Link
          href={ctaHref}
          className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 transition-colors rounded-full text-white font-semibold shadow-xl hover:shadow-2xl"
        >
          {ctaText}
        </Link>
        {/*  */}
        <HeroSearch />
      </div>
    </section>
  );
};

export default Hero;
