/* eslint-disable @typescript-eslint/no-explicit-any */
// components/modules/TourDetails/GuideProfileInfo.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/formatters";
import { ShieldCheck, Languages, Star } from "lucide-react";

export default function GuideProfileInfo({ guide }: { guide: any }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Your Local Guide</h2>
      <div className="flex flex-col md:flex-row gap-6 p-6 border rounded-2xl bg-muted/10">
        <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
          <AvatarImage src={guide.photo} />
          <AvatarFallback>{getInitials(guide.name)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">{guide.name}</h3>
            {guide.isVerified || (
              <Badge className="bg-blue-500">
                <ShieldCheck className="w-3 h-3 mr-1" /> Verified
              </Badge>
            )}
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-400" />
            <span className="font-bold">{guide.averageRating || "New"}</span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Languages className="w-4 h-4" /> {guide.languages?.join(", ")}
            </span>
          </div>

          <p className="text-muted-foreground italic">
            &quot;{guide.bio || "Passionate about local culture and history."}
            &quot;
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {guide.expertise?.map((item: string) => (
              <Badge
                key={item}
                variant="outline"
                className="font-normal uppercase text-[10px] tracking-wider"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
