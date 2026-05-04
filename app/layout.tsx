import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
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
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-plus-jakarta antialiased bg-[#0169dc]">
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
