import Link from "next/link";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
const SpecialOffer = () => {
  return (
    <section
      className="relative w-full min-h-[60vh] flex items-center justify-center bg-fixed bg-center bg-cover text-center text-white px-4 my-20"
      style={{
        // Placeholder image - replace with your actual image path later
        backgroundImage: "url('/images/guide.jpg')",
      }}
    >
      {/* Dark overlay to ensure text readability over any image */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto max-w-3xl">
        {/* Decorative pre-title */}
        <span className="block text-blue-400 font-bold tracking-widest uppercase mb-4 text-sm">
          — Holiday Package Offer
        </span>

        {/* Main Title */}
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          HOLIDAY SPECIAL 25% OFF!
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-white/90 mb-10 leading-relaxed">
          Sign up now to receive hot special offers and information about the
          best tour packages, updates and discounts!!
        </p>

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          className="bg-red-500 hover:bg-red-600 text-white font-bold text-lg px-10 py-6 rounded-sm transition-all"
        >
          <Link href="/register">SIGN UP NOW!</Link>
        </Button>
      </div>
    </section>
  );
};

export default SpecialOffer;
