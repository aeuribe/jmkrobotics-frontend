"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  CheckCircle,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import Header from "./header/Header";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface IndividualMachinePageProps {
  machineName: string;
  machineImage: string;
  description: string;
  primaryUse: string;
  idealFor: string[];
  commonApplications: string[];
  installationVideos: {
    title: string;
    application: string;
    thumbnail: string;
    videoUrl: string; // 🔥 Nueva propiedad necesaria
  }[];
}

//Get thumbnail from Youtube URL
function getYoutubeThumbnail(url: string): string {
  if (!url) return "/fallback_thumbnail.jpg"; // cualquier placeholder tuyo

  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

  const match = url.match(regex);

  if (!match) return "/fallback_thumbnail.jpg";

  const videoId = match[1];

  // Thumbnail oficial de YouTube (HQ)
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// Internal Badge Component
function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`inline-block px-3 py-1 text-sm ${className}`}>
      {children}
    </span>
  );
}

// Internal Button Component
function Button({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

// Internal Carousel Component
function SimpleCarousel({
  children,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
}: {
  children: React.ReactNode[];
  itemsPerView?: { mobile: number; tablet: number; desktop: number };
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, children.length - itemsToShow);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out gap-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
          }}
        >
          {children.map((child, idx) => (
            <div
              key={idx}
              className="flex-shrink-0"
              style={{
                width: `calc(${100 / itemsToShow}% - ${
                  ((itemsToShow - 1) * 16) / itemsToShow
                }px)`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {canGoPrevious && (
        <button
          onClick={goToPrevious}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-12 h-12 items-center justify-center bg-red-500 hover:bg-red-600 text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {canGoNext && (
        <button
          onClick={goToNext}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-12 h-12 items-center justify-center bg-red-500 hover:bg-red-600 text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Mobile Navigation Dots */}
      <div className="flex md:hidden justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 transition-colors ${
              idx === currentIndex ? "bg-red-500" : "bg-gray-600"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function IndividualMachinePage({
  machineName,
  machineImage,
  description,
  primaryUse,
  idealFor,
  commonApplications,
  installationVideos,
}: IndividualMachinePageProps) {
  const VideoPlayerModal = dynamic(
    () => import("./VideoPlayerModal").then((m) => m.VideoPlayerModal),
    { ssr: false }
  );

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const t = useTranslations("individualMachinePage");

  return (
    <div className="min-h-screen bg-[#020C18]">
      <Header />
      {/* Hero Section with Machine Image */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020C18] via-[#051425] to-[#020C18]" />
        <div className="absolute inset-0 opacity-10">
          <Image
            src={machineImage}
            alt={machineName}
            className="w-full h-full object-cover"
            fill
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020C18] via-[#020C18]/50 to-transparent" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mb-6 rounded-none">
            {t("industrialEquiment")}
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 max-w-4xl">
            {machineName}
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl max-w-3xl leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Machine Image & Primary Use */}
      <section className="py-12 md:py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Machine Image */}
            <div className="relative aspect-[4/3] bg-gray-900 overflow-hidden border-4 border-gray-500/20">
              <Image
                src={machineImage}
                alt={machineName}
                className="w-full h-full object-cover"
                fill
              />

              {/* 🏷️ Logo responsivo y discreto */}
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 opacity-80">
                <Image
                  src="/machines_jmkrobotics.png"
                  alt="JMK Robotics Logo"
                  width={90} // tamaño base (mobile)
                  height={60}
                  className="
        object-contain pointer-events-none select-none
        sm:w-[110px] sm:h-[80px]
        md:w-[150px] md:h-[100px]
        transition-all duration-300
      "
                  priority
                />
              </div>
            </div>

            {/* Primary Use */}
            <div>
              <h2 className="text-3xl md:text-4xl text-white mb-6">
                {t("whatItDoes")}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {primaryUse}
              </p>

              <h3 className="text-xl text-white mb-4">{t("idealFor")}</h3>
              <div className="space-y-3">
                {idealFor.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Video Gallery */}
      {installationVideos?.length > 0 && (
        <section className="py-12 md:py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl text-white mb-4">
                {t("realInstallations")}
              </h2>
              <p className="text-gray-400 text-lg">{t("description")}</p>
            </div>

            {/* 🎯 1 o 2 videos → centrados */}
            {installationVideos.length <= 2 ? (
              <div className="flex justify-center flex-wrap gap-8">
                {installationVideos.map((video, idx) => (
                  <div
                    key={idx}
                    className="w-full sm:w-[480px] bg-gray-900 border border-gray-800 overflow-hidden hover:border-red-500/50 transition-all group cursor-pointer"
                    onClick={() => setSelectedVideo(video.videoUrl)}
                  >
                    <div className="relative aspect-video bg-gray-950 overflow-hidden">
                      <Image
                        src={
                          video.thumbnail || getYoutubeThumbnail(video.videoUrl)
                        }
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        fill
                      />

                      {/* 🏷️ Marca de agua (responsiva) */}
                      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 opacity-80">
                        <Image
                          src="/machines_jmkrobotics.png"
                          alt="JMK Robotics Logo"
                          width={90} // Tamaño base para móvil
                          height={90}
                          className="
                object-contain pointer-events-none select-none
                sm:w-[110px] sm:h-[110px]
                md:w-[150px] md:h-[150px]
                transition-all duration-300
              "
                          priority
                        />
                      </div>

                      {/* Overlay + botón de reproducción */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <PlayCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 text-center">
                      <h3 className="text-white mb-1 group-hover:text-red-400 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {video.application}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 🎞️ 3 o más → carrusel
              <SimpleCarousel
                itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
              >
                {installationVideos.map((video, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-900 border border-gray-800 overflow-hidden hover:border-red-500/50 transition-all group cursor-pointer"
                    onClick={() => setSelectedVideo(video.videoUrl)}
                  >
                    <div className="relative aspect-video bg-gray-950 overflow-hidden">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        fill
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                        <div className="w-16 h-16 bg-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <PlayCircle className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white mb-1 group-hover:text-red-400 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {video.application}
                      </p>
                    </div>
                  </div>
                ))}
              </SimpleCarousel>
            )}
          </div>
        </section>
      )}

      {/* Common Applications */}
      <section className="py-12 md:py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl text-white mb-12 text-center">
            {t("commonApplications")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {commonApplications.map((app, idx) => (
              <div
                key={idx}
                className="bg-[#020C18] border border-gray-800 p-6 text-center hover:border-red-500/50 hover:bg-red-500/5 transition-all"
              >
                <p className="text-gray-300">{app}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl text-white mb-6">
            {t("footer.title")}
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            {t("footer.description")}
          </p>
          <Link href="/contact" passHref>
            <Button className="bg-red-500 hover:bg-red-600 text-white px-10 py-7 text-lg rounded-none">
              {t("footer.button")}
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 🔥 Video Modal Render */}
      {selectedVideo && (
        <VideoPlayerModal
          videoUrl={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
