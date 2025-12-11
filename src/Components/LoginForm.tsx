export { default } from "@/Components/LoginForm";
"use client";

import { useActionState, useEffect } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { loginUser } from "@/services/auth/loginUser";
import { toast } from "sonner";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    } else {
      return null;
    }
  };
  // console.log(state);
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        {redirect && <input type="hidden" name="redirect" value={redirect} />}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          {/* FIX: Added name="email" */}
          <Input id="email" name="email" type="email" />
          <FieldDescription className="sr-only">Your email</FieldDescription>
          {getFieldError("email") && (
            <FieldDescription className="text-red-500">
              {getFieldError("email")}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">password</FieldLabel>
          {/* FIX: Added name="password" */}
          <Input id="password" name="password" type="password" />
          {getFieldError("password") && (
            <FieldDescription className="text-red-500">
              {getFieldError("password")}
            </FieldDescription>
          )}
        </Field>

        {/* Submit Button Group */}
        <FieldGroup>
          <Field>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Login..." : "Login"}
            </Button>

            <FieldDescription>
              Don't have an account?{" "}
              <a href="/register" className="text-indigo-600 hover:underline">
                Sign up
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
