import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { GraphQLProvider } from "@/lib/apollo-provider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
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

  const locales = ["ko", "ja", "zh", "en"];
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <GraphQLProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </GraphQLProvider>
    </NextIntlClientProvider>
  );
}
