"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Cpu, Factory, BrainCircuit, Play, Pause } from "lucide-react";
import { useTranslations } from "next-intl";
// Tipos TypeScript
interface SlideData {
  text: string;
  highlight: string;
  end: string;
  icon: React.ReactNode;
  bgGradient: string;
  accentColor: string;
}

interface TouchPosition {
  x: number;
  y: number;
}

export default function HeroSlider() {
  const t = useTranslations("hero.slider");
  const slides: SlideData[] = [
    {
      text: t("text1"),
      highlight: t("highlight1"),
      end: t("end1"),
      icon: <BrainCircuit className="w-full h-full text-slate-600" />,
      bgGradient: "from-white to-white",
      accentColor: "slate"
    },
    {
      text: t("text2"),
      highlight: t("highlight2"),
      end: t("end2"),
      icon: <Factory className="w-full h-full text-slate-600" />,
      bgGradient: "from-white to-white",
      accentColor: "blue"
    },
    {
      text: t("text3"),
      highlight: t("highlight3"),
      end: t("end3"),
      icon: <Cpu className="w-full h-full text-slate-600" />,
      bgGradient: "from-white to-white",
      accentColor: "gray"
    },
  ];

  // Estados del slider
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [showText, setShowText] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  
  // Referencias para touch/swipe
  const touchStartRef = useRef<TouchPosition>({ x: 0, y: 0 });
  const touchEndRef = useRef<TouchPosition>({ x: 0, y: 0 });
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Lógica para cambiar slides
  const goToSlide = useCallback((slideIndex: number) => {
    if (isTransitioning || slideIndex === currentSlide) return;
    
    setIsTransitioning(true);
    setShowText(false);
    
    setTimeout(() => {
      setCurrentSlide(slideIndex);
      setTimeout(() => {
        setShowText(true);
        setIsTransitioning(false);
      }, 100);
    }, 150);
  }, [currentSlide, isTransitioning]);

  const nextSlide = useCallback(() => {
    const next = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(next);
  }, [currentSlide, slides.length, goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(prev);
  }, [currentSlide, slides.length, goToSlide]);

  // Autoplay logic
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, 4000);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  // Inicializar animación del texto
  useEffect(() => {
    setShowText(false);
    const timeout = setTimeout(() => setShowText(true), 100);
    return () => clearTimeout(timeout);
  }, [currentSlide]);

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const deltaX = touchStartRef.current.x - touchEndRef.current.x;
    const deltaY = touchStartRef.current.y - touchEndRef.current.y;

    // Solo procesamos swipes horizontales
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      if (deltaX > 0) {
        nextSlide(); 
      } else {
        prevSlide(); 
      }
    }
  };

  // Pausar autoplay en hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      className={`w-full h-full relative overflow-hidden transition-all duration-500 ease-out bg-gradient-to-r ${currentSlideData.bgGradient}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(71 85 105 / 0.2)'%3e%3cpath d='M0 16h32M16 0v32'/%3e%3c/svg%3e")`,
               backgroundSize: '16px 16px'
             }} 
        />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-slate-400 rounded-full opacity-40 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse animation-delay-3000"></div>
      </div>
      
      {/* Main Content Container - Padding Más Compacto */}
      <div className="relative z-10 h-full flex items-center justify-between 
                     px-2 sm:px-2.5 md:px-3 lg:px-4 xl:px-5 
                     py-1 sm:py-1.5 md:py-2 lg:py-2.5 xl:py-3">
        
        {/* Left Column: Icon - Más Compacto */}
        <div className="flex items-center flex-shrink-0">
          <div className={`
            flex items-center justify-center rounded-md bg-white shadow-sm border border-slate-200
            transition-all duration-500 ease-out
            w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8
            ${showText ? "scale-100 rotate-0 opacity-100" : "scale-90 rotate-12 opacity-0"}
          `}>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4">
              {currentSlideData.icon}
            </div>
          </div>
        </div>

        {/* Center Column: Main Content - Texto Compacto */}
        <div className="flex-1 px-1.5 sm:px-2 md:px-2.5 lg:px-3 xl:px-4">
          <div className={`
            transition-all duration-500 ease-out
            ${showText ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
          `}>
            <h2 className="leading-tight text-slate-800
                          text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg">
              <span className="font-medium text-slate-600">{currentSlideData.text}</span>{" "}
              <span className="text-[#E4173C] font-semibold">
                {currentSlideData.highlight}
              </span>{" "}
              <span className="font-medium text-slate-600">{currentSlideData.end}</span>
            </h2>
            
            {/* Subtle progress indicator - Más Pequeño */}
            <div className={`
              h-0.5 bg-gradient-to-r from-[#E4173C] to-red-400 rounded-full
              w-6 sm:w-7 md:w-8 lg:w-10 xl:w-12
              mt-1 sm:mt-1.5 md:mt-2 lg:mt-2.5 xl:mt-3
              transition-all duration-500 ease-out delay-200
              ${showText ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
            `}></div>
          </div>
        </div>

        {/* Right Column: Controls and Indicators - Muy Compacto */}
        <div className="flex items-center flex-shrink-0
                       space-x-0.5 sm:space-x-1 md:space-x-1.5 lg:space-x-2 xl:space-x-2.5">
          
          {/* Navigation Buttons - Mucho Más Pequeños */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="group rounded-md bg-white shadow-sm border border-slate-200
                     hover:bg-slate-50 hover:border-slate-300 hover:shadow-md disabled:opacity-50
                     transition-all duration-200 ease-out
                     p-0.5 sm:p-1 md:p-1 lg:p-1.5 xl:p-1.5"
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-slate-600 group-hover:text-slate-800 transition-colors
                                  w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="group rounded-md bg-slate-800 shadow-sm border border-slate-700
                     hover:bg-slate-700 hover:shadow-md disabled:opacity-50
                     transition-all duration-200 ease-out
                     p-0.5 sm:p-1 md:p-1 lg:p-1.5 xl:p-1.5"
            aria-label="Next slide"
          >
            <ChevronRight className="text-white
                                   w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5" />
          </button>

          {/* Slide Indicators - Súper Compactos */}
          <div className="flex items-center ml-0.5 sm:ml-1 md:ml-1.5 lg:ml-2 xl:ml-2.5
                         space-x-0.5 sm:space-x-0.5 md:space-x-1 lg:space-x-1 xl:space-x-1.5">
            {slides.map((_, idx) => {
              const active = currentSlide === idx;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  disabled={isTransitioning}
                  className={`
                    relative overflow-hidden rounded-full transition-all duration-300 ease-out
                    ${isTransitioning ? "opacity-50" : "opacity-100"}
                    ${active 
                      ? "w-2 h-1 sm:w-2.5 sm:h-1 md:w-3 md:h-1.5 lg:w-4 lg:h-1.5 xl:w-5 xl:h-2" 
                      : "w-1 h-1 sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 lg:w-1.5 lg:h-1.5 xl:w-2 xl:h-2"
                    }
                  `}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div className={`
                    w-full h-full rounded-full transition-all duration-300 ease-out
                    ${active 
                      ? "bg-slate-700 shadow-sm" 
                      : "bg-slate-300 hover:bg-slate-400"
                    }
                  `}></div>
                  
                  {active && (
                    <div className="absolute inset-0 rounded-full bg-slate-700"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Play/Pause Button - Hidden en mobile y tablet */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="hidden lg:block group rounded-md bg-slate-100 shadow-sm border border-slate-200
                     hover:bg-slate-200 hover:shadow-md transition-all duration-200 ease-out
                     ml-0.5 sm:ml-1 md:ml-1.5 lg:ml-2 xl:ml-2.5
                     p-0.5 sm:p-1 md:p-1 lg:p-1.5 xl:p-1.5"
            aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isAutoPlaying ? 
              <Pause className="text-slate-600 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5" /> : 
              <Play className="text-slate-600 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5" />
            }
          </button>

          {/* Counter - Mucho Más Discreto */}
          <div className="hidden sm:flex items-center bg-white rounded-md shadow-sm border border-slate-200
                         space-x-0.5 sm:space-x-0.5 md:space-x-1 lg:space-x-1 xl:space-x-1
                         px-1 sm:px-1 md:px-1.5 lg:px-2 xl:px-2
                         py-0.5 sm:py-0.5 md:py-0.5 lg:py-1 xl:py-1">
            <span className="text-[#E4173C] font-semibold text-[9px] sm:text-[10px] md:text-xs lg:text-xs xl:text-xs">{currentSlide + 1}</span>
            <span className="text-slate-400 text-[9px] sm:text-[10px] md:text-xs lg:text-xs xl:text-xs">/</span>
            <span className="text-slate-600 text-[9px] sm:text-[10px] md:text-xs lg:text-xs xl:text-xs">{slides.length}</span>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar - Muy Sutil */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-0.5 md:h-0.5 lg:h-1 xl:h-1 bg-slate-200">
        <div 
          className="h-full bg-gradient-to-r from-[#E4173C] to-red-400 transition-all duration-500 ease-out"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}