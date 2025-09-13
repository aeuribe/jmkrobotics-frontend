import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type ProductFrameProps = {
  title?: string;
  icon?: string;
  image?: string;
  className?: string;
};

const ProductFrame: React.FC<ProductFrameProps> = ({ title, icon, image, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative text-white h-full w-full p-6 sm:p-6 lg:p-8
      flex flex-col justify-between cursor-pointer
      transition-all duration-500 ease-out
      isolation-isolate overflow-hidden
      ${className}`}
      style={{
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
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
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
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
                  rgba(2,12,24,0.95) 0%, 
                  rgba(2,12,24,0.7) 30%, 
                  rgba(228,23,60,0.15) 60%,
                  rgba(2,12,24,0.9) 100%
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
              background: `radial-gradient(circle at 20% 80%, rgba(228,23,60,0.3) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(68,123,181,0.2) 0%, transparent 50%)`,
              opacity: isHovered ? 0.3 : 0,
              zIndex: 2,
            }}
          />
        </>
      )}

      {/* Contenedor icono mejorado */}
      <div className="relative z-10 flex justify-start items-start">
        <div 
          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 
                     flex items-center justify-center
                     transition-all duration-500 ease-out"
          style={{
            transform: isHovered ? 'scale(1.1) rotate(3deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          {icon && (
            <div className="relative">
              <Image
                src={icon}
                alt={`${title} icon`}
                className="w-full h-full object-contain 
                          transition-all duration-500"
                style={{
                  filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
                }}
                width={64}
                height={64}
              />
              
              {/* Glow effect en el icono */}
              <div 
                className="absolute inset-0 rounded-full 
                           bg-[#E4173C]/20 blur-xl 
                           transition-all duration-700"
                style={{
                  opacity: isHovered ? 1 : 0,
                  animation: isHovered ? 'pulse 2s infinite' : 'none',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Título con mejor tipografía y animación */}
      <div className="relative z-10 flex-grow flex items-center justify-start">
        {title && (
          <div className="space-y-2">
            <h3 
              className="text-xl sm:text-2xl lg:text-3xl font-semibold
                        transition-all duration-500 ease-out
                        leading-tight"
              style={{
                color: isHovered ? '#ffffff' : 'inherit',
                transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
              }}
            >
              {title}
            </h3>
            
            {/* Línea decorativa animada */}
            <div 
              className="h-[2px] bg-gradient-to-r from-[#E4173C] to-[#ff6b6b] 
                         transition-all duration-700 ease-out"
              style={{
                width: isHovered ? '64px' : '0px',
              }}
            />
          </div>
        )}
      </div>

      {/* Botón mejorado con estado hover */}
      <div className="relative z-10 flex justify-start items-end">
        <button
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full 
                    border border-[#2E3C51] bg-[#020C18]/80 backdrop-blur-sm
                    flex items-center justify-center
                    text-[#6E7784] 
                    transition-all duration-500 ease-out
                    focus:outline-none focus:ring-2 focus:ring-[#E4173C] focus:ring-offset-2 focus:ring-offset-[#020C18]"
          style={{
            backgroundColor: isHovered ? '#E4173C' : 'rgba(2,12,24,0.8)',
            borderColor: isHovered ? '#E4173C' : '#2E3C51',
            color: isHovered ? '#ffffff' : '#6E7784',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            boxShadow: isHovered ? '0 20px 40px rgba(228,23,60,0.3)' : 'none',
          }}
          aria-label={`Ver más sobre ${title}`}
          type="button"
        >
          {/* Icono con animación */}
          <ChevronRight 
            size={20} 
            className="transition-transform duration-300 ease-out"
            style={{
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            }}
          />
          
          {/* Ripple effect */}
          <div 
            className="absolute inset-0 rounded-full 
                       bg-white/10 
                       transition-all duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1.1)' : 'scale(0)',
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
          className="w-2 h-2 bg-[#E4173C] rounded-full"
          style={{
            animation: isHovered ? 'pulse 2s infinite' : 'none',
          }}
        />
      </div>
    </div>
  );
};

export default ProductFrame;