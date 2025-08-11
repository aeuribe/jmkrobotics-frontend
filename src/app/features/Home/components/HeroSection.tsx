import React from "react";
import HeroSlider from "@/app/components/HeroSlider";
import LinkButton from "@/app/components/LinkButton";

const HeroSection = () => {
  return (
    <div>
      <section className="relative w-full h-[650px] overflow-hidden">
        {/* Video de fondo alineado a la derecha */}
        <video
          src="/video-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute right-0 top-0 w-[75%] min-h-full object-cover z-0"
        />

        {/* Overlay opcional para contraste */}
        <div className="absolute right-0 top-0 min-w-[75%] min-h-full bg-black/50 z-0" />

        {/* Contenido superpuesto dentro del área del video */}
        <div className="relative z-10 flex items-center justify-start h-full px-20">
          <div className="max-w-2xl text-white text-left font-main flex flex-col gap-4">
            <p className="font-main text-md tracking-wide">
              Precision <span className="text-[#E4173C]">In</span> Motion
            </p>
            <h1 className="font-medium font-main text-[80px] min-w-3xl leading-tight">
              Industrial Solutions for a{" "}
              <span className="text-[#E4173C]">Smarter</span> Future
            </h1>
            <div className="flex gap-12">
              <LinkButton label="Packaging" href="/" />
              <LinkButton label="Manufacturing" href="/" />
            </div>
          </div>
        </div>

        {/* Recuadro blanco flotante sobre el video */}
        <div className="absolute bottom-0 right-[50px] w-[550px] h-[230px] bg-white z-30 shadow-lg">
          <HeroSlider />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
