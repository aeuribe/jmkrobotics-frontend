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
  // 🔒 Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 🔑 Cerrar con tecla ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose} // cerrar al hacer clic fuera
    >
      <div
        className="relative bg-black border border-gray-700 rounded-md overflow-hidden select-none flex justify-center items-center max-w-5xl w-full aspect-video"
        onClick={(e) => e.stopPropagation()} // evita cierre al hacer clic dentro
        onContextMenu={(e) => e.preventDefault()} // ❌ bloquea clic derecho dentro del modal
        onDragStart={(e) => e.preventDefault()} // ❌ evita arrastrar elementos
      >
        {/* Botón X */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // evita interferencia con video
            onClose();
          }}
          className="absolute top-3 right-3 z-50 text-white hover:text-red-500 transition-colors"
          aria-label="Close"
        >
          <X className="w-7 h-7 drop-shadow-lg pointer-events-auto" />
        </button>

        {/* Contenedor del video */}
        <div className="relative w-full max-w-4xl pointer-events-auto flex justify-center items-center">
          <video
            src={videoUrl}
            controls
            controlsList="nodownload noplaybackrate nofullscreen"
            autoPlay
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-auto bg-black z-10 select-none rounded-md"
            style={{
              maxHeight: "85vh",
              objectFit: "contain",
            }}
          />

          {/* 🏷️ Marca de agua */}
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
