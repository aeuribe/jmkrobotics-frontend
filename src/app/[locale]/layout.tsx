import type { Metadata } from "next";
import { satoshi } from "../fonts";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: { locale: string }; // <- ya no es Promise
};

// 🔹 Metadata estática (igual para todos los idiomas)
export const metadata: Metadata = {
  title: "JMK Robotics - Industrial Solutions",
  description:
    "JMK Robotics designs and supplies high-precision industrial checkweighers and automated weighing solutions. Visit our official website to explore our products and services.",
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
    title: "JMK Robotics - Industrial Solutions",
    description:
      "JMK Robotics designs and supplies high-precision industrial checkweighers and automated weighing solutions. Visit our official website to explore our products and services.",
    locale: "en",
    type: "website",
  },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
