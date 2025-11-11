"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type ProductFrameProps = {
  title?: string;
  image?: string;
  className?: string;

};

const ProductFrame: React.FC<ProductFrameProps> = ({
  title,
  image,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative text-white h-full w-full p-6 sm:p-6 lg:p-8
      flex flex-col justify-between cursor-pointer
      transition-all duration-500 ease-out
      isolation-isolate overflow-hidden
      ${className}`}
      style={{
        transform: isHovered ? "scale(1.02)" : "scale(1)",
        zIndex: isHovered ? 20 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fondo imagen con efecto parallax */}
      {image && (
        <>
          <div
            className="absolute inset-0 pointer-events-none
                       transition-all duration-700 ease-out"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "brightness(0.7) contrast(1.1)",
              opacity: isHovered ? 0.5 : 0,
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              zIndex: 0,
            }}
          />

          {/* Overlay gradiente dinámico */}
          <div
            className="absolute inset-0 pointer-events-none 
                       transition-all duration-700 ease-out"
            style={{
              background: `
                linear-gradient(135deg, 
                  var(--frame-overlay-dark) 0%, 
                  var(--frame-overlay-mid) 30%, 
                  var(--accent-light) 60%,
                  var(--frame-overlay-end) 100%
                )
              `,
              opacity: isHovered ? 1 : 0,
              zIndex: 1,
            }}
          />

          {/* Efectos de partículas sutiles */}
          <div
            className="absolute inset-0 pointer-events-none
                       transition-opacity duration-1000"
            style={{
              background: `radial-gradient(circle at 20% 80%, var(--accent-mid) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, var(--accent-blue) 0%, transparent 50%)`,
              opacity: isHovered ? 0.3 : 0,
              zIndex: 2,
            }}
          />
        </>
      )}

      {/* Título con mejor tipografía y animación */}
      <div className="relative z-10 flex-grow flex items-center justify-start">
        {title && (
          <div className="space-y-2">
            <h3
              className="text-xl sm:text-2xl lg:text-3xl font-semibold
                        transition-all duration-500 ease-out
                        leading-tight"
              style={{
                color: isHovered ? "var(--text-hover)" : "inherit",
                transform: isHovered ? "translateX(8px)" : "translateX(0)",
              }}
            >
              {title}
            </h3>

            {/* Línea decorativa animada */}
            <div
              className="h-[2px] bg-gradient-to-r from-[var(--accent-main)] to-[var(--accent-soft)]
                         transition-all duration-700 ease-out"
              style={{
                width: isHovered ? "64px" : "0px",
              }}
            />
          </div>
        )}
      </div>

      {/* Botón mejorado con estado hover */}
      <div className="relative z-10 flex justify-start items-end">
        <button
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full 
                    border bg-opacity-80 backdrop-blur-sm
                    flex items-center justify-center
                    transition-all duration-500 ease-out
                    focus:outline-none focus:ring-2 focus:ring-[var(--accent-main)] focus:ring-offset-2 focus:ring-offset-[var(--bg-dark)]"
          style={{
            backgroundColor: isHovered
              ? "var(--accent-main)"
              : "var(--button-bg)",
            borderColor: isHovered ? "var(--accent-main)" : "var(--border-color)",
            color: isHovered ? "var(--text-hover)" : "var(--text-muted)",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            boxShadow: isHovered
              ? "0 20px 40px var(--accent-shadow)"
              : "none",
          }}
          aria-label={`Ver más sobre ${title}`}
          type="button"
        >
          <ChevronRight
            size={20}
            className="transition-transform duration-300 ease-out"
            style={{
              transform: isHovered ? "translateX(4px)" : "translateX(0)",
            }}
          />

          {/* Ripple effect */}
          <div
            className="absolute inset-0 rounded-full 
                       bg-white/10 
                       transition-all duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scale(1.1)" : "scale(0)",
            }}
          />
        </button>
      </div>

      {/* Indicador de interactividad sutil */}
      <div
        className="absolute top-4 right-4 z-10
                   transition-all duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: "var(--accent-main)",
            animation: isHovered ? "pulse 2s infinite" : "none",
          }}
        />
      </div>
    </div>
  );
};

export default ProductFrame;
