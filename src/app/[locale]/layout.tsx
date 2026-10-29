import type { Metadata } from "next";
import { satoshi } from "../fonts";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";


import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google'

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
  params: Promise<{ locale: string }>; // 
}) {
  const { locale } = await params; // 

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${satoshi.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>

        <Script
          src="https://analytics.servicesjmk.com/script.js"
          data-website-id="b1ebe2cd-57c9-4e85-b145-066294c2a8ae"
          data-domains="jmkrobotics.com,www.jmkrobotics.com"
          strategy="afterInteractive"
        />
      </body>
      <GoogleAnalytics gaId="G-BYCEDB4F99" />
    </html>
  );
}
