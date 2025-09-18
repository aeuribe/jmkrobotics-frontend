import React from "react";
import Link from "next/link";

interface LinkButtonProps {
  label: string;
  href?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, href = "#" }) => {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 text-sm sm:text-base md:text-md text-white 
                 transition-all duration-300 ease-out
                 /* Estilo móvil mejorado */
                 sm:border-b sm:border-white/80 sm:hover:border-white sm:pb-[2px] sm:hover:pb-1
                 /* Móvil: botón más prominente */
                 bg-white/10 sm:bg-transparent
                 backdrop-blur-sm sm:backdrop-blur-none
                 px-4 py-3 sm:px-0 sm:py-0
                 rounded-lg sm:rounded-none
                 border border-white/20 sm:border-none
                 hover:bg-white/20 sm:hover:bg-transparent
                 hover:border-white/40 sm:hover:border-white
                 active:scale-[0.98] sm:active:scale-100
                 min-h-[48px] sm:min-h-auto
                 justify-start sm:justify-start"
    >
      {/* Fondo de hover para móvil */}
      <div className="sm:hidden absolute inset-0 bg-gradient-to-r from-[#ff002f]/10 to-transparent 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
      
      <span className="relative flex items-center gap-2 sm:gap-1.5 font-medium sm:font-normal">
        {/* Icono mejorado para móvil */}
        <div className="relative">
          <svg 
            className="w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4 transition-all duration-300 
                       group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                       text-[#ff002f] sm:text-white group-hover:text-[#ff002f]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
          
          {/* Efecto de brillo en móvil */}
          <div className="sm:hidden absolute inset-0 bg-[#ff002f]/20 rounded-full blur-sm 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <span className="relative">
          {label}
          {/* Línea decorativa móvil */}
          <div className="sm:hidden absolute -bottom-1 left-0 w-0 h-[1px] bg-[#ff002f] 
                         group-hover:w-full transition-all duration-300"></div>
        </span>
      </span>
      
      {/* Borde animado para móvil */}
      <div className="sm:hidden absolute inset-0 rounded-lg border border-transparent 
                     group-hover:border-[#ff002f]/30 transition-colors duration-300"></div>
    </Link>
  );
};

export default LinkButton;