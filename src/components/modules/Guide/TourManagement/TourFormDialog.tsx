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
import { createTour } from "@/services/guide/toursManagement";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface ITourFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
const TourFormDialog = ({ open, onClose, onSuccess }: ITourFormDialogProps) => {
  const [state, formAction, pending] = useActionState(createTour, null);
  useEffect(() => {
    if (state && state?.success) {
      toast.success(state.message);
      onSuccess();
      onClose();
    } else if (state && !state?.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Tour</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          {/* Title */}
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" name="title" placeholder="..." required />
            <InputFieldError field="title" state={state} />
          </Field>
          {/* Description */}
          <Field>
            <FieldLabel htmlFor="description">description</FieldLabel>
            <Input
              id="description"
              name="description"
              placeholder="..."
              required
            />
            <InputFieldError field="description" state={state} />
          </Field>
          {/* Itinerary */}
          <Field>
            <FieldLabel htmlFor="itinerary">Itinerary</FieldLabel>
            <Input id="itinerary" name="itinerary" placeholder="..." required />
            <InputFieldError field="itinerary" state={state} />
          </Field>
          {/* Category */}
          <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Input id="category" name="category" placeholder="..." required />
            <InputFieldError field="category" state={state} />
          </Field>
          {/* City */}
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input id="city" name="city" placeholder="..." required />
            <InputFieldError field="city" state={state} />
          </Field>
          {/* Price */}
          <Field>
            <FieldLabel htmlFor="price">Price</FieldLabel>
            <Input id="price" name="price" placeholder="..." required />
            <InputFieldError field="price" state={state} />
          </Field>
          {/* duration */}
          <Field>
            <FieldLabel htmlFor="duration">Duration</FieldLabel>
            <Input id="duration" name="duration" placeholder="..." required />
            <InputFieldError field="duration" state={state} />
          </Field>
          {/* meetingPoint */}
          <Field>
            <FieldLabel htmlFor="meetingPoint">Meeting Point</FieldLabel>
            <Input
              id="meetingPoint"
              name="meetingPoint"
              placeholder="..."
              required
            />
            <InputFieldError field="meetingPoint" state={state} />
          </Field>
          {/* maxGroupSize */}
          <Field>
            <FieldLabel htmlFor="maxGroupSize">Maximum Group Size</FieldLabel>
            <Input
              id="maxGroupSize"
              name="maxGroupSize"
              placeholder="..."
              required
            />
            <InputFieldError field="maxGroupSize" state={state} />
          </Field>
          {/* image */}
          <Field>
            <FieldLabel htmlFor="file">Upload Image</FieldLabel>
            <Input
              id="file"
              name="file"
              type="file"
              accept="image/*"
              required
            />
            <InputFieldError field="file" state={state} />
          </Field>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TourFormDialog;
