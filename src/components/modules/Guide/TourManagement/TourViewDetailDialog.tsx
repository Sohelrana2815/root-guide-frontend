import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ITour } from "@/types/tour.interface";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Star,
  Tag,
  Users,
  Compass,
  Navigation,
  Globe,
  CalendarDays,
} from "lucide-react";
import { formatDateTime } from "@/lib/formatters";
import Image from "next/image";

interface ITourViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  tour?: ITour | null;
}

// Custom InfoRow component for this file
const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
    </div>
    <span className="text-sm text-gray-600 dark:text-gray-400 ml-6">
      {value}
    </span>
  </div>
);

const TourViewDetailDialog = ({
  open,
  onClose,
  tour,
}: ITourViewDetailDialogProps) => {
  const formatPrice = (price: number | undefined) => {
    if (typeof price !== "number" || Number.isNaN(price)) {
      return "Not specified";
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (!tour) {
    return null;
  }

  const isDeleted = tour.isDelete;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 bg-linear-to-r from-blue-50/50 to-emerald-50/50 dark:from-gray-900 dark:to-gray-800">
          <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            Tour Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {/* Hero Image Section */}
          <div className="relative h-48 md:h-56 overflow-hidden bg-linear-to-r from-blue-100 to-emerald-100 dark:from-blue-900 dark:to-emerald-900">
            {tour.image ? (
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Compass className="h-20 w-20 text-blue-300 dark:text-blue-400 opacity-50" />
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

            {/* Tour Title Overlay */}
            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-white" />
                <span className="text-white font-medium">
                  {tour.city || "Location not specified"}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                {tour.title}
              </h1>
            </div>
          </div>

          <div className="px-6 pb-6">
            {/* Quick Stats Badges */}
            <div className="flex flex-wrap gap-2 mt-4 mb-6">
              {isDeleted ? (
                <Badge variant="destructive" className="text-sm px-3 py-1">
                  Deleted
                </Badge>
              ) : (
                <Badge
                  variant={tour.isActive === false ? "secondary" : "default"}
                  className={`text-sm px-3 py-1 ${
                    tour.isActive === false
                      ? "bg-gray-100 text-gray-800 dark:bg-gray-800"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  }`}
                >
                  {tour.isActive === false ? "Inactive" : "Active"}
                </Badge>
              )}

              {tour.category && (
                <Badge
                  variant="outline"
                  className="text-sm px-3 py-1 border-blue-200 dark:border-blue-700"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tour.category}
                </Badge>
              )}

              {tour.averageRating !== undefined && (
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 text-sm px-3 py-1">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {tour.averageRating.toFixed(1)} Average Rating
                </Badge>
              )}
            </div>

            {/* Tour Info Grid */}
            <div className=" mb-8">
              {/* Left Column - Pricing & Details */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                          Pricing & Details
                        </h3>
                        <div className="space-y-4">
                          <InfoRow
                            label="Price"
                            value={formatPrice(tour.price)}
                            icon={
                              <DollarSign className="h-4 w-4 text-green-500" />
                            }
                          />
                          <InfoRow
                            label="Duration"
                            value={
                              typeof tour.duration === "number"
                                ? `${tour.duration} hours`
                                : "Not specified"
                            }
                            icon={<Clock className="h-4 w-4 text-blue-500" />}
                          />
                          <InfoRow
                            label="Max Group Size"
                            value={
                              typeof tour.maxGroupSize === "number"
                                ? `${tour.maxGroupSize} people`
                                : "Not specified"
                            }
                            icon={<Users className="h-4 w-4 text-purple-500" />}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Navigation className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        Location Info
                      </h3>
                      <div className="space-y-4">
                        <InfoRow
                          label="City"
                          value={tour.city || "Not specified"}
                          icon={<Globe className="h-4 w-4 text-blue-500" />}
                        />
                        <InfoRow
                          label="Meeting Point"
                          value={tour.meetingPoint || "Not specified"}
                          icon={<MapPin className="h-4 w-4 text-red-500" />}
                        />
                        <InfoRow
                          label="Category"
                          value={tour.category || "Not specified"}
                          icon={<Tag className="h-4 w-4 text-orange-500" />}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Description & Itinerary */}
            <div className="space-y-6">
              {tour.description && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Description
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      {tour.description}
                    </div>
                  </CardContent>
                </Card>
              )}

              {tour.itinerary && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Itinerary
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      {tour.itinerary}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Meta Information */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    Tour Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow
                      label="Created At"
                      value={
                        tour.createdAt
                          ? formatDateTime(tour.createdAt)
                          : "Not specified"
                      }
                      icon={<Calendar className="h-4 w-4 text-gray-500" />}
                    />
                    <InfoRow
                      label="Updated At"
                      value={
                        tour.updatedAt
                          ? formatDateTime(tour.updatedAt)
                          : "Not specified"
                      }
                      icon={<Calendar className="h-4 w-4 text-gray-500" />}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TourViewDetailDialog;
