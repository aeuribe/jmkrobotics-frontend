import Home from "./features/Home/Home";
import type { Metadata } from "next";

// Correctly typed generateMetadata with params awaited
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;


  return {
    title: "JMK Robotics – Industrial Automation & Packaging Solutions",
    description:
      "JMK Robotics specializes in advanced industrial machines and automation solutions for manufacturing, packaging, and technology innovation.",
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
  };
}

// Page component
export default function HomePage() {
  return <Home />;
}
