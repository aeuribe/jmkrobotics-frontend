"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Cpu, Factory, BrainCircuit } from "lucide-react";
import { useTranslations } from "next-intl";

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
      accentColor: "slate",
    },
    {
      text: t("text2"),
      highlight: t("highlight2"),
      end: t("end2"),
      icon: <Factory className="w-full h-full text-slate-600" />,
      bgGradient: "from-white to-white",
      accentColor: "blue",
    },
    {
      text: t("text3"),
      highlight: t("highlight3"),
      end: t("end3"),
      icon: <Cpu className="w-full h-full text-slate-600" />,
      bgGradient: "from-white to-white",
      accentColor: "gray",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showText, setShowText] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // swipe refs
  const touchStartRef = useRef<TouchPosition>({ x: 0, y: 0 });
  const touchEndRef = useRef<TouchPosition>({ x: 0, y: 0 });

  const goToSlide = useCallback(
    (slideIndex: number) => {
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
    },
    [currentSlide, isTransitioning]
  );

  const nextSlide = useCallback(() => {
    const next = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(next);
  }, [currentSlide, slides.length, goToSlide]);

  // autoplay simple
  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [nextSlide]);

  useEffect(() => {
    setShowText(false);
    const timeout = setTimeout(() => setShowText(true), 100);
    return () => clearTimeout(timeout);
  }, [currentSlide]);

  // swipe handlers
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

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        goToSlide(prev);
      }
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div
      className={`w-full h-full relative overflow-hidden transition-all duration-500 ease-out bg-gradient-to-r ${currentSlideData.bgGradient}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(71 85 105 / 0.2)'%3e%3cpath d='M0 16h32M16 0v32'/%3e%3c/svg%3e")`,
            backgroundSize: "16px 16px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-between px-4 sm:px-6 py-2 sm:py-4">
        {/* icon */}
        <div className="flex items-center flex-shrink-0">
          <div
            className={`
        flex items-center justify-center rounded-md bg-white shadow-sm border border-slate-200
        transition-all duration-500 ease-out
        w-6 h-6 sm:w-8 sm:h-8 ${
          showText ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }
      `}
          >
            <div className="w-3 h-3 sm:w-4 sm:h-4">{currentSlideData.icon}</div>
          </div>
        </div>

        {/* text */}
        <div className="flex-1 px-2 sm:px-3">
          <div
            className={`transition-all duration-500 ease-out ${
              showText ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <h2 className="leading-tight text-slate-800 text-[12px] sm:text-sm md:text-base text-center sm:text-left">
              <span className="font-medium text-slate-600">
                {currentSlideData.text}
              </span>{" "}
              <span className="text-[#ff002f] font-semibold">
                {currentSlideData.highlight}
              </span>{" "}
              <span className="font-medium text-slate-600">
                {currentSlideData.end}
              </span>
            </h2>
            <div
              className={`
          h-0.5 bg-gradient-to-r from-[#ff002f] to-red-400 rounded-full w-8 sm:w-12 mt-1 sm:mt-2 mx-auto sm:mx-0
          transition-all duration-500 ease-out delay-200
          ${showText ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
        `}
            ></div>
          </div>
        </div>

        {/* indicators */}
        <div className="hidden sm:flex items-center space-x-1">
          {slides.map((_, idx) => {
            const active = currentSlide === idx;
            return (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                disabled={isTransitioning}
                className={`
            rounded-full transition-all duration-300 ease-out
            ${
              active
                ? "w-4 h-2 bg-slate-700"
                : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
            }
          `}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-[#ff002f] to-red-400 transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
