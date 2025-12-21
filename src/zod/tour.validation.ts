import z from "zod";

export const createTourZodSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters long." })
    .max(50, { error: "Title cannot exceed 50 characters." }),
  description: z
    .string()
    .min(3, { error: "Description must be at least 3 characters long." })
    .max(250, { error: "Description cannot exceed 50 characters." }),
  //   itinerary: z
  //     .string()
  //     .min(3, { error: "Itinerary must be at least 3 characters long." })
  //     .max(50, { error: "Itinerary cannot exceed 50 characters." }),
  //   category: z
  //     .string()
  //     .min(3, { error: "Category must be at least 3 characters long." })
  //     .max(50, { error: "Category cannot exceed 50 characters." }),
  //   city: z
  //     .string()
  //     .min(3, { error: "City must be at least 3 characters long." })
  //     .max(50, { error: "City cannot exceed 50 characters." }),
  //   price: z,
});