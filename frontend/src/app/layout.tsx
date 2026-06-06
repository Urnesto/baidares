import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asvėjos baidarių centras",
  description: "Guided and self-paced kayak journeys through the Žemaitija regional park.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt">
      <body className="min-h-screen" suppressHydrationWarning>{children}</body>
    </html>
  );
}
