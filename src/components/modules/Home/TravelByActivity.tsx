import React from "react";
import { Mountain, Backpack, Flame, Compass, Tent, Map } from "lucide-react";
import SectionHeader from "./SectionHeader";

const activities = [
  { name: "Adventure", count: 15, icon: Mountain },
  { name: "Trekking", count: 12, icon: Backpack },
  { name: "Camp Fire", count: 7, icon: Flame },
  { name: "Off Road", count: 15, icon: Compass },
  { name: "Camping", count: 13, icon: Tent },
  { name: "Exploring", count: 25, icon: Map },
];

const TravelByActivity = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      {/* Using your new reusable header */}
      <SectionHeader
        title="ADVENTURE & ACTIVITY"
        subtitle="Handpicked activities and local experiences — discover the best destinations for every kind of traveler."
        linkText="Browse Activities"
        linkHref="/activities"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="group flex flex-col items-center justify-center p-8 rounded-xl border border-primary/10 bg-muted/10 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer text-center"
          >
            <div className="mb-4 p-3 rounded-full bg-card group-hover:bg-blue-50 transition-colors">
              <activity.icon
                className="w-10 h-10 text-blue-500 transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.5}
              />
            </div>

            <h3 className="font-bold text-foreground group-hover:text-blue-600 transition-colors">
              {activity.name}
            </h3>

            <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-tight">
              {activity.count} Destinations
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TravelByActivity;
