import Hero from "@/components/modules/Home/Hero";
import heroImg from "@/assets/images/hero.jpg";
import PopularDestinations from "@/components/modules/Home/PopularDestination";
import { getPublicTours } from "@/services/guide/toursManagement";
import PopularPackages from "@/components/modules/Home/PopularPackages";
import TrustAndCTA from "@/components/modules/Home/TrustAndCTA";
import TravelByActivity from "@/components/modules/Home/TravelByActivity";
import SpecialOffer from "@/components/modules/Home/SpecialOffer";
import { getPublicReviews } from "@/services/tourist/reviews.service";
import TouristReviews from "@/components/modules/Home/TouristReviews";
import { getGlobalMeta } from "@/services/meta/globalMeta.service";
import { IGlobalMeta } from "@/types/meta.interface";

export default async function HomePage() {
  const [tourResult, reviewResult, meta] = await Promise.all([
    getPublicTours(),
    getPublicReviews(),
    getGlobalMeta(),
  ]);

  const tours = tourResult || [];
  const reviews = reviewResult?.data || [];
  const metaData: IGlobalMeta = meta?.data || {
    totalTourists: 0,
    totalGuides: 0,
    totalDestinations: 0,
  };
  return (
    <main>
      <Hero
        backgroundImage={heroImg}
        title={
          <>
            Explore <span className="text-blue-400">Amazing</span> Places
          </>
        }
        subtitle={`Join over ${metaData.totalTourists}+ travelers finding their perfect getaway with handpicked local guides.`}
        ctaText="Start Your Adventure"
        ctaHref="/tours"
      />

      {/* Spacer to allow the floating search bar room to breathe */}
      <div className="h-32" />

      <PopularPackages tours={tours} />
      <TouristReviews reviews={reviews} />
      <TravelByActivity />
      <PopularDestinations tours={tours} />
      <TrustAndCTA />
      <SpecialOffer />
    </main>
  );
}
