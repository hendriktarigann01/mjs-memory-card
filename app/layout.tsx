import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-courier antialiased">
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
