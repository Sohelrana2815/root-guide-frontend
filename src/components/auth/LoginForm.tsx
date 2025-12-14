"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

const LoginForm = () => {
  return (
    <form>
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
        {/* submit button */}
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit">Login</Button>
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
