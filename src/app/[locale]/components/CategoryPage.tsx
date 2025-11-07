"use client";

import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "./header/Header";

interface Machine {
  id?: string;
  name: string;
  description: string;
  features: string[];
  image: string;
}

interface CategoryPageProps {
  categoryName: string;
  categoryDescription: string;
  machines: Machine[];
  onMachineSelect?: (machineId: string) => void;
}

// Internal Button Component
function Button({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`inline-flex items-center justify-center transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

// Internal Card Component
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`border ${className}`}>{children}</div>;
}

export function CategoryPage({
  categoryName,
  categoryDescription,
  machines,
}: CategoryPageProps) {
  const t = useTranslations("categoryPage");
  const params = useParams();
  const category = (params?.category as string) || "filling-dosing";

  return (
    <div className="min-h-screen bg-[#020C18]">
      <Header />
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-[#020C18] via-[#051425] to-[#020C18]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              {categoryName}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {categoryDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Machines Grid */}
      <section className="py-12 md:py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div
            className={`grid gap-6 md:gap-8 ${
              machines.length === 1
                ? "place-items-center" // ✅ 1 máquina → centrada
                : machines.length === 2
                ? "md:grid-cols-2 justify-center" // ✅ 2 máquinas → centradas en fila
                : "md:grid-cols-2 lg:grid-cols-3" // ✅ 3 o más → distribución normal
            }`}
          >
            {machines.map((machine, index) => (
              <Link
                key={index}
                href={machine.id ? `/machines/${category}/${machine.id}` : "#"}
              >
                <Card className="bg-gray-800/30 border-gray-700 overflow-hidden hover:border-red-500/50 transition-all group rounded-none cursor-pointer">
                  <div className="relative aspect-video bg-white overflow-hidden">
                    <Image
                      src={machine.image}
                      alt={machine.name}
                      fill
                      className="object-cover px-5 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* 🏷️ Marca de agua (logo JMK Robotics) */}
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 opacity-80">
                      <Image
                        src="/machines_jmkrobotics.png"
                        alt="JMK Robotics Logo"
                        width={90} // tamaño base (mobile)
                        height={60}
                        className="
                                    object-contain pointer-events-none select-none
                                    sm:w-[110px] sm:h-[80px]
                                    md:w-[140px] md:h-[100px]
                                    transition-all duration-300
                                  "
                        priority
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl text-white mb-2 group-hover:text-red-400 transition-colors">
                      {machine.name}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm md:text-base">
                      {machine.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {machine.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {machine.id && (
                      <Button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-none">
                        {t("viewDetails")}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-6 bg-gray-900/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-6">
            {t("ctaTitle")}
          </h2>
          <p className="text-gray-300 text-lg mb-8">{t("ctaSubtitle")}</p>
          <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg rounded-none">
            {t("ctaButton")}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
