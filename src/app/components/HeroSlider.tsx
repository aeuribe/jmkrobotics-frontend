"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Zap, Award, Play, Pause } from "lucide-react";

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
      text: "Built for",
      highlight: "smart automation",
      end: "that evolves with markets.",
      icon: <Sparkles className="w-4 h-4 text-[#E4173C]" />,
      bgGradient: "from-blue-50 via-indigo-50 to-purple-50",
      accentColor: "indigo"
    },
    {
      text: "Designing",
      highlight: "industrial efficiency",
      end: "with lasting impact.",
      icon: <Zap className="w-4 h-4 text-[#E4173C]" />,
      bgGradient: "from-emerald-50 via-green-50 to-teal-50",
      accentColor: "emerald"
    },
    {
      text: "We have",
      highlight: "25+ years",
      end: "of automation expertise.",
      icon: <Award className="w-4 h-4 text-[#E4173C]" />,
      bgGradient: "from-purple-50 via-violet-50 to-pink-50",
      accentColor: "purple"
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
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' width='20' height='20' fill='none' stroke='rgb(0 0 0 / 0.1)'%3e%3cpath d='m0 .5h20m-20 20v-20'/%3e%3c/svg%3e")`,
               backgroundSize: '20px 20px'
             }} 
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#E4173C] rounded-full opacity-60 animate-ping animation-delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-40 animate-bounce animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-indigo-400 rounded-full opacity-50 animate-pulse animation-delay-3000"></div>
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10 h-full flex items-center justify-between px-6 py-4">
        
        {/* Left Column: Icon */}
        <div className="flex items-center">
          <div className={`
            flex items-center justify-center w-12 h-12 
            rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-white/30
            transition-all duration-500 ease-out
            ${showText ? "scale-100 rotate-0 opacity-100" : "scale-75 rotate-45 opacity-0"}
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
            <h2 className="text-lg leading-tight text-gray-800">
              <span className="font-medium">{currentSlideData.text}</span>{" "}
              <span className="text-[#E4173C] font-semibold relative">
                {currentSlideData.highlight}
                <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#E4173C] opacity-40 rounded-full"></span>
              </span>{" "}
              <span className="font-medium">{currentSlideData.end}</span>
            </h2>
            
            {/* Subtle progress indicator */}
            <div className={`
              w-16 h-0.5 bg-gradient-to-r from-[#E4173C] to-pink-400 rounded-full mt-3
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
            className="group p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md border border-white/30
                     hover:bg-white hover:shadow-lg hover:scale-105 disabled:opacity-50
                     transition-all duration-200 ease-out"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-3 h-3 text-gray-700 group-hover:text-[#E4173C] transition-colors" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="group p-2 rounded-full bg-[#E4173C] shadow-md 
                     hover:bg-[#c21538] hover:shadow-lg hover:scale-105 disabled:opacity-50
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
                      ? "bg-[#E4173C] shadow-sm" 
                      : "bg-gray-300 hover:bg-gray-400"
                    }
                  `}></div>
                  
                  {active && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E4173C] to-pink-400 animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="group p-2 rounded-full bg-gray-700/80 backdrop-blur-sm shadow-md border border-gray-600/30
                     hover:bg-gray-700 hover:shadow-lg hover:scale-105
                     transition-all duration-200 ease-out ml-2"
            aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isAutoPlaying ? 
              <Pause className="w-3 h-3 text-white" /> : 
              <Play className="w-3 h-3 text-white" />
            }
          </button>

          {/* Counter */}
          <div className="flex items-center space-x-1 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/30">
            <span className="text-[#E4173C] font-semibold text-xs">{currentSlide + 1}</span>
            <span className="text-gray-400 text-xs">/</span>
            <span className="text-gray-600 text-xs">{slides.length}</span>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-[#E4173C] to-pink-400 transition-all duration-500 ease-out"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}