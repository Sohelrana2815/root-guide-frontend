// utils/filterHelpers.ts

import { ReadonlyURLSearchParams } from "next/navigation";

/**
 * Counts active filters from URL search params.
 * Rules:
 * - searchTerm → 1 if exists
 * - category → 1 if exists and not "all"
 * - language → counted by number of occurrences
 */
export const getActiveFilterCount = (
  searchParams: ReadonlyURLSearchParams
): number => {
  const searchCount = searchParams.get("searchTerm") ? 1 : 0;

  const category = searchParams.get("category");
  const categoryCount = category && category !== "all" ? 1 : 0;

  const languageCount = searchParams.getAll("language").length;

  return searchCount + categoryCount + languageCount;
};

/**
 * Clears all filters by navigating to pathname only
 */
export const clearFilters = (
  router: { push: (url: string) => void },
  pathname: string
) => {
  router.push(pathname);
};
