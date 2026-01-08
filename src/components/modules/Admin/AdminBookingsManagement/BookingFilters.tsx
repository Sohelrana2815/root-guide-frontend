"use client";

import RefreshButton from "@/components/shared/managementTables/RefreshButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const BookingFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  const debouncedSearch = useDebounce(searchTerm, 500);

  // ফিল্টার আপডেট ফাংশন
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1"); // ফিল্টার চেঞ্জ করলে ১ নম্বর পেজে নিয়ে যাবে

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  useEffect(() => {
    updateFilter("searchTerm", debouncedSearch);
  }, [debouncedSearch]);

  const clearFilters = () => {
    setSearchTerm("");
    router.push(window.location.pathname);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 w-full bg-card p-4 rounded-lg border">
      {/* Search Input */}
      <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by Name or TXN ID..."
          className="pl-10 h-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Status Filter */}
      <Select
        value={searchParams.get("status") || "all"}
        onValueChange={(v) => updateFilter("status", v)}
      >
        <SelectTrigger className="w-[150px] h-10">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="PAID">Paid</SelectItem>
          <SelectItem value="CONFIRMED">Confirmed</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
          <SelectItem value="CANCELLED">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {/* Date Range Filter */}
      <Select
        value={searchParams.get("days") || "all"}
        onValueChange={(v) => updateFilter("days", v)}
      >
        <SelectTrigger className="w-[150px] h-10">
          <SelectValue placeholder="Time Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="7">Last 7 Days</SelectItem>
          <SelectItem value="30">Last 30 Days</SelectItem>
        </SelectContent>
      </Select>

      {/* Active/Deleted Toggles */}
      <Select
        value={searchParams.get("isDeleted") || "false"}
        onValueChange={(v) => updateFilter("isDeleted", v)}
      >
        <SelectTrigger className="w-[130px] h-10">
          <SelectValue placeholder="Deleted" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="false">Active Only</SelectItem>
          <SelectItem value="true">Trashed</SelectItem>
        </SelectContent>
      </Select>

      <RefreshButton variant="outline" />

      {searchParams.toString() && (
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="text-destructive h-10"
        >
          <X className="h-4 w-4 mr-1" /> Clear
        </Button>
      )}
    </div>
  );
};

export default BookingFilters;
