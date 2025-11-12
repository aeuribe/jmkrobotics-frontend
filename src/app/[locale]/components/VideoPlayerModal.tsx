"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

interface VideoPlayerModalProps {
  videoUrl: string;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  videoUrl,
  onClose,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // ✅ Detectar tipo de video (YouTube/Vimeo o directo)
  const getEmbedUrl = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|shorts\/))([^?&"'>]+)/
    );
    if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;

    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch)
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;

    return url; // directo .mp4 o similar
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const isIframe = embedUrl.includes("youtube") || embedUrl.includes("vimeo");

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-black border border-gray-700 rounded-md overflow-hidden select-none flex justify-center items-center max-w-5xl w-full aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón X */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-3 right-3 z-50 text-white hover:text-red-500 transition-colors"
          aria-label="Close"
        >
          <X className="w-7 h-7 drop-shadow-lg pointer-events-auto" />
        </button>

        {/* Contenedor del video */}
        <div className="relative w-full max-w-5xl aspect-video pointer-events-auto flex justify-center items-center">
          {isIframe ? (
            <iframe
              src={embedUrl}
              title="Video"
              className="w-full h-full rounded-md shadow-lg"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ background: "#000" }}
            />
          ) : (
            <video
              src={embedUrl}
              controls
              autoPlay
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-auto bg-black z-10 select-none rounded-md"
              style={{ maxHeight: "85vh", objectFit: "contain" }}
            />
          )}

          {/* Marca de agua */}
          <div className="absolute bottom-4 right-4 z-20 mix-blend-screen pointer-events-none select-none">
            <Image
              src="/machines_jmkrobotics.png"
              alt="JMK Robotics"
              width={160}
              height={120}
              className="object-contain opacity-70"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};
