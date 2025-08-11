"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSlider() {
  const slides = [
    {
      text: "Solutions built to evolve toward",
      highlight: "smart automation",
      end: "as markets advance.",
    },
    {
      text: "Designing systems for",
      highlight: "industrial efficiency",
      end: "with lasting impact.",
    },
    {
      text: "We have",
      highlight: "over 25 years",
      end: "of experience in automation expertise.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showText, setShowText] = useState(false);

  // Cuando cambie el slide, escondemos el texto y luego lo mostramos con slide in
  useEffect(() => {
    setShowText(false); // ocultar texto
    const timeout = setTimeout(() => setShowText(true), 100); // mostrar con slide in después de 100ms
    return () => clearTimeout(timeout);
  }, [currentSlide]);

  // Después de definir sliderRef e instanceRef:
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  // Autoplay: avanza slide cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);

    return () => clearInterval(interval);
  }, [instanceRef]);

  const nextSlide = () => instanceRef.current?.next();
  const prevSlide = () => instanceRef.current?.prev();

  return (
    <div className="w-full h-full flex items-center justify-between pr-15 pl-15 pt-4">
      {/* Columna izquierda: Texto + botones */}
      <div className="flex flex-col justify-between min-w-[410px] h-full">
        <div>
          <p
            className={`
            font-main text-2xl leading-snug font-bold pt-10 break-words
            transition-transform duration-500 ease-out
            ${
              showText
                ? "translate-x-0 opacity-100"
                : "translate-x-[-50px] opacity-0"
            }
          `}
          >
            {slides[currentSlide].text}{" "}
            <span className="text-[#E4173C] font-main font-semibold">
              {slides[currentSlide].highlight}
            </span>{" "}
            {slides[currentSlide].end}
          </p>
        </div>

        {/* Botones avanzar/retroceder */}
        <div className="flex items-center space-x-4 pb-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border border-gray-300 hover:border-[#E4173C] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border border-gray-300 hover:border-[#E4173C] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Columna derecha: Slider + dots */}
      <div className="flex items-center">
        {/* Slider */}
        <div
          ref={sliderRef}
          className="keen-slider w-0 h-0 overflow-hidden absolute"
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="keen-slider__slide">
              {/* No necesitamos contenido visible */}
            </div>
          ))}
        </div>

        {/* Dots verticales */}
        <div className="flex flex-col items-center space-y-4 ml-6 max-h-full max-w-[80px]">
          {slides.map((_, idx) => {
            const active = currentSlide === idx;
            return (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`
          w-5 h-5 flex items-center justify-center rounded-full
          transition-all duration-500 ease-out
          ${
            active
              ? "border-2 border-[#E4173C] scale-110"
              : "border border-transparent scale-100"
          }
        `}
                style={{
                  boxShadow: active ? "0 0 6px rgba(239, 68, 68, 0.4)" : "none",
                }}
                type="button"
              >
                <span
                  className={`
            w-2 h-2 rounded-full transition-all duration-500 ease-out
            ${active ? "bg-[#020C18] scale-100" : "bg-gray-300 scale-90"}
          `}
                ></span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
