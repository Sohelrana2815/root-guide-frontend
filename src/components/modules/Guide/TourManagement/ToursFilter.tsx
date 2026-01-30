"use client";
import RefreshButton from "@/components/shared/managementTables/RefreshButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { Check, ChevronsUpDown, Filter, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface ToursFilterProps {
  languages: string[];
  categories: string[];
}

const ToursFilter = ({ languages, categories }: ToursFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // --- Local States initialized from URL ---
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || "",
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || "all",
  );

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    searchParams.getAll("language"), // Matches your backend interface key: 'language'
  );
  const debouncedSearch = useDebounce(searchTerm, 500);

  // --- Effect 1: Sync Search and Category to URL ---
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Update params based on local state
    if (debouncedSearch) params.set("searchTerm", debouncedSearch);
    else params.delete("searchTerm");

    if (category !== "all") params.set("category", category);
    else params.delete("category");

    params.set("page", "1");

    // --- THE FIX: Only push if the string has actually changed ---
    const newQueryString = params.toString();
    const currentQueryString = searchParams.toString();

    if (newQueryString !== currentQueryString) {
      startTransition(() => {
        router.push(`?${newQueryString}`, { scroll: false });
      });
    }
  }, [debouncedSearch, category, router, searchParams]);

  // --- Language Handlers (Multi-select) ---
  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    );
  };

  const applyLanguageFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("language"); // Clear old ones
    selectedLanguages.forEach((lang) => params.append("language", lang));
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
    setOpen(false);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setCategory("all");
    setSelectedLanguages([]);
    router.push(window.location.pathname);
  };
  const activeFiltersCount =
    selectedLanguages.length +
    (debouncedSearch ? 1 : 0) +
    (category !== "all" ? 1 : 0);

  return (
    <div className="space-y-3 w-full bg-muted/30 p-4 rounded-xl border">
      <div className="flex flex-wrap items-center gap-3">
        {/* 1. Search Bar (Title, Itinerary, City) */}
        <div className="relative w-full lg:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tours..."
            className="pl-10 h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 2. Category Select (Single String) */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-45 h-10">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 3. Language Multi-Select */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-56 h-10 justify-between">
              <Filter className="mr-2 h-4 w-4" />
              {selectedLanguages.length > 0
                ? `${selectedLanguages.length} Languages`
                : "Select Languages"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No language found.</CommandEmpty>
                <CommandGroup>
                  {languages.map((lang) => {
                    const isSelected = selectedLanguages.includes(lang);
                    return (
                      <CommandItem
                        key={lang}
                        onSelect={() => toggleLanguage(lang)}
                      >
                        <Checkbox checked={isSelected} className="mr-2" />
                        {lang}
                        {isSelected && (
                          <Check className="ml-auto h-4 w-4 text-primary" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
              <div className="p-2 border-t">
                <Button
                  onClick={applyLanguageFilter}
                  className="w-full"
                  size="sm"
                  disabled={isPending}
                >
                  Apply Filters
                </Button>
              </div>
            </Command>
          </PopoverContent>
        </Popover>

        <RefreshButton />

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            className="text-destructive h-10"
          >
            <X className="h-4 w-4 mr-1" /> Clear ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Language Active Badges */}
      {selectedLanguages.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-1">
          {selectedLanguages.map((lang) => (
            <Badge
              key={lang}
              variant="secondary"
              className="pl-2 pr-1 py-1 flex items-center gap-1"
            >
              {lang}
              <button
                onClick={() => {
                  toggleLanguage(lang);
                  setTimeout(applyLanguageFilter, 0);
                }}
                className="hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToursFilter;
