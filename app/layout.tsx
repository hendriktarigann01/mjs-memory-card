import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memory Master - Card Matching Game",
  description:
    "Train your memory and concentration with this fun card matching game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-neutral-950">
          {children}
        </div>
      </body>
    </html>
  );
}
