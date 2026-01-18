import z from "zod";

export const createTourZodSchema = z.object({
  // 1. Basic Details
  title: z
    .string({ error: "Title is required" })
    .trim()
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string({ error: "Description is required" })
    .trim()
    .min(10, "Description must be at least 10 characters long"),

  itinerary: z
    .string({ error: "Itinerary is required" })
    .trim()
    .min(10, "Itinerary details must be provided"),

  // 2. Search & Filter Fields
  category: z.string().trim().min(1, { error: "Category is required" }),

  city: z.string().trim().min(1, {
    error: "City is required",
  }),
  // new available Languages and expertise
  languages: z
    .array(z.string({ error: "Languages must be array of strings" }))
    .min(1, { error: "Give at least 1  language" }),
  expertise: z
    .array(z.string({ error: "Expertise must be array of strings" }))
    .min(1, { error: "Give at least 1 expertise" }),

  // 3. Logistics & Pricing
  price: z.coerce
    .number({ error: "Price is required" })
    .min(1, "Price must be at least 1"),

  duration: z
    .number({ error: "Duration is required" })
    .min(0.5, "Duration must be at least 30 minutes (0.5 hours)"),

  meetingPoint: z.string().trim().min(1, "Meeting point is required"),

  maxGroupSize: z
    .number({ error: "Max group size is required" })
    .int("Group size must be an integer")
    .min(1, "At least 1 guest is required"),

  // 4. Images
  image: z.url({ error: "At least one image is required" }).optional(),

  // 5. Optional Fields
  // Guide ID is typically handled by the auth middleware (req.user),
  // but if you send it in body, validate it as string here.
  // guideId: z.string().optional(),

  isActive: z.boolean().optional().default(true),
});
export const updateTourZodSchema = createTourZodSchema.partial();
