"use client";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createTour, updateTour } from "@/services/guide/toursManagement";
import { ITour } from "@/types/tour.interface";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface ITourFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tour?: ITour;
}

const TourFormDialog = ({
  open,
  onClose,
  onSuccess,
  tour,
}: ITourFormDialogProps) => {
  const isEdit = !!tour;

  const tourId = tour?._id;

  const [state, formAction, pending] = useActionState(
    isEdit ? updateTour.bind(null, tourId!) : createTour,
    null
  );

  // expertise section hook

  // const expertiseSelection = useExpertiseSelection({
  //   user,
  //   isEdit,
  //   open,
  // });

  // 1. Create a ref to track if the user actually clicked "Submit"
  const hasSubmittedRef = useRef(false);

  // 2. Reset everything when the dialog opens
  useEffect(() => {
    if (open) {
      hasSubmittedRef.current = false;
    }
  }, [open, tour]);

  useEffect(() => {
    // 3. ONLY process if dialog is open, state exists, AND we actually submitted the form
    if (!open || !state || !hasSubmittedRef.current) return;

    if (state.success) {
      toast.success(state.message);
      hasSubmittedRef.current = false; // Reset after success
      onSuccess();
      onClose();
    } else if (state.success === false) {
      toast.error(state.message);
      hasSubmittedRef.current = false; // Reset after error so toast doesn't repeat
    }
  }, [state, onSuccess, onClose, open]);

  // 4. Wrap the form action to set the submission flag
  const handleSubmit = async (formData: FormData) => {
    hasSubmittedRef.current = true;
    formAction(formData);
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Tour" : "Add New Tour"}</DialogTitle>
        </DialogHeader>

        <form
          key={`${isEdit ? "edit" : "create"}-${tourId || "new"}`}
          action={handleSubmit}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* title */}
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="e.g, "
                defaultValue={isEdit ? tour?.title : undefined}
              />
              <InputFieldError state={state} field="title" />
            </Field>
            {/* description */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                id="description"
                name="description"
                type="text"
                placeholder="e.g,"
                defaultValue={isEdit ? tour?.description : undefined}
              />
              <InputFieldError state={state} field="description" />
            </Field>
            {/* itinerary */}
            <Field>
              <FieldLabel htmlFor="itinerary">Itinerary</FieldLabel>
              <Input
                id="itinerary"
                name="itinerary"
                type="text"
                placeholder="Enter itinerary"
                defaultValue={isEdit ? tour?.itinerary : undefined}
              />
              <InputFieldError state={state} field="itinerary" />
            </Field>
            {/* category */}
            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <Input
                id="category"
                name="category"
                type="text"
                placeholder="Enter a category"
                defaultValue={isEdit ? tour?.category : undefined}
              />
              <InputFieldError state={state} field="category" />
            </Field>
            {/* city */}

            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input
                id="city"
                name="city"
                placeholder="Select a city"
                // defaultValue={isEdit ? doctor?.doctorSpecialties?.[0]?.specialties?.title : ""}
                defaultValue={tour?.city}
                type="text"
              />
              <InputFieldError state={state} field="city" />
            </Field>
            {/* price */}

            <Field>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="e.g, 100"
                defaultValue={tour?.price}
              />
              <InputFieldError state={state} field="price" />
            </Field>
            {/* duration */}
            <Field>
              <FieldLabel htmlFor="duration">Duration</FieldLabel>
              <Input
                id="duration"
                name="duration"
                type="number"
                placeholder="e.g, 5 hours"
                defaultValue={isEdit ? tour?.duration : undefined}
              />
              <InputFieldError state={state} field="duration" />
            </Field>
            {/* Meeting point */}
            <Field>
              <FieldLabel htmlFor="meetingPoint">Meeting Point</FieldLabel>
              <Input
                id="meetingPoint"
                name="meetingPoint"
                placeholder="e.g, "
                defaultValue={isEdit ? tour?.meetingPoint : undefined}
              />
              <InputFieldError state={state} field="meetingPoint" />
            </Field>
            {/* Max group size */}
            <Field>
              <FieldLabel htmlFor="maxGroupSize">Maximum Group Size</FieldLabel>
              <Input
                id="maxGroupSize"
                name="maxGroupSize"
                type="number"
                placeholder="5"
                defaultValue={isEdit ? tour?.maxGroupSize : undefined}
                min="0"
              />
              <InputFieldError state={state} field="maxGroupSize" />
            </Field>
            {/* Image */}
            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="file">Image</FieldLabel>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  placeholder="Select an image"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a photo for the tour
                </p>
                <InputFieldError state={state} field="file" />
              </Field>
            )}
          </div>
          {/*  Expertise selection multi select use it and remove the expertise shadcn multi select */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : isEdit ? "Update Tour" : "Create Tour"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TourFormDialog;
