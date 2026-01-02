/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BookTourDialogProps {
  tour: any;
  guide: any;
  isOpen: boolean;
  onClose: () => void;
}

const BookTourDialog = ({
  isOpen,
  onClose,
  tour,
  guide,
}: BookTourDialogProps) => {
  const router = useRouter();
  const [guestCount, setGuestCount] = useState("1");

  const handleCloseModal = () => {
    onClose();
    setGuestCount("1");
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(guestCount);
    if (count > 0 && count <= tour.maxGroupSize) {
      router.push(
        `/dashboard/book-tour/${guide._id}/${tour._id}?guestCount=${count}`
      );
    }
  };
  const isDisabled =
    !guestCount ||
    parseInt(guestCount) <= 0 ||
    parseInt(guestCount) > tour.maxGroupSize;
  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-106.25">
          <form onSubmit={handleContinue}>
            <DialogHeader>
              <DialogTitle>Provide Guest Count</DialogTitle>
              <DialogDescription>
                Maximum Guests Allowed:{" "}
                <span className="font-bold">{tour.maxGroupSize}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="maxGuestCount">Guest Count</Label>
                <Input
                  type="number"
                  id="maxGuestCount"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  placeholder="Enter number of guests"
                  min={1}
                  max={tour.maxGroupSize}
                  onKeyDown={(e) => {
                    if (["-", "e", "E"].includes(e.key)) e.preventDefault();
                  }}
                />
                {parseInt(guestCount) > tour.maxGroupSize && (
                  <p className="text-xs text-destructive">
                    Cannot exceed {tour.maxGroupSize} guests.
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isDisabled} type="submit">
                Continue
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookTourDialog;
