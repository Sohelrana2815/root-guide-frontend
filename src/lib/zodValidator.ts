import { ZodObject } from "zod";

export const zodValidator = <T>(payload: T, zodSchema: ZodObject) => {
  const validatedPayload = zodSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      errors: validatedPayload.error.issues.map((issue) => {
        return {
          field: issue.path[0],
          message: issue.message,
        };
      }),
    };
  }
  return {
    success: true,
    data: validatedPayload.data,
  };
};
