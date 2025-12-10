"use client";
import { Button } from "@/Components/ui/button";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const handleNavaigate = () => {
    router.push("/dashboard");
  };
  return (
    <>
      <div className="text-center min-h-screen flex  flex-col justify-center items-center">
        <h1>Welcome to Next.JS Application</h1>

        <button
          type="button"
          className="block flex-col border px-10 py-4 rounded-xl bg-cyan-600 cursor-pointer"
          onClick={handleNavaigate}
        >
          Go to dashboard
        </button>
        <Button>Click</Button>
      </div>
    </>
  );
};

export default HomePage;
