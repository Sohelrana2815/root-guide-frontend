import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LogoutSuccessToast from "@/components/shared/LogoutSuccessToast";
import LoginSuccessToast from "@/components/shared/LoginSuccessToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Root Guide",
  description:
    "A user-friendly travel platform that helps tourists book reliable local guides, discover top attractions, and experience destinations like a local.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className}`}
        // {`${geistSans.variable} ${geistMono.variable} antialiased`}f
      >
        {children}
        <Toaster position="top-right" richColors />
        <LoginSuccessToast />
        <LogoutSuccessToast />
      </body>
    </html>
  );
}
