/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BookTourDialog from "@/components/modules/Tours/BookTourDialog";

interface BookingWidgetProps {
  tour: any;
  guide: any;
}

const BookingWidget = ({ tour, guide }: BookingWidgetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className="w-full h-12 text-lg font-bold" onClick={() => setOpen(true)}>
        Book This Tour
      </Button>

      <BookTourDialog
        tour={tour}
        guide={guide}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default BookingWidget;
