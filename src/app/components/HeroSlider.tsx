"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Cpu, Factory, BrainCircuit, Play, Pause } from "lucide-react";

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
  const slides: SlideData[] = [
    {
      text: "Advanced",
      highlight: "AI-driven automation",
      end: "for industrial excellence.",
      icon: <BrainCircuit className="w-4 h-4 text-slate-600" />,
      bgGradient: "from-white to-white",
      accentColor: "slate"
    },
    {
      text: "Precision",
      highlight: "manufacturing systems",
      end: "optimized for efficiency.",
      icon: <Factory className="w-4 h-4 text-slate-600" />,
      bgGradient: "from-white to-white",
      accentColor: "blue"
    },
    {
      text: "Next-generation",
      highlight: "process control",
      end: "with intelligent monitoring.",
      icon: <Cpu className="w-4 h-4 text-slate-600" />,
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
      
      {/* Main Content Container */}
      <div className="relative z-10 h-full flex items-center justify-between px-6 py-4">
        
        {/* Left Column: Icon */}
        <div className="flex items-center">
          <div className={`
            flex items-center justify-center w-12 h-12 
            rounded-lg bg-white shadow-sm border border-slate-200
            transition-all duration-500 ease-out
            ${showText ? "scale-100 rotate-0 opacity-100" : "scale-90 rotate-12 opacity-0"}
          `}>
            {currentSlideData.icon}
          </div>
        </div>

        {/* Center Column: Main Content */}
        <div className="flex-1 px-6">
          <div className={`
            transition-all duration-500 ease-out
            ${showText ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
          `}>
            <h2 className="text-lg leading-tight text-slate-800">
              <span className="font-medium text-slate-600">{currentSlideData.text}</span>{" "}
              <span className="text-[#E4173C] font-semibold">
                {currentSlideData.highlight}
              </span>{" "}
              <span className="font-medium text-slate-600">{currentSlideData.end}</span>
            </h2>
            
            {/* Subtle progress indicator */}
            <div className={`
              w-16 h-0.5 bg-gradient-to-r from-[#E4173C] to-red-400 rounded-full mt-3
              transition-all duration-500 ease-out delay-200
              ${showText ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
            `}></div>
          </div>
        </div>

        {/* Right Column: Controls and Indicators */}
        <div className="flex items-center space-x-3">
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="group p-2 rounded-md bg-white shadow-sm border border-slate-200
                     hover:bg-slate-50 hover:border-slate-300 hover:shadow-md disabled:opacity-50
                     transition-all duration-200 ease-out"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-3 h-3 text-slate-600 group-hover:text-slate-800 transition-colors" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="group p-2 rounded-md bg-slate-800 shadow-sm border border-slate-700
                     hover:bg-slate-700 hover:shadow-md disabled:opacity-50
                     transition-all duration-200 ease-out"
            aria-label="Next slide"
          >
            <ChevronRight className="w-3 h-3 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center space-x-1.5 ml-2">
            {slides.map((_, idx) => {
              const active = currentSlide === idx;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  disabled={isTransitioning}
                  className={`
                    relative overflow-hidden rounded-full
                    transition-all duration-300 ease-out
                    ${active ? "w-6 h-2" : "w-2 h-2"}
                    ${isTransitioning ? "opacity-50" : "opacity-100"}
                  `}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div className={`
                    w-full h-full rounded-full
                    transition-all duration-300 ease-out
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

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="group p-2 rounded-md bg-slate-100 shadow-sm border border-slate-200
                     hover:bg-slate-200 hover:shadow-md
                     transition-all duration-200 ease-out ml-2"
            aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isAutoPlaying ? 
              <Pause className="w-3 h-3 text-slate-600" /> : 
              <Play className="w-3 h-3 text-slate-600" />
            }
          </button>

          {/* Counter */}
          <div className="flex items-center space-x-1 px-2 py-1 bg-white rounded-md shadow-sm border border-slate-200">
            <span className="text-[#E4173C] font-semibold text-xs">{currentSlide + 1}</span>
            <span className="text-slate-400 text-xs">/</span>
            <span className="text-slate-600 text-xs">{slides.length}</span>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-200">
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