"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createAdmin } from "@/services/auth/registerUser";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

const CreateAdminForm = () => {
  const [state, formAction, isPending] = useActionState(createAdmin, null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Reset form on successful Admin Creation (use startTransition to avoid the React warning)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Admin created successfully!");
      startTransition(() => {
        setFormData({ name: "", email: "", password: "" });
      });
    }
  }, [state]);

  // show toast on error

  useEffect(() => {
    if (state && !state?.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="role" value="ADMIN" />
      <FieldGroup className="space-y-4">
        {/* Full Name */}
        <Field className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="name">Admin Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter full name"
            autoComplete="off"
            className="h-11 focus:border-blue-500"
          />
          <InputFieldError field="name" state={state} />
        </Field>

        {/* Admin Email */}
        <Field className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="admin@example.com"
            className="h-11 focus:border-blue-500"
            autoComplete="off"
          />
          <InputFieldError field="email" state={state} />
        </Field>
        {/* Temporary Password */}
        <Field className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Enter password"
            className="h-11 focus:border-blue-500"
          />
        </Field>
        <InputFieldError field="password" state={state} />
      </FieldGroup>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 text-base font-semibold bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
        >
          {isPending ? "Creating admin account..." : "Create Admin Account"}
        </Button>
      </div>
    </form>
  );
};

export default CreateAdminForm;
