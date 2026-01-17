"use client";
import { useRef } from "react";

export const useDatePicker = () => {
  // Use HTMLInputElement type to fix the 'never' error
  const dateInputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    if (dateInputRef.current) {
      // showPicker() is the modern standard
      if ("showPicker" in HTMLInputElement.prototype) {
        dateInputRef.current.showPicker();
      } else {
        // Fallback for older browsers
        dateInputRef.current.click();
      }
    }
  };

  return { dateInputRef, openPicker };
};
