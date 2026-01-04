import Image, { StaticImageData } from "next/image";
import React from "react";
import { MapPin, Users, Calendar, Search } from "lucide-react";
import Link from "next/link";

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

        {/* Floating Search Bar */}
        <div className="absolute left-1/2 -bottom-12 md:-bottom-16 -translate-x-1/2 w-full max-w-5xl px-4">
          <div className="bg-secondary rounded-2xl shadow-2xl p-2 md:p-4 text-muted-foreground">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Destination */}
              <div className="flex-1 flex items-center gap-3 px-4 py-2 border-r-0 md:border-r border-slate-100 w-full">
                <MapPin className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase font-bold text-foreground">
                    Location
                  </span>
                  <input
                    className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground"
                    placeholder="Where to?"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="flex-1 flex items-center gap-3 px-4 py-2 border-r-0 md:border-r border-slate-100 w-full">
                <Calendar className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase font-bold text-foreground">
                    Date
                  </span>
                  <input
                    type="date"
                    className="bg-transparent outline-none text-sm w-full cursor-pointer"
                  />
                </div>
              </div>

              {/* Pax */}
              <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full">
                <Users className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase font-bold text-foreground">
                    Guests
                  </span>
                  <input
                    type="number"
                    min={1}
                    className="bg-transparent outline-none text-sm w-full"
                    placeholder="Add guests"
                  />
                </div>
              </div>

              <button className="w-full md:w-auto bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
