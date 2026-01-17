import { Button } from "@/components/ui/button";
import { Users, Map, Award, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Link from "next/link";
import { getGlobalMeta } from "@/services/meta/globalMeta.service";
import { IGlobalMeta } from "@/types/meta.interface";

const TrustAndCTA = async () => {
  const result = await getGlobalMeta();
  const data: IGlobalMeta = result.data || {
    totalTourists: 0,
    totalGuides: 0,
    totalDestinations: 0,
  };
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      label: "Happy Travelers",
      value: `${data.totalTourists}+`,
    },
    {
      icon: <Map className="w-6 h-6 text-primary" />,
      label: "Destinations",
      value: `${data.totalDestinations}`,
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      label: "Expert Guides",
      value: `${data.totalGuides}+`,
    },
  ];

  return (
    <div className="space-y-12 py-16 max-w-7xl mx-auto p-3">
      {/* Trust Stats Section */}
      <SectionHeader
        title="Find Your Next Adventure Today"
        subtitle="Personalized tours, flexible dates, and local guides — book or request a callback."
        linkText="Get a Free Callback"
        linkHref="#"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center  text-center p-6 rounded-2xl bg-card border border-primary/20 shadow-sm hover:shadow-md transition-all"
          >
            <div className="mb-4 p-3 rounded-full bg-card border border-primary/80">
              {stat.icon}
            </div>
            <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-12 text-center md:px-16 md:text-left">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready for your next adventure?
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-lg">
              Join thousands of explorers and discover hidden gems with our
              verified local guides.
            </p>
          </div>
          <Link href="/tours">
            <Button
              size="lg"
              variant="secondary"
              className="group h-14 px-8 text-lg font-bold"
            >
              Start Booking Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Subtle decorative background element */}
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>
    </div>
  );
};

export default TrustAndCTA;
