"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface MachinesDropdownProps {
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
}

interface Machine {
  id: string;
  nameKey: string;
}

interface MachineCategory {
  id: string;
  nameKey: string;
  machines: Machine[];
}

const MACHINE_CATEGORIES: MachineCategory[] = [
  {
    id: "filling-dosing",
    nameKey: "fillingDosing",
    machines: [
      { id: "automatic-weight-filler", nameKey: "linearWeightFiller.name" },
      { id: "liquid-filling-machine", nameKey: "liquidFillingMachine.name" },
    ],
  },
  // {
  //   id: "sealing-packaging",
  //   nameKey: "sealingPackaging",
  //   machines: [
  //     { id: "case-sealer", nameKey: "caseSealer.name" },
  //     { id: "vertical-form-fill-seal", nameKey: "verticalFormFillSeal.name" },
  //     { id: "pillow-pack-machine", nameKey: "pillowPackMachine.name" }
  //   ]
  // },
  // {
  //   id: "labeling-identification",
  //   nameKey: "labelingIdentification",
  //   machines: [
  //     { id: "labeling-machine", nameKey: "labelingMachine.name" },
  //     { id: "bottle-labeler", nameKey: "bottleLabeler.name" },
  //     { id: "box-labeler", nameKey: "boxLabeler.name" }
  //   ]
  // },
  // {
  //   id: "conveyor-handling",
  //   nameKey: "conveyorHandling",
  //   machines: [
  //     { id: "belt-conveyor-systems", nameKey: "beltConveyorSystems.name" },
  //     { id: "accumulation-tables", nameKey: "accumulationTables.name" },
  //     { id: "product-elevators", nameKey: "productElevators.name" }
  //   ]
  // },
  // {
  //   id: "quality-inspection",
  //   nameKey: "qualityInspection",
  //   machines: [
  //     { id: "metal-detector-systems", nameKey: "metalDetectorSystems.name" },
  //     { id: "checkweigher-scales", nameKey: "checkweigherScales.name" },
  //     { id: "vision-inspection-systems", nameKey: "visionInspectionSystems.name" }
  //   ]
  // },
  // {
  //   id: "palletizing",
  //   nameKey: "palletizing",
  //   machines: [
  //     { id: "robotic-palletizers", nameKey: "roboticPalletizers.name" },
  //     { id: "layer-palletizers", nameKey: "layerPalletizers.name" },
  //     { id: "pallet-dispensers", nameKey: "palletDispensers.name" }
  //   ]
  // },
  // {
  //   id: "coding-marking",
  //   nameKey: "codingMarking",
  //   machines: [
  //     { id: "inkjet-printers", nameKey: "inkjetPrinters.name" },
  //     { id: "laser-marking-systems", nameKey: "laserMarkingSystems.name" },
  //     { id: "thermal-transfer-printers", nameKey: "thermalTransferPrinters.name" }
  //   ]
  // },
  // {
  //   id: "cleaning-sanitation",
  //   nameKey: "cleaningSanitation",
  //   machines: [
  //     { id: "cip-systems", nameKey: "cipSystems.name" },
  //     { id: "container-rinser", nameKey: "containerRinser.name" },
  //     { id: "air-knife-dryers", nameKey: "airKnifeDryers.name" }
  //   ]
  // },
];

export function MachinesDropdown({
  isMobile = false,
  onMobileMenuClose,
}: MachinesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tDropdown = useTranslations("machinesDropdown");
  const tCategories = useTranslations("categories");
  const tMachines = useTranslations("machines");
  const t = useTranslations("header");

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMobile]);

  const handleLinkClick = () => {
    setIsOpen(false);
    onMobileMenuClose?.();
  };

  // Mobile version
  if (isMobile) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-red-500 transition-colors flex items-center gap-1 w-full"
        >
          {t("nav.machines")}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="mt-3 space-y-3">
            <div className="text-gray-400 text-xs mb-2 px-3">
              {MACHINE_CATEGORIES.length} {tDropdown("categoriesAvailable")}
            </div>
            {MACHINE_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="border-l-2 border-gray-700 hover:border-red-500 transition-colors"
              >
                <div className="w-full text-left group pl-4 pr-2 py-2">
                  <Link
                    href={`/machines/${category.id}`}
                    onClick={handleLinkClick}
                    className="w-full text-left block"
                  >
                    <div className="text-white group-hover:text-red-400 transition-colors text-sm mb-2">
                      {tCategories(category.nameKey)}
                    </div>
                  </Link>
                  <div className="space-y-1">
                    {category.machines.map((machine, idx) => (
                      <Link
                        key={idx}
                        href={`/machines/${category.id}/${machine.id}`}
                        onClick={handleLinkClick}
                        className="text-gray-500 text-xs flex items-start gap-1.5 hover:text-red-400 transition-colors w-full text-left"
                      >
                        <span className="text-red-500/50 mt-0.5">▸</span>
                        <span>{tMachines(machine.nameKey)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop version - Megamenu
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-red-500 transition-colors flex items-center gap-1"
      >
        {t("nav.machines")}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[1100px] bg-[#020C18] border-2 border-gray-700 shadow-2xl z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#020C18] via-[#051425] to-[#020C18] px-8 py-5 border-b-2 border-red-500">
            <h3 className="text-white text-xl">{tDropdown("title")}</h3>
            <p className="text-gray-400 text-sm mt-1">
              {tDropdown("subtitle")}
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-4 gap-0 bg-gray-900/20">
            {MACHINE_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="bg-[#020C18] p-6 text-left hover:bg-red-500/10 transition-all group border-r border-b border-gray-800/50 last:border-r-0"
              >
                {/* Category Title */}
                <Link
                  href={`/machines/${category.id}`}
                  onClick={handleLinkClick}
                  className="w-full text-left block"
                >
                  <h3 className="text-white group-hover:text-red-500 transition-colors mb-4 min-h-[3rem] flex items-center">
                    <span className="border-l-2 border-transparent group-hover:border-red-500 pl-3 transition-all">
                      {tCategories(category.nameKey)}
                    </span>
                  </h3>
                </Link>

                {/* Machine List */}
                <div className="space-y-2.5 pl-3">
                  {category.machines.map((machine, idx) => (
                    <Link
                      key={idx}
                      href={`/machines/${category.id}/${machine.id}`}
                      onClick={handleLinkClick}
                      className="text-gray-300 text-xs hover:text-red-400 transition-colors flex items-start gap-2 w-full text-left"
                    >
                      <span className="text-red-500/50 hover:text-red-500 transition-colors mt-0.5">
                        ▸
                      </span>
                      <span>{tMachines(machine.nameKey)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-[#020C18] via-[#051425] to-[#020C18] px-8 py-4 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              {tDropdown("customSolution")}{" "}
              <Link
                href="/contact"
                className="text-red-500 hover:text-red-400 transition-colors underline-offset-2 hover:underline"
              >
                {tDropdown("contactEngineering")}
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
