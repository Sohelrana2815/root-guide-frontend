/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { startTransition } from "react";

type StorageKey = string;
type SetFormFn<T> = (val: T | ((prev: T) => T)) => void;

interface Options {
  storageKey: StorageKey;
  resetOnSuccess?: boolean; // default true
  useSessionStorage?: boolean; // default true
  /**
   * Optional callback to apply restored data.
   * Useful when your component keeps multiple state variables
   * (e.g. formData, role, selectedLanguages).
   * If provided, the hook will call onRestore(parsed) instead of calling setFormData(parsed).
   */
  onRestore?: (parsed: any) => void;
}

/**
 * Persist form data on error, reset on success.
 *
 * - `state`: your action state returned by useActionState
 * - `formData`: current form data object (or an object representing combined state)
 * - `setFormData`: setter returned from useState in the component (only used if onRestore not provided)
 * - `options`: storageKey, etc. Optionally provide onRestore to apply parsed data to multiple states.
 */
export function useFormPersistence<T extends Record<string, any>>(
  state: any,
  formData: T,
  setFormData: SetFormFn<T>,
  options: Options
) {
  const {
    storageKey,
    resetOnSuccess = true,
    useSessionStorage = true,
    onRestore,
  } = options;
  const storage = useSessionStorage ? sessionStorage : localStorage;
  const prevSuccessRef = useRef<boolean | undefined>(undefined);

  // Load persisted data on mount
  useEffect(() => {
    try {
      const raw = storage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as T;
        // Only restore if current form is empty-ish
        const isEmpty = Object.values(formData).every(
          (v) => v === "" || v == null || (Array.isArray(v) && v.length === 0)
        );
        if (isEmpty) {
          startTransition(() => {
            if (onRestore) onRestore(parsed);
            else setFormData(parsed);
          });
        }
      }
    } catch {
      // ignore parse errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // Persist on error, reset on success
  useEffect(() => {
    if (!state) return;
    // Only act when success state transitions (avoid loops caused by
    // calling setFormData/onRestore which changes formData and retriggers
    // this effect). Track previous success and only run reset once.
    if (state?.success) {
      if (prevSuccessRef.current === true) return;
      prevSuccessRef.current = true;
      if (resetOnSuccess) {
        try {
          storage.removeItem(storageKey);
        } catch {}
        startTransition(() => {
          // reset to empty object (component can provide default)
          if (onRestore) onRestore({} as T);
          else setFormData({} as T);
        });
      }
    } else if (state && !state.success) {
      prevSuccessRef.current = false;
      // persist current form values on error
      try {
        storage.setItem(storageKey, JSON.stringify(formData));
      } catch {}
    }
  }, [
    state,
    formData,
    setFormData,
    storageKey,
    resetOnSuccess,
    storage,
    onRestore,
  ]);
}
