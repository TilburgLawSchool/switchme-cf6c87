import React from "react";
import type { Metadata } from "https://esm.sh/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Portal | Tilburg University",
  description: "Manage your student preferences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}