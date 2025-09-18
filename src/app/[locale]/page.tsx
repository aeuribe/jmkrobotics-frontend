import Home from "./features/Home/Home";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: "JMK Robotics – Industrial Automation & Packaging Solutions",
    description:
      "JMK Robotics specializes in advanced industrial machines and automation solutions for manufacturing, packaging, and technology innovation.",
  };
}

export default function HomePage() {
  return <Home />;
}
