import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type ProductFrameProps = {
  title?: string;
  icon?: string;
  image?: string;
  className?: string;
};

const ProductFrame: React.FC<ProductFrameProps> = ({ title, icon, image, className }) => {
  return (
    <div
      className={`relative text-white h-[320px] p-4
      flex flex-col justify-between cursor-pointer
      group transition-colors duration-300 ${className}`}
    >
      {/* Fondo imagen */}
      {image && (
        <>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "brightness(0.6)",
              zIndex: 0,
            }}
          />
          {/* Overlay viñeta izquierda */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(to right, rgba(2,12,24,0.8) 0%, rgba(2,12,24,0.3) 40%, rgba(2,12,24,0) 100%)",
              zIndex: 1,
            }}
          />
        </>
      )}

      {/* Contenedor icono con tamaño fijo sin padding */}
      <div className="relative z-10 flex justify-start pl-15 pt-5">
        <div className="w-[45px] h-[80px] overflow-hidden">
          {icon && (
            <Image
              src={icon}
              alt="Icon"
              width={55}
              height={55}
              className="object-contain pt-5"
              priority
            />
          )}
        </div>
      </div>

      {/* Título centrado */}
      <div className="relative z-10 flex-grow flex items-center justify-start text-center pl-15">
        {title && <h3 className="font-main text-3xl">{title}</h3>}
      </div>

      {/* Botón abajo centrado */}
      <div className="relative z-10 flex justify-start pb-2 pl-15">
        <button
          className="w-10 h-10 rounded-full border-1 border-[#2E3C51] flex items-center justify-center
            text-white transition-colors duration-300
            group-hover:bg-[#E4173C] group-hover:border-[#E4173C]
            group-hover:text-white"
          aria-label="Ver más"
          type="button"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductFrame;
