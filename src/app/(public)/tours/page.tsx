import TourGrid from "@/components/modules/Tours/TourGrid";
import { getAllToursWithGuides } from "@/services/tourist/booking.service";

const ToursPage = async () => {
  const { data: tours } = await getAllToursWithGuides();
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Explore Our Adventures
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Discover hand-picked tours led by professional local guides.
        </p>
      </div>
      {/* Pass the populated tours to your grid */}
      <TourGrid tours={tours || []} />
    </div>
  );
};

export default ToursPage;
