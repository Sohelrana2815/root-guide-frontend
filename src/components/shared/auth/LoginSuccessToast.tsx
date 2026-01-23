"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LoginSuccessToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("login") === "true") {
      toast.success("You have logged in successfully !", {
        position: "bottom-right",
      });
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("login");
      router.replace(newUrl.toString());
    }
  }, [searchParams, router]);

  return null;
};

export default LoginSuccessToast;
