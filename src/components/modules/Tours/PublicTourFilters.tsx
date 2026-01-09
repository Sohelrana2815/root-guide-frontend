"use client";

import SearchFilter from "@/components/shared/managementTables/SearchFilter";
import SelectFilter from "@/components/shared/managementTables/SelectFilter";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PublicTourFiltersProps {
  categories: string[];
  languages: string[];
}

const PublicTourFilters = ({
  categories,
  languages,
}: PublicTourFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryOptions = categories.map((c) => ({ label: c, value: c }));
  const languageOptions = languages.map((l) => ({ label: l, value: l }));

  const priceOptions = [
    { label: "Under $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "$200+", value: "200-9999" },
  ];

  // Price range selector লজিক
  const currentPriceRange = searchParams.get("minPrice")
    ? `${searchParams.get("minPrice")}-${searchParams.get("maxPrice")}`
    : "All";

  const handlePriceChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete("minPrice");
      params.delete("maxPrice");
    } else {
      const [min, max] = value.split("-");
      params.set("minPrice", min);
      params.set("maxPrice", max);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8 bg-muted/30 p-4 rounded-xl border">
      {/* Search by Title/City */}
      <div className="flex-1 min-w-[250px]">
        <SearchFilter placeholder="Search destination or tour..." />
      </div>

      {/* Category Filter (Single String) */}
      <SelectFilter
        paramName="category"
        placeholder="All Category"
        options={categoryOptions}
      />

      {/* Language Filter (Array in backend, but single selection here) */}
      <SelectFilter
        paramName="language"
        placeholder="All Language"
        options={languageOptions}
      />

      {/* Price Range Filter - Custom Implementation to use handlePriceChange */}
      <Select value={currentPriceRange} onValueChange={handlePriceChange}>
        <SelectTrigger className="w-[180px] bg-background">
          <SelectValue placeholder="Price Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">Any Price</SelectItem>
          {priceOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="ghost"
        onClick={() => router.push("/tours")}
        className="text-muted-foreground hover:text-destructive"
      >
        Reset
      </Button>
    </div>
  );
};

export default PublicTourFilters;
