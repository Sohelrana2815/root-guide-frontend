/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useActionState, useState } from "react";
import { registerUser } from "@/services/auth/registerUser";

const RegisterForm = () => {
  // Form action state
  const [state, formAction, isPending] = useActionState(registerUser, null);
  // state for role

  const [role, setRole] = useState<"TOURIST" | "GUIDE">("TOURIST");
  // get field error message
  const getFieldError = (fieldName: string) => {
    if (!state || !state.errors) return null;
    const error = state.errors.find((err: any) => err.field === fieldName);
    return error ? String(error.message) : null;
  };

  const nameError = getFieldError("name");
  const emailError = getFieldError("email");
  const passwordError = getFieldError("password");
  const roleError = getFieldError("role");

  console.log("State: ", state);
  return (
    <form action={formAction} className="flex items-center">
      {/* include role in form data with hidden input  field*/}
      <input type="hidden" name="role" value={role} />
      <FieldGroup>
        {/* name */}
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
          />
          {nameError && (
            <FieldDescription className="text-red-600">
              {nameError}
            </FieldDescription>
          )}
        </Field>
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
        {/* choose role (tourist/guide) */}
        <Field>
          <FieldLabel>Choose your role</FieldLabel>
          <RadioGroup
            defaultValue={role}
            onValueChange={(v) => setRole(v as "TOURIST" | "GUIDE")}
          >
            <FieldLabel>Choose your role</FieldLabel>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="TOURIST" id="tourist" />
              <Label htmlFor="tourist" className="cursor-pointer">
                Tourist
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="GUIDE" id="guide" />
              <Label htmlFor="guide" className="cursor-pointer">
                Guide
              </Label>
            </div>
          </RadioGroup>
          {roleError && (
            <FieldDescription className="text-red-600">
              {roleError}
            </FieldDescription>
          )}
        </Field>
        {/* submit button */}
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating account..." : "Create Account"}
            </Button>
            <FieldDescription>
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400">
                Login
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
