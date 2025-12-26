import z from "zod";

export const registerValidationZodSchema = z
  .object({
    name: z
      .string()
      .nonempty({ error: "Name is required." })
      .min(3, { error: "Name must be at least 3 characters long." })
      .max(50, { error: "Name cannot exceed 50 characters." }),
    email: z
      .email("Please provide a valid email")
      .nonempty("Email is required"),

    password: z
      .string()
      .nonempty({ error: "Password is required." })
      .min(6, { error: "Password must be at least 6 characters long." })
      .max(50, { error: "Password cannot exceed 50 characters." }),
    role: z.enum(["TOURIST", "GUIDE"], { error: "Role is required." }),
    languages: z
      .array(z.string())
      .min(1, { message: "At least one language is required." }),
    expertise: z.array(z.string()).optional(),
  })
  .refine(
    (data) =>
      data.role !== "GUIDE" ||
      (Array.isArray(data.expertise) && data.expertise.length > 0),
    {
      message: "At least one expertise is required for guides.",
      path: ["expertise"],
    }
  );

export const loginValidationZodSchema = z.object({
  email: z.email("Please provide a valid email").nonempty("Email is required"),

  password: z
    .string()
    .nonempty({ message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(50, { message: "Password cannot exceed 50 characters." }),
});
