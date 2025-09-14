import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { GraphQLProvider } from "@/lib/apollo-provider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const messages = await getMessages();
  const layout = messages.layout as
    | { title?: string; description?: string }
    | undefined;

  return {
    title: layout?.title || "Radiant",
    description: layout?.description || "Global Technical and Career Insights",
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale
  const locales = ["ko", "ja", "zh", "en"];
  if (!locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider messages={messages}>
          <GraphQLProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </GraphQLProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
