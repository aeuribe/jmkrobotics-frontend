import React from "react";
import ProductFrame from "./ProductFrame";

const ProductSection = () => {
  return (
    <div className="bg-[#020C18] pt-20 ">
      <h2 className="font-main font-bold text-3xl text-white flex justify-center">
        Our Machines
      </h2>
      <div className="grid grid-cols-3 grid-rows-2 pt-10">
        <ProductFrame
          className="border-b border-r border-t border-[#2E3C51]"
          title="Capping Machine"
          icon="/bottle_icon.png"
          image="/capping_image.jpg"
        />
        <ProductFrame
          className="border-b border-r border-t border-[#2E3C51]"
          title="Sealing Machine"
          icon="/sealed_bag_icon.png"
          image="/sealing_machine.jpg"
        />
        <ProductFrame
          className="border-b border-t border-[#2E3C51]" // Última columna no tiene border-r
          title="Filling Machine"
          icon="/filling_machine.svg"
          image="/filling_machine.jpg"
        />
        <ProductFrame
          className="border-r border-b border-[#2E3C51]" // Última fila no tiene border-b
          title="Labeling Machine"
          icon="/label_icon.png"
          image="/labeling-machine.jpg"
        />
        <ProductFrame
          className="border-r border-b border-[#2E3C51]"
          title="Wrapping Machine"
          icon="/wrapping_icon.png"
          image="/wraping_machine.jpg"
        />
        <ProductFrame
          className="border-b border-[#2E3C51]" // Última fila no tiene border-b
          title="Metal Detector" // Última fila y última columna sin bordes
          icon="/metal_detector.png"
          image="metal_detector.jpg"
        />
      </div>
    </div>
  );
};

export default ProductSection;
