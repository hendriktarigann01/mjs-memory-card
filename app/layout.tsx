import type { Metadata } from "next";
import { Chewy } from "next/font/google"; // Import Chewy
import "./globals.css";

const chewy = Chewy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-chewy",
  display: "swap",
});

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
    <html lang="en" className={chewy.variable}>
      <body className="font-chewy antialiased bg-[#0169dc]">
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
