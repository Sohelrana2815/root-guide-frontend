import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ITour } from "@/types/tour.interface";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Star,
  Tag,
  Users,
} from "lucide-react";
import { formatDateTime, getInitials } from "@/lib/formatters";
import InfoRow from "@/components/shared/InfoRow";

interface ITourViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  tour?: ITour | null;
}

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
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Tour Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Tour Details Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={tour?.image} alt={tour?.title?.slice(0, 10)} />
              <AvatarFallback className="text-2xl">
                {getInitials(tour?.title || "")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{tour?.title}</h2>
              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                {/* <Mail className="h-4 w-4" /> */}
                {/* it will not be mail icon need to adjust style and the layout for tour details related page */}
                {tour?.city || ""}
              </p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {isDeleted ? (
                  <Badge variant="destructive" className="text-sm">
                    Deleted
                  </Badge>
                ) : (
                  <Badge
                    variant={tour?.isActive === false ? "secondary" : "default"}
                    className="text-sm"
                  >
                    {tour?.isActive === false ? "Inactive" : "Active"}
                  </Badge>
                )}

                {tour?.category ? (
                  <Badge variant="outline" className="text-sm">
                    {tour.category}
                  </Badge>
                ) : null}

                {tour?.averageRating !== undefined && (
                  <Badge variant="secondary" className="text-sm">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {tour.averageRating.toFixed(1)} Rating
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="space-y-6">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Price" value={formatPrice(tour?.price)} />
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Duration"
                    value={
                      typeof tour?.duration === "number"
                        ? `${tour.duration} hours`
                        : "Not specified"
                    }
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Max Group Size"
                    value={
                      typeof tour?.maxGroupSize === "number"
                        ? tour.maxGroupSize
                        : "Not specified"
                    }
                  />
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Meeting Point"
                    value={tour?.meetingPoint || "Not specified"}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Category"
                    value={tour?.category || "Not specified"}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="City" value={tour?.city || "Not specified"} />
                </div>
              </div>
            </div>

            <Separator />

            {tour?.description ? (
              <div>
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {tour.description}
                </p>
              </div>
            ) : null}

            {tour?.description ? <Separator /> : null}

            {tour?.itinerary ? (
              <div>
                <h3 className="font-semibold text-lg mb-2">Itinerary</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {tour.itinerary}
                </p>
              </div>
            ) : null}

            {tour?.itinerary ? <Separator /> : null}

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold text-lg">Meta</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Created At"
                    value={
                      tour?.createdAt
                        ? formatDateTime(tour.createdAt)
                        : "Not specified"
                    }
                  />
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Updated At"
                    value={
                      tour?.updatedAt
                        ? formatDateTime(tour.updatedAt)
                        : "Not specified"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TourViewDetailDialog;
