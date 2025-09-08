import type { Metadata } from "next";
import { satoshi } from './fonts'
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";


const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JMK Robotics - Industrial Solutions",
  description: "Industrial Solutions for a Smarter Future",
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
    icon: "/favicon.ico", // Coloca tu favicon en public/
    apple: "/apple-icon.png", // opcional para dispositivos Apple
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${plusJakartaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
