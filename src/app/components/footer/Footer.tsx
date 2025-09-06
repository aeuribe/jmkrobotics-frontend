import Link from "next/link";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#1A2330] text-white">
      {/* Main Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-start sm:col-span-2 lg:col-span-1">
            <div className="mb-4 lg:mb-5">
              <Image
                src="/JMKRobotics.png"
                alt="JMK Robotics Logo"
                className="h-10 sm:h-11 lg:h-12 w-auto object-contain"
                width={120}
                height={55}
              />
            </div>
            <p className="text-[#6E7784] text-xs sm:text-sm leading-relaxed max-w-xs">
              Leading industrial automation solutions for a smarter future.
            </p>
          </div>

          {/* Products Section */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold mb-3 sm:mb-4 
                          text-sm sm:text-base lg:text-base">
              Products
            </h3>
            <div className="flex flex-col space-y-2 sm:space-y-2.5">
              <Link 
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative" 
                href="/"
              >
                <span className="relative">
                  Capping Machine
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <Link 
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative" 
                href="/"
              >
                <span className="relative">
                  Sealing Machine
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <Link 
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative" 
                href="/"
              >
                <span className="relative">
                  Filling Machine
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <Link 
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative" 
                href="/"
              >
                <span className="relative">
                  Labeling Machine
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <Link 
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative" 
                href="/"
              >
                <span className="relative">
                  Wrapping Machine
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <Link 
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative" 
                href="/"
              >
                <span className="relative">
                  Metal Detector
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            </div>
          </div>

          {/* Solutions Section */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold mb-3 sm:mb-4 
                          text-sm sm:text-base lg:text-base">
              Solutions
            </h3>
            <div className="flex flex-col space-y-2 sm:space-y-2.5">
              <Link
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative"
                href="/"
              >
                <span className="relative">
                  Packaging
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <Link
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative"
                href="/"
              >
                <span className="relative">
                  Manufacturing
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <Link
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative"
                href="/"
              >
                <span className="relative">
                  Process Control
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <Link
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative"
                href="/"
              >
                <span className="relative">
                  Quality Control
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            </div>
          </div>

          {/* Support & Contact Section */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold mb-3 sm:mb-4 
                          text-sm sm:text-base lg:text-base">
              Support
            </h3>
            <div className="flex flex-col space-y-2 sm:space-y-2.5">
              <Link
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative"
                href="/"
              >
                <span className="relative">
                  Find a Dealer
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <Link
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative"
                href="/"
              >
                <span className="relative">
                  Technical Support
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <Link
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative"
                href="/"
              >
                <span className="relative">
                  FAQs
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <Link
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative"
                href="/"
              >
                <span className="relative">
                  Documentation
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-[#2B3441]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            {/* Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-[#6E7784] text-xs sm:text-sm">
                © 2025 JMK Robotics. All rights reserved.
              </p>
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4">
              <Link
                href="/"
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative"
              >
                <span className="relative">
                  Privacy Policy
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <Link
                href="/"
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative"
              >
                <span className="relative">
                  Terms of Service
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <Link
                href="/"
                className="text-[#6E7784] hover:text-white transition-colors duration-200
                          text-xs sm:text-sm group relative"
              >
                <span className="relative">
                  Contact
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#E4173C] 
                                 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;