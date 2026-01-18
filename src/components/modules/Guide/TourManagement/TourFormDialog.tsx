/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { EXPERTISE_OPTIONS } from "@/constant/expertise";
import { LANGUAGES } from "@/constant/languages";
import { createTour, updateTour } from "@/services/guide/toursManagement";
import { ITour } from "@/types/tour.interface";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormPersistence } from "@/hooks/useFormPersistence";
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
    null,
  );

  // 1. Draft state for the whole form (controlled) so we can persist it easily
  const defaultDraft = {
    title: "",
    description: "",
    itinerary: "",
    category: "",
    selectedLanguages: [] as string[],
    selectedExpertise: [] as string[],
    city: "",
    price: "",
    duration: "",
    meetingPoint: "",
    maxGroupSize: "",
  };

  const [draft, setDraft] = useState(() => {
    if (isEdit && tour) {
      return {
        title: tour.title ?? "",
        description: tour.description ?? "",
        itinerary: tour.itinerary ?? "",
        category: tour.category ?? "",
        selectedLanguages: Array.isArray(tour.languages)
          ? [...new Set(tour.languages)]
          : [],
        selectedExpertise: Array.isArray(tour.expertise)
          ? [...new Set(tour.expertise)]
          : [],
        city: tour.city ?? "",
        price: tour.price != null ? String(tour.price) : "",
        duration: tour.duration != null ? String(tour.duration) : "",
        meetingPoint: tour.meetingPoint ?? "",
        maxGroupSize:
          tour.maxGroupSize != null ? String(tour.maxGroupSize) : "",
      } as typeof defaultDraft;
    }
    return defaultDraft as typeof defaultDraft;
  });
  // Track manual submit to show toasts only when user actually submitted
  const hasSubmittedRef = useRef(false);

  // Persist draft on error and clear on success
  const storageKey = `tour-form-draft${isEdit && tourId ? `-${tourId}` : ""}`;
  useFormPersistence(state, draft, setDraft, {
    storageKey,
    resetOnSuccess: true,
    useSessionStorage: true,
    onRestore: (parsed) => {
      // parsed may be either the full draft shape or a legacy shape
      const restored = parsed || {};
      setDraft((prev) => ({ ...prev, ...(restored as any) }));
    },
  });

  // Keep existing success/error UI behavior
  useEffect(() => {
    if (!open || !state || !hasSubmittedRef.current) return;

    if (state?.success) {
      toast.success(state.message);
      hasSubmittedRef.current = false;
      onSuccess();
      onClose();
      setDraft(defaultDraft);
    } else if (state.success === false) {
      const firstError = state.errors?.[0]?.message;
      const displayMessage =
        firstError || state.message || "Something went wrong";
      toast.error(displayMessage);
      hasSubmittedRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, onSuccess, onClose, open]);

  // When opening dialog for edit, ensure draft is populated from tour if available
  useEffect(() => {
    if (!open) return;
    if (isEdit && tour) {
      setDraft((prev) => ({
        ...prev,
        ...{
          title: tour.title ?? "",
          description: tour.description ?? "",
          itinerary: tour.itinerary ?? "",
          category: tour.category ?? "",
          selectedLanguages: Array.isArray(tour.languages)
            ? [...new Set(tour.languages)]
            : [],
          selectedExpertise: Array.isArray(tour.expertise)
            ? [...new Set(tour.expertise)]
            : [],
          city: tour.city ?? "",
          price: tour.price != null ? String(tour.price) : "",
          duration: tour.duration != null ? String(tour.duration) : "",
          meetingPoint: tour.meetingPoint ?? "",
          maxGroupSize:
            tour.maxGroupSize != null ? String(tour.maxGroupSize) : "",
        },
      }));
    } else {
      setDraft(defaultDraft);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isEdit, tour]);
  // wrapper to set flag and run action
  const handleSubmit = async (formData: FormData) => {
    // Hidden inputs (rendered below) already supply languages/expertise entries to the FormData.
    // No need to append again here (keeps no duplicates).
    hasSubmittedRef.current = true;
    formAction(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Tour" : "Add New Tour"}</DialogTitle>
        </DialogHeader>

        {/* Use browser-managed FormData (uncontrolled inputs) — use defaultValue to prefill edit mode */}
        <form
          key={`${isEdit ? "edit" : "create"}-${tourId || "new"}`}
          action={handleSubmit}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Hidden inputs for languages */}
            {Array.from(new Set(draft.selectedLanguages || [])).map((lang) => (
              <input
                key={`lang-hidden-${lang}`}
                type="hidden"
                name="languages"
                value={lang}
              />
            ))}
            {(draft.selectedExpertise || []).map((exp) => (
              <input
                key={`exp-hidden-${exp}`}
                type="hidden"
                name="expertise"
                value={exp}
              />
            ))}

            {/* Title (uncontrolled) */}
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                name="title"
                placeholder="e.g., Hands-on Scavenger Hunt"
                value={draft.title ?? ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, title: e.target.value }))
                }
              />
              <InputFieldError state={state} field="title" />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                name="description"
                type="text"
                placeholder="Short description"
                value={draft.description ?? ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, description: e.target.value }))
                }
              />
              <InputFieldError state={state} field="description" />
            </Field>

            <Field>
              <FieldLabel htmlFor="itinerary">Itinerary</FieldLabel>
              <Input
                name="itinerary"
                type="text"
                placeholder="Itinerary"
                value={draft.itinerary ?? ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, itinerary: e.target.value }))
                }
              />
              <InputFieldError state={state} field="itinerary" />
            </Field>

            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <Input
                name="category"
                type="text"
                placeholder="Category"
                value={draft.category ?? ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, category: e.target.value }))
                }
              />
              <InputFieldError state={state} field="category" />
            </Field>

            <Field>
              <FieldLabel>Languages you speak</FieldLabel>
              <MultiSelect
                values={draft.selectedLanguages}
                onValuesChange={(values) =>
                  setDraft((d) => ({
                    ...d,
                    selectedLanguages: Array.isArray(values)
                      ? values
                      : [values],
                  }))
                }
              >
                <MultiSelectTrigger className="w-full">
                  <MultiSelectValue placeholder="Select languages" />
                </MultiSelectTrigger>
                <MultiSelectContent>
                  <MultiSelectGroup>
                    {LANGUAGES.map((lang) => (
                      <MultiSelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>
              <InputFieldError field="languages" state={state} />
            </Field>

            <Field>
              <FieldLabel>Expertise (what you offer)</FieldLabel>
              <MultiSelect
                values={draft.selectedExpertise}
                onValuesChange={(values) =>
                  setDraft((d) => ({
                    ...d,
                    selectedExpertise: Array.isArray(values)
                      ? values
                      : [values],
                  }))
                }
              >
                <MultiSelectTrigger className="w-full">
                  <MultiSelectValue placeholder="Select expertise" />
                </MultiSelectTrigger>
                <MultiSelectContent>
                  <MultiSelectGroup>
                    {EXPERTISE_OPTIONS.map((opt) => (
                      <MultiSelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>
              <InputFieldError field="expertise" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input
                name="city"
                placeholder="City"
                value={draft.city ?? ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, city: e.target.value }))
                }
              />
              <InputFieldError state={state} field="city" />
            </Field>

            <Field>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                name="price"
                type="number"
                placeholder="e.g., 30"
                value={draft.price ?? ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, price: e.target.value }))
                }
              />
              <InputFieldError state={state} field="price" />
            </Field>

            <Field>
              <FieldLabel htmlFor="duration">Duration (hours)</FieldLabel>
              <Input
                name="duration"
                type="number"
                placeholder="e.g., 4.5"
                value={draft.duration ?? ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, duration: e.target.value }))
                }
              />
              <InputFieldError state={state} field="duration" />
            </Field>

            <Field>
              <FieldLabel htmlFor="meetingPoint">Meeting Point</FieldLabel>
              <Input
                name="meetingPoint"
                placeholder="Meeting point"
                value={draft.meetingPoint ?? ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, meetingPoint: e.target.value }))
                }
              />
              <InputFieldError state={state} field="meetingPoint" />
            </Field>

            <Field>
              <FieldLabel htmlFor="maxGroupSize">Maximum Group Size</FieldLabel>
              <Input
                name="maxGroupSize"
                type="number"
                placeholder="e.g., 16"
                value={draft.maxGroupSize ?? ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, maxGroupSize: e.target.value }))
                }
                min="0"
              />
              <InputFieldError state={state} field="maxGroupSize" />
            </Field>

            {/* file input only for create */}
            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="file">Image</FieldLabel>
                <Input name="file" type="file" accept="image/*" />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a photo for the tour
                </p>
                <InputFieldError state={state} field="file" />
              </Field>
            )}
          </div>

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
