import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateTime, getInitials } from "@/lib/formatters";
import { Star } from "lucide-react";

interface Review {
  _id: string;
  touristId: {
    name: string;
    photo?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export default function GuideTourReviews({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <div className="bg-muted/20 border border-dashed rounded-xl p-8 text-center">
          <p className="text-muted-foreground">No reviews yet for this tour.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reviews ({reviews.length})</h2>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="space-y-4 pb-6 border-b last:border-0"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.touristId?.photo} />
                  <AvatarFallback>
                    {getInitials(review.touristId?.name || "U")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">
                    {review.touristId?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateTime(review.createdAt) || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              &quot;{review.comment}&quot;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
