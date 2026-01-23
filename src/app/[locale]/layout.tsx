import type { Metadata } from "next";
import { satoshi } from "../fonts";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import PipedriveChat from "./components/pipedrive/PipedriveChat";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

// 🔹 Metadata dinámica según idioma
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>; // 👈 Tipo corregido
}): Promise<Metadata> {
  const { locale } = await params; // ✅ await necesario
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Robotics",
      "Industrial Machines",
      "Packaging",
      "Manufacturing",
      "Machinery",
      "Automation",
      "Technology",
      "Innovation",
    ],
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-icon.png",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // 👈 Tipo corregido
}) {
  const { locale } = await params; // ✅ await necesario

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          {children}
          <PipedriveChat key={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
