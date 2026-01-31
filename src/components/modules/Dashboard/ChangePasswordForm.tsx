"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const ChangePasswordForm = () => {
  return (
    <form className="space-y-6 ">
      <FieldGroup className="space-y-4">
        {/* Old Password */}
        <Field className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="oldPassword">Current Password</FieldLabel>
          <Input
            id="oldPassword"
            type="password"
            placeholder="Enter current password"
            className="h-11  border border-foreground focus:ring-2 focus:ring-blue-500"
          />
        </Field>

        {/* New Password */}
        <Field className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            className="h-11 border border-foreground focus:ring-2 focus:ring-blue-500"
          />
        </Field>
      </FieldGroup>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          variant="default"
          className="w-full h-11 text-base font-semibold hover:bg-blue-800 transition-all shadow-md"
        >
          Update Password
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
