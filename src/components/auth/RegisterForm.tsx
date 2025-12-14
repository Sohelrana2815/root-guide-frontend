"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const RegisterForm = () => {
  return (
    <form className="flex items-center">
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
        </Field>
        {/* choose role (tourist/guide) */}
        <RadioGroup defaultValue="TOURIST">
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
        {/* submit button */}
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit">Create Account</Button>
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
