import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Languages, Star } from "lucide-react";
import Image from "next/image";

interface Guide {
  _id: string;
  name: string;
  photo?: string;
  bio?: string;
  expertise?: string[];
  averageRating: number;
  languages?: string[];
}

const HighRatedGuides = ({ guides }: { guides: Guide[] }) => {
  if (!guides?.length) return null;

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Meet Our <span className="text-blue-500">Elite</span> Guides
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Handpicked professionals with a consistent 4.0+ rating, dedicated to
            making your journey unforgettable.
          </p>
        </div>

        {/* The Zig-Zag List */}
        <div className="space-y-32">
          {guides.map((guide, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={guide._id}
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Image Side with Organic Shape */}
                <div className="relative w-full md:w-1/2 flex justify-center">
                  <div className="relative h-100 w-75 lg:h-125 lg:w-100">
                    {/* Decorative Background Element */}
                    <div className="absolute -inset-4 border-2 border-blue-100 rounded-[60px] -rotate-3" />

                    <div className="relative h-full w-full overflow-hidden rounded-[40px] grayscale hover:grayscale-0 transition-all duration-700 ease-in-out border-4 border-white shadow-2xl">
                      <Image
                        src={guide.photo || "/placeholder-guide.jpg"}
                        alt={guide.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Floating Rating Badge */}
                    <div className="absolute bottom-8 -right-4 bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                      <Star className="w-4 h-4 fill-blue-400 text-blue-400" />
                      <span className="font-bold text-lg">
                        {guide.averageRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
                      {guide.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {guide.languages?.map((lang) => (
                        <span
                          key={lang}
                          className="text-sm font-medium text-blue-500 uppercase tracking-widest flex items-center gap-1"
                        >
                          <Languages className="w-3 h-3" /> {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-lg text-slate-600 leading-relaxed italic">
                    &quot;
                    {guide.bio ||
                      "Passionate about sharing the hidden gems of the world with curious travelers."}
                    &quot;
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-6 h-6 text-slate-400 mt-1" />
                      <div className="flex flex-wrap gap-2">
                        {guide.expertise?.map((exp) => (
                          <Badge
                            key={exp}
                            variant="secondary"
                            className="bg-slate-100 text-slate-700 hover:bg-blue-50"
                          >
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      size="lg"
                      className="bg-black hover:bg-blue-600 text-white rounded-full px-8 py-6 group transition-all"
                      // onClick={() => handleOpenDetails(guide._id)} - For later use
                    >
                      View Full Profile
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HighRatedGuides;
