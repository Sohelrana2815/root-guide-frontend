"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useActionState, useEffect, useState, startTransition } from "react";
import { loginUser } from "@/services/auth/loginUser";
import { toast } from "sonner";
import InputFieldError from "../shared/InputFieldError";
import AdminCredentialsFiller from "@/utils/AdminCredentialsFiller";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //

  const handleAutoFill = (credentials: { email: string; password: string }) => {
    setFormData(credentials);
    toast.success("Admin credentials filled!");
  };

  useEffect(() => {
    if (state?.success) {
      // Use startTransition to avoid sync cascading-render warning
      startTransition(() => {
        setFormData({ email: "", password: "" });
      });
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("Action state:", state);

  return (
    <form action={formAction}>
      <AdminCredentialsFiller onFill={handleAutoFill} />
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
      <FieldGroup>
        {/* email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />

          <InputFieldError field="email" state={state} />
        </Field>
        {/* password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Enter your password"
          />
          <InputFieldError field="password" state={state} />
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
