import React from "react";
import HeroSlider from "@/app/components/HeroSlider";
import LinkButton from "./ButtonExplore";
import ButtonExplore from "./ButtonExplore";


const HeroSection = () => {
  return (
    <div className="h-screen">
      <section className="relative w-full h-[calc(100vh-6rem)] overflow-hidden">
        {/* Video de fondo alineado a la derecha con mejoras móvil */}
        <video
          src="/video-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute right-0 top-0 w-full sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] 
                    min-h-full object-cover z-0
                    /* Optimización para móvil */
                    object-center sm:object-center
                    scale-105 sm:scale-100"
        />

        {/* Overlay mejorado para contraste y legibilidad */}
        <div className="absolute right-0 top-0 w-full sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] 
                       min-h-full z-0">
          {/* Overlay principal */}
          <div className="absolute inset-0 bg-black/70 sm:bg-black/55 md:bg-black/50 lg:bg-black/45 xl:bg-black/40"></div>
          
          {/* Gradiente adicional para móvil que mejora la legibilidad del texto */}
          <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="sm:hidden absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
          
          {/* Patrón sutil para añadir textura */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100' fill='none' stroke='rgb(255 255 255)'%3e%3cpath d='M0 0l50 50M50 0l50 50M0 50l50 50M50 50l50 50'/%3e%3c/svg%3e")`,
                 backgroundSize: '20px 20px'
               }}>
          </div>
        </div>

        {/* Contenido superpuesto */}
        <div className="relative z-10 flex items-center justify-start h-full 
                       px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <div className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 
                         text-white text-left font-main flex flex-col 
                         gap-3 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
            
            {/* Texto pequeño superior con animación */}
            <div className="relative">
              <p className="font-main text-xs sm:text-sm md:text-base lg:text-md xl:text-lg tracking-widest
                           opacity-90 hover:opacity-100 transition-all duration-500
                           animate-slideInFromLeft">
                Precision <span className="text-[#E4173C] font-semibold">In</span> Motion
              </p>
              {/* Línea decorativa móvil */}
              <div className="absolute -bottom-1 left-0 w-8 h-[1px] bg-gradient-to-r from-[#E4173C] to-transparent
                             sm:hidden animate-slideInFromLeft"></div>
            </div>
            
            {/* Título principal mejorado para móvil */}
            <div className="relative">
              <h1 className="font-medium font-main leading-[1.1] relative
                            text-[28px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[80px]
                            max-w-[98%] sm:max-w-full
                            animate-slideInFromBottom">
                {/* Fondo sutil para móvil que mejora legibilidad */}
                <span className="sm:hidden absolute inset-0 bg-black/20 backdrop-blur-[1px] rounded-lg -z-10"></span>
                
                Industrial Solutions for a{" "}
                <span className="relative text-[#E4173C] font-semibold">
                  Smarter
                  {/* Efecto de brillo sutil en móvil */}
                  <span className="sm:hidden absolute inset-0 text-[#E4173C] opacity-40 blur-[2px]">
                    Smarter
                  </span>
                </span>{" "}
                Future
              </h1>
              
              {/* Decoración geométrica sutil para móvil */}
              <div className="sm:hidden absolute -right-2 top-0 w-1 h-6 bg-gradient-to-b from-[#E4173C] to-transparent
                             opacity-60 animate-pulse"></div>
            </div>
            
            {/* Botón Explore sutil */}
            <ButtonExplore />
          </div>
        </div>

        {/* Recuadro del HeroSlider - Posicionamiento Natural */}
<div
  className="
              absolute z-30 bg-white shadow-lg rounded-xl
              bottom-6

              /* Mobile (<640px): centrado */
              left-1/2 -translate-x-1/2
              w-[260px] h-[70px]

              /* >=640px: derecha */
              sm:left-auto sm:right-6 sm:translate-x-0
              sm:w-[320px] sm:h-[90px]

              /* >=1024px */
              lg:w-[420px] lg:h-[130px]

              /* >=1280px */
              xl:w-[480px] xl:h-[150px]

              /* >=1536px */
              2xl:w-[520px] 2xl:h-[170px]
            "
>
          <HeroSlider />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;