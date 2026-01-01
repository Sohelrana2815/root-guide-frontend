import { ITour } from "@/types/tour.interface";
import { MapPin } from "lucide-react";
import TourCard from "./TourCard";
import { IUser } from "@/types/user.interface";

// Define the "Populated" version of the Tour
type ITourWithGuide = Omit<ITour, "guideId"> & {
  guideId: IUser;
};

interface TourGridProps {
  tours: ITourWithGuide[]; // Use the populated type here
}

const TourGrid = ({ tours }: TourGridProps) => {
  if (tours.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-xl border-2 border-dashed">
        <MapPin className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">No tours found</h3>
        <p className="text-muted-foreground mt-2">
          Check back later for new adventures!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tours.map((tour) => (
        <TourCard key={tour._id} tour={tour} guide={tour.guideId} />
      ))}
    </div>
  );
};

export default TourGrid;
