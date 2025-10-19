import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Radiant",
  description: "Global Technical and Career Insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
