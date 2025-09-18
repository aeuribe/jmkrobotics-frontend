import Home from "./features/Home/Home";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  return {
    title: "JMK Robotics – Industrial Automation & Packaging Solutions",
    description:
      "JMK Robotics specializes in advanced industrial machines and automation solutions for manufacturing, packaging, and technology innovation.",
  };
}

export default function HomePage() {
  return <Home />;
}
