import Hero from "@/components/modules/Home/Hero";
import heroImg1 from "@/assets/images/hero-img1.webp";
import heroImg2 from "@/assets/images/hero-img2.webp";
import heroImg3 from "@/assets/images/hero-img3.webp";
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
import { getHighRatedGuides } from "@/services/public/users.service";
import HighRatedGuides from "@/components/modules/Guide/HighRatedGuides/HighRatedGuides";
import {
  getCategories,
  getPopularCities,
} from "@/services/public/tours.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [
    tourResult,
    reviewResult,
    meta,
    highRatedGuides,
    popularCities,
    categories,
  ] = await Promise.all([
    getPublicTours(),
    getPublicReviews(),
    getGlobalMeta(),
    getHighRatedGuides(),
    getPopularCities(),
    getCategories(),
  ]);

  const tours = tourResult || [];
  const reviews = reviewResult?.data || [];
  const metaData: IGlobalMeta = meta?.data || {
    totalTourists: 0,
    totalGuides: 0,
    totalDestinations: 0,
  };

  const cities = popularCities?.data || [];
  const categoriesList = categories?.data || [];

  const topGuides = Array.isArray(highRatedGuides?.data)
    ? highRatedGuides.data
    : [];

  // console.log("Top Guides", topGuides);

  return (
    <main>
      <Hero
        images={[heroImg1, heroImg2, heroImg3]}
        title={
          <>
            Explore <span className="text-blue-400">Amazing</span> Places
          </>
        }
        subtitle={`Join over ${metaData.totalTourists}+ travelers finding their perfect getaway with handpicked local guides.`}
        ctaText="Start Your Adventure"
        ctaHref="/tours"
        tours={tours}
        metaData={metaData}
        cities={cities}
        categories={categoriesList}
      />

      {/* Spacer to allow the floating search bar room to breathe */}
      <div className="" />
      <HighRatedGuides guides={topGuides} />
      <PopularPackages tours={tours} />
      <TouristReviews reviews={reviews} />
      <TravelByActivity />
      <PopularDestinations tours={tours} />
      <TrustAndCTA />
      <SpecialOffer />
    </main>
  );
}
