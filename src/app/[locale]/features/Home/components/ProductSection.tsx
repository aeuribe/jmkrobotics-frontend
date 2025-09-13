"use client";

import React, { useEffect, useRef, useState } from "react";
import ProductFrame from "./ProductFrame";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const ProductSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const t = useTranslations("productSection");

  const products = [
    {
      title: t("capping"),
      icon: "/bottle_icon.png",
      image: "/capping_image.jpg"
    },
    {
      title: t("sealing"), 
      icon: "/sealed_bag_icon.png",
      image: "/sealing_machine.jpg"
    },
    {
      title: t("filling"),
      icon: "/filling_machine.svg", 
      image: "/filling_machine.jpg"
    },
    {
      title: t("labeling"),
      icon: "/label_icon.png",
      image: "/labeling-machine.jpg"
    },
    {
      title: t("wrapping"),
      icon: "/wrapping_icon.png", 
      image: "/wraping_machine.jpg"
    },
    {
      title: t("metalDetector"),
      icon: "/metal_detector.png",
      image: "/metal_detector.jpg"
    }
  ];

  // Duplicar productos para efecto infinito
  const infiniteProducts = [...products, ...products, ...products];

  // Auto-scroll functionality
useEffect(() => {
  const container = scrollContainerRef.current;
  if (!container || !isAutoScrolling) return;

  const scrollStep = 1;
  const scrollSpeed = 30;

  const autoScroll = () => {
    if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
      container.scrollLeft = container.scrollWidth / 3;
    } else {
      container.scrollLeft += scrollStep;
    }
  };

  const intervalId = setInterval(autoScroll, scrollSpeed);

  // Pausar auto-scroll al tocar
  const handleTouchStart = () => setIsAutoScrolling(false);
  const handleTouchEnd = () => setIsAutoScrolling(true);

  container.addEventListener("touchstart", handleTouchStart);
  container.addEventListener("touchend", handleTouchEnd);

  return () => {
    clearInterval(intervalId);
    container.removeEventListener("touchstart", handleTouchStart);
    container.removeEventListener("touchend", handleTouchEnd);
  };
}, [isAutoScrolling]);


  // Handle scroll state
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
  };

  // Manual scroll functions
  const scrollLeft = () => {
    setIsAutoScrolling(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      setTimeout(() => setIsAutoScrolling(true), 3000);
    }
  };

  const scrollRight = () => {
    setIsAutoScrolling(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      setTimeout(() => setIsAutoScrolling(true), 3000);
    }
  };

  return (
    <section className="bg-[#020C18] relative overflow-hidden">
      {/* Efectos de fondo sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60' width='60' height='60' fill='none' stroke='rgb(255 255 255 / 0.03)'%3e%3cpath d='M0 30h60M30 0v60'/%3e%3c/svg%3e")`,
               backgroundSize: '60px 60px'
             }} 
        />
      </div>

      {/* Gradiente sutil en los bordes */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2E3C51]/50 to-transparent"></div>
      
      <div className="relative z-10">
        {/* Header de la sección */}
        <div className="text-center pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Subtítulo */}
            <div className="mb-4 sm:mb-6">
              <span className="inline-block px-4 py-2 
                              bg-[#E4173C]/10 border border-[#E4173C]/20
                              text-[#E4173C] text-sm sm:text-base font-medium
                              backdrop-blur-sm">
                {t("subtitle")}
              </span>
            </div>
            
            {/* Título principal */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 
                          font-semibold text-white mb-4 sm:mb-6
                          leading-tight tracking-tight">
              {t("title1")} <span className="text-[#E4173C]">{t("title2")}</span>
            </h2>
            
            {/* Descripción */}
            <p className="text-[#6E7784] text-base sm:text-lg lg:text-xl 
                         max-w-2xl mx-auto leading-relaxed">
              {t("description")}.
            </p>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative group">
          {/* Navigation Arrows */}
          <button
            onClick={scrollLeft}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20
                       w-12 h-12 bg-[#020C18]/80 backdrop-blur-sm
                       border border-[#2E3C51] text-white
                       flex items-center justify-center
                       transition-all duration-300 hover:bg-[#E4173C] hover:border-[#E4173C]
                       opacity-0 group-hover:opacity-100
                       ${canScrollLeft ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
            disabled={!canScrollLeft}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={scrollRight}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20
                       w-12 h-12 bg-[#020C18]/80 backdrop-blur-sm
                       border border-[#2E3C51] text-white
                       flex items-center justify-center
                       transition-all duration-300 hover:bg-[#E4173C] hover:border-[#E4173C]
                       opacity-0 group-hover:opacity-100
                       ${canScrollRight ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
            disabled={!canScrollRight}
          >
            <ChevronRight size={20} />
          </button>

          {/* Slider */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            className="flex overflow-x-auto gap-0 pb-16 sm:pb-20 lg:pb-24
                       scroll-smooth snap-x snap-mandatory
                       [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Spacer inicial para centrar en pantallas grandes */}
            <div className="flex-shrink-0 w-4 sm:w-8 lg:w-16"></div>

            {/* Productos infinitos */}
            {infiniteProducts.map((product, index) => (
              <div
                key={`${product.title}-${index}`}
                className="flex-shrink-0 snap-center w-[280px] sm:w-[320px] lg:w-[380px] h-[320px] sm:h-[360px] lg:h-[400px]
                           bg-[#0A1220]/50 backdrop-blur-sm
                           border-r border-[#2E3C51] last:border-r-0
                           shadow-xl shadow-black/20 relative"
              >
                <ProductFrame
                  className=""
                  title={product.title}
                  icon={product.icon}
                  image={product.image}
                />
              </div>
            ))}

            {/* Spacer final */}
            <div className="flex-shrink-0 w-4 sm:w-8 lg:w-16"></div>
          </div>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 
                         bg-gradient-to-r from-[#020C18] to-transparent 
                         pointer-events-none z-30"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 
                         bg-gradient-to-l from-[#020C18] to-transparent 
                         pointer-events-none z-30"></div>
        </div>

        {/* Auto-scroll indicator */}
        <div className="text-center pb-8">
          <div className="inline-flex items-center gap-2 text-[#6E7784] text-xs sm:text-sm">
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 
                            ${isAutoScrolling ? 'bg-[#E4173C] animate-pulse' : 'bg-[#6E7784]'}`}></div>
            <span>
              {isAutoScrolling ? 'Auto-scrolling' : 'Manual control'}
            </span>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pb-16 sm:pb-20 lg:pb-24">
          <div className="inline-flex items-center gap-2 text-[#6E7784] hover:text-white 
                         transition-colors duration-300 cursor-pointer group">
            <span className="text-sm sm:text-base">
              {t("cta")}
            </span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>


    </section>
  );
};

export default ProductSection;