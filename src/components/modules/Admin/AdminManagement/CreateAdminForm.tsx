"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const CreateAdminForm = () => {
  return (
    <form className="space-y-6">
      <FieldGroup className="space-y-4">
        {/* Full Name */}
        <Field className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            placeholder="e.g. Abdullah Al Mamun"
            className="h-11 border-slate-200 focus:border-blue-500"
          />
        </Field>

        {/* Admin Email */}
        <Field className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="admin@company.com"
            className="h-11 border-slate-200 focus:border-blue-500"
          />
        </Field>

        {/* Temporary Password */}
        <Field className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="password">Temporary Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="h-11 border-slate-200 focus:border-blue-500"
          />
        </Field>

        {/* Admin Role/Designation (Optional Design) */}
        <Field className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="designation">Designation</FieldLabel>
          <Input
            id="designation"
            placeholder="e.g. Senior Moderator"
            className="h-11 border-slate-200 focus:border-blue-500"
          />
        </Field>
      </FieldGroup>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          className="w-full h-11 text-base font-semibold bg-primary 
        hover:bg-blue-800
        shadow-md"
        >
          Create Admin Account
        </Button>
      </div>
    </form>
  );
};

export default CreateAdminForm;
