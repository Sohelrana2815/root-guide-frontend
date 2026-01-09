"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface SelectFilterProps {
  paramName: string;
  placeholder?: string;
  options: { label: string; value: string }[];
}

const SelectFilter = ({
  paramName,
  placeholder = "Select",
  options,
}: SelectFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // URL থেকে বর্তমান ভ্যালু নেওয়া, না থাকলে "All"
  const currentValue = searchParams.get(paramName) || "All";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "All") {
      params.delete(paramName);
    } else {
      params.set(paramName, value);
    }

    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <Select
      value={currentValue}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px] bg-background">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {/* এখানে হার্ডকোডেড "All" এর বদলে placeholder ব্যবহার করা হয়েছে */}
        <SelectItem value="All">{placeholder}</SelectItem>

        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
