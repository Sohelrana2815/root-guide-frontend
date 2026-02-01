"use client";
import { MapPin, Users, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDatePicker } from "@/hooks/useDatePicker";
import Link from "next/link";

export default function HeroSearch() {
  const { dateInputRef, openPicker } = useDatePicker();

  return (
    <>
      {/* Floating Search Bar */}

      <div className="absolute left-1/2 -bottom-12 md:-bottom-16 -translate-x-1/2 w-full max-w-5xl px-4 pb-2 ">
        <div className="bg-secondary rounded-2xl shadow-2xl p-2 md:p-4 text-muted-foreground ">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Destination */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-r-0 md:border-r border-slate-100 w-full">
              <MapPin className="w-5 h-5 text-blue-500" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase font-bold text-foreground">
                  Location
                </span>
                <input
                  className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground"
                  placeholder="Where to?"
                  readOnly
                />
              </div>
            </div>

            {/* Date */}
            <div
              className="flex-1 flex items-center gap-3 px-4 py-2 border-r-0 md:border-r border-slate-100 w-full cursor-pointer "
              onClick={openPicker}
            >
              <Calendar className="w-5 h-5 text-blue-500" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase font-bold text-foreground">
                  Date
                </span>
                <input
                  type="date"
                  ref={dateInputRef}
                  onClick={(e) => e.stopPropagation()}
                  readOnly
                  disabled
                  className="bg-transparent outline-none text-sm w-full cursor-pointer
                  
                    "
                />
              </div>
            </div>

            {/* Pax */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full ">
              <Users className="w-5 h-5 text-blue-500" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase font-bold text-foreground">
                  Guests
                </span>
                <input
                  type="number"
                  readOnly
                  min={1}
                  className="bg-transparent outline-none text-sm w-full 
                    placeholder:text-muted-foreground
                    "
                  placeholder="Add guests"
                />
              </div>
            </div>

            <Link href="/tours">
              <Button className="w-full md:w-auto bg-slate-900 hover:bg-black text-white  rounded-xl h-12 font-medium transition-all flex items-center justify-center gap-2 border-0">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
