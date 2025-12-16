/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useActionState, useEffect } from "react";
import { loginUser } from "@/services/auth/loginUser";
import { toast } from "sonner";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  // get field error message

  const getFieldError = (fieldName: string) => {
    if (!state || !state.errors) return null;
    const error = state.errors.find((err: any) => err.field === fieldName);
    return error ? String(error.message) : null;
  };
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const emailError = getFieldError("email");
  const passwordError = getFieldError("password");

  console.log("Action state:", state);

  return (
    <form action={formAction}>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
      <FieldGroup>
        {/* email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
          />
          {emailError && (
            <FieldDescription className="text-red-600">
              {emailError}
            </FieldDescription>
          )}
        </Field>
        {/* password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            placeholder="Enter your password"
          />
          {passwordError && (
            <FieldDescription className="text-red-600">
              {passwordError}
            </FieldDescription>
          )}
        </Field>
        {/* submit button */}
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
            <FieldDescription>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-400">
                Register
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
