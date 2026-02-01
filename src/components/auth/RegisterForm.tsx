"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useActionState, useEffect, useState, startTransition } from "react";
import { registerUser } from "@/services/auth/registerUser";
import { toast } from "sonner";
import InputFieldError from "../shared/InputFieldError";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "../ui/multi-select";
import { LANGUAGES } from "@/constant/languages";
import { EXPERTISE_OPTIONS } from "@/constant/expertise";
const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState<"TOURIST" | "GUIDE">("TOURIST");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);

  // Reset form on successful registration (use startTransition to avoid the React warning)
  useEffect(() => {
    if (state?.success) {
      startTransition(() => {
        setFormData({ name: "", email: "", password: "" });
        setRole("TOURIST");
        setSelectedLanguages([]);
        setSelectedExpertise([]);
      });
    }
  }, [state]);
  // show toast on error
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // console.log("State: ", state);
  // console.log("Selected languages client:", selectedLanguages);
  return (
    <form
      action={formAction}
      onSubmit={() => {
        console.log(
          "Submitting selectedLanguages (client):",
          selectedLanguages,
        );
        console.log(
          "Submitting selectedExpertise (client):",
          selectedExpertise,
        );
      }}
      className="flex items-center"
    >
      <input type="hidden" name="role" value={role} />

      {/* hidden inputs for languages */}
      {selectedLanguages.length > 0 &&
        Array.from(new Set(selectedLanguages)).map((lang) => (
          <input
            key={`lang-${lang}`}
            type="hidden"
            name="languages"
            value={lang}
          />
        ))}
      {/* hidden inputs for expertise */}
      {selectedLanguages.length > 0 &&
        Array.from(new Set(selectedExpertise)).map((exp) => (
          <input
            key={`exp-${exp}`}
            type="hidden"
            name="expertise"
            value={exp}
          />
        ))}
      <FieldGroup>
        {/* name */}
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
          <InputFieldError field="name" state={state} />
        </Field>
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
        {/* role */}
        <Field>
          <RadioGroup
            defaultValue={role}
            onValueChange={(v) => {
              const newRole = v as "TOURIST" | "GUIDE";
              setRole(newRole);
              // Clear expertise when switching away from GUIDE
              if (newRole !== "GUIDE") setSelectedExpertise([]);
            }}
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
          <InputFieldError field="role" state={state} />
        </Field>

        {/* languages (required for all) */}
        <Field>
          <FieldLabel>Languages you speak</FieldLabel>
          <MultiSelect
            values={selectedLanguages}
            onValuesChange={(values) =>
              setSelectedLanguages(Array.isArray(values) ? values : [values])
            }
          >
            <MultiSelectTrigger className="w-full">
              <MultiSelectValue placeholder="Select languages" />
            </MultiSelectTrigger>

            <MultiSelectContent>
              <MultiSelectGroup>
                {LANGUAGES.map((lang) => (
                  <MultiSelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </MultiSelectItem>
                ))}
              </MultiSelectGroup>
            </MultiSelectContent>
          </MultiSelect>
          <InputFieldError field="languages" state={state} />
        </Field>
        {/* expertise (only for GUIDE in UI) */}
        {role === "GUIDE" && (
          <Field>
            <FieldLabel>Expertise (what you offer)</FieldLabel>
            <MultiSelect
              values={selectedExpertise}
              onValuesChange={(values) =>
                setSelectedExpertise(Array.isArray(values) ? values : [values])
              }
            >
              <MultiSelectTrigger className="w-full">
                <MultiSelectValue placeholder="Select expertise" />
              </MultiSelectTrigger>

              <MultiSelectContent>
                <MultiSelectGroup>
                  {EXPERTISE_OPTIONS.map((opt) => (
                    <MultiSelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MultiSelectItem>
                  ))}
                </MultiSelectGroup>
              </MultiSelectContent>
            </MultiSelect>
            <InputFieldError field="expertise" state={state} />
          </Field>
        )}
        {/* submit button */}
        <FieldGroup className="mt-4">
          <Field>
            <Button
              type="submit"
              disabled={isPending || selectedLanguages.length === 0}
            >
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
