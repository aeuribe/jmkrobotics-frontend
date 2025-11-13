"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle, Factory, CheckCircle, ChevronDown } from "lucide-react";
import {
  productionLines,
  getAllIndustries,
  type ProductionLine,
} from "@/data/productionLines"; // 👈 asegúrate que el path sea correcto
import { VideoPlayerModal } from "../../components/VideoPlayerModal";
import { useTranslations } from "next-intl";


// ✅ Production Line Card
function ProductionLineCard({ line }: { line: ProductionLine }) {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const [showAllMedia, setShowAllMedia] = useState(false);
  const t = useTranslations(); // next-intl
  const tPage = useTranslations("solutionsPage");
  
  // Para mostrar solo las primeras 4 imágenes/videos
  const displayMedia = showAllMedia ? line.media : line.media.slice(0, 4);
  const hasMoreMedia = line.media.length > 4;

  // Aquí usamos t.raw() para arrays de strings como machines y benefits
  const machines = t.raw(line.machines) as string[];
  const benefits = t.raw(line.benefits) as string[];

  return (
    <div className="bg-gray-900 border border-gray-800 overflow-hidden hover:border-red-500/30 transition-all">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <Factory className="w-6 h-6 text-red-500" />
            <span className="text-red-400 text-sm">{t(line.industry)}</span>
          </div>
          {line.capacity && <span className="text-gray-400 text-sm">{t(line.capacity)}</span>}
        </div>
        <h3 className="text-2xl text-white mb-2">{t(line.title)}</h3>
        <p className="text-red-400 mb-3">{t(line.subtitle)}</p>
        <p className="text-gray-300 leading-relaxed">{t(line.description)}</p>
      </div>

      {/* Media */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 bg-black/20">
        {displayMedia.map((media, idx) => (
          <div
            key={idx}
            className={`relative aspect-video bg-gray-950 overflow-hidden group ${
              media.type === "video" ? "cursor-pointer" : ""
            }`}
            onClick={() =>
              media.type === "video" && setSelectedVideo({ url: media.url, title: media.title })
            }
          >
            <Image
              src={
                media.type === "video"
                  ? (() => {
                      const match = media.url.match(
                        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|shorts\/))([^?&]+)/
                      );
                      const id = match ? match[1] : null;
                      return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : media.thumbnail || "/placeholder_video.jpg";
                    })()
                  : media.url
              }
              alt={media.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              fill
              unoptimized
            />
            {media.type === "video" && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                <div className="w-12 h-12 bg-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <p className="text-white text-xs truncate">{media.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show More */}
      {hasMoreMedia && !showAllMedia && (
        <div className="px-4 pb-4">
          <button
            onClick={() => setShowAllMedia(true)}
            className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white transition-colors flex items-center justify-center gap-2"
          >
            <span>Show {line.media.length - 4} More</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Machines & Benefits */}
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div>
          <h4 className="text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-red-500"></span>
            {tPage("card.machinesIncluded")}
          </h4>
          <ul className="space-y-2">
            {machines.map((m, i) => (
              <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span> {m}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-red-500"></span>
            {tPage("card.benefits")}
          </h4>
          <ul className="space-y-2">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedVideo && <VideoPlayerModal videoUrl={selectedVideo.url} onClose={() => setSelectedVideo(null)} />}
    </div>
  );
}


export function SolutionsPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const industries = getAllIndustries();
  const t = useTranslations();
  const tPage = useTranslations("solutionsPage");

  const filteredLines =
    selectedIndustry === "all"
      ? productionLines
      : productionLines.filter((line) => line.industry === selectedIndustry);

  return (
    <div className="min-h-screen bg-[#020C18]">
      {/* Hero */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020C18] via-[#051425] to-[#020C18]" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/30 mb-6">
            <span className="text-red-400">{tPage("badge")}</span>
          </div>
          <h1 className="text-5xl md:text-6xl text-white mb-6">
            {tPage("title")}
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl max-w-3xl">
            {tPage("subtitle")}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 bg-gray-900/30 border-y border-gray-800">
        <div className="container mx-auto max-w-7xl flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedIndustry("all")}
            className={`px-6 py-2 transition-all ${
              selectedIndustry === "all"
                ? "bg-red-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tPage("allIndustries")}
          </button>
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-6 py-2 transition-all ${
                selectedIndustry === industry
                  ? "bg-red-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {t(industry)}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-20 px-6">
        <div className="container mx-auto max-w-7xl space-y-8">
          {filteredLines.map((line) => (
            <ProductionLineCard key={line.id} line={line} />
          ))}

          {filteredLines.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-xl">
              No production lines found for this industry.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
