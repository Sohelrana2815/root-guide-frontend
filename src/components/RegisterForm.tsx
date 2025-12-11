export { default } from "@/Components/RegisterForm";
"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { registerUser } from "@/services/auth/registerUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
const PLACEHOLDER_VALUE = "PLACEHOLDER_INVALID";
const RegisterForm = () => {
  const [role, setRole] = useState(PLACEHOLDER_VALUE);
  const [state, formAction, isPending] = useActionState(registerUser, null);

  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    } else {
      return null;
    }
  };

  const handleSubmit = (formData: FormData) => {
    // Append the selected role value (controlled by useState) to the FormData
    formData.append("role", role);
    formAction(formData);
  };
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={handleSubmit} className="space-y-6">
      {" "}
      <FieldGroup>
        {/* name field */}
        <Field>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input id="name" name="name" />
          <FieldDescription>
            This appears on invoices and emails.
          </FieldDescription>
          {getFieldError("name") && (
            <FieldDescription className="text-red-500">
              {getFieldError("name")}
            </FieldDescription>
          )}
        </Field>

        {/* Email Field */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" />
          {getFieldError("email") && (
            <FieldDescription className="text-red-500">
              {getFieldError("email")}
            </FieldDescription>
          )}
        </Field>

        {/* Password Field */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" name="password" type="password" />
          {getFieldError("password") && (
            <FieldDescription className="text-red-500">
              {getFieldError("password")}
            </FieldDescription>
          )}
        </Field>

        {/* 🌟  SELECT FIELD 🌟 */}
        <Field>
          <FieldLabel htmlFor="role">Role</FieldLabel>
          <Select
            value={role}
            onValueChange={setRole}
            defaultValue={PLACEHOLDER_VALUE}
          >
            <SelectTrigger id="role" className="w-full">
              <SelectValue placeholder="Select a Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={PLACEHOLDER_VALUE} disabled>
                Select a Role
              </SelectItem>
              <SelectItem value="TOURIST">Tourist</SelectItem>
              <SelectItem value="GUIDE">Guide</SelectItem>
            </SelectContent>
          </Select>
          {getFieldError("role") && (
            <FieldDescription className="text-red-500">
              {getFieldError("role")}
            </FieldDescription>
          )}
        </Field>

        {/* Submit Button Group */}
        <FieldGroup>
          <Field>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <FieldDescription>
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 hover:underline">
                Sign in
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
