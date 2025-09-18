"use client";

import React, { ReactNode } from "react";
import Header from "@/app/[locale]/components/header/Header";
import Footer from "@/app/[locale]/components/footer/Footer";
import { ArrowLeft, FileText, Shield } from "lucide-react";
import Link from "next/link";

type LegalPageLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
  lastUpdated: string;
  icon: "terms" | "privacy";
  onBack?: () => void;
};

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  lastUpdated, 
  icon,
  onBack 
}) => {
  const IconComponent = icon === "terms" ? FileText : Shield;

  return (
    <div className="w-full min-h-screen" style={{backgroundColor: '#020C18'}}>
      {/* Corporate background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60' width='60' height='60' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 30h60M30 0v60M15 15h30M15 45h30'/%3e%3c/svg%3e")`,
               backgroundSize: '60px 60px'
             }} 
        />
      </div>

      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff002f]/20 via-transparent to-[#2E3C51]/20"></div>
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <Header />
        
        {/* Legal Page Hero */}
        <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
          {/* Back button */}
          {onBack && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-[#6E7784] hover:text-white
                          transition-colors duration-300 group"
                aria-label="Go back to main site"
              >
                <ArrowLeft 
                  size={20} 
                  className="transition-transform duration-300 group-hover:-translate-x-1" 
                />
                <span className="text-sm sm:text-base">Back to main site</span>
              </button>
            </div>
          )}

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Icon */}
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20
                             bg-[#ff002f]/10 border border-[#ff002f]/20 rounded-full">
                <IconComponent 
                  size={32} 
                  className="text-[#ff002f]" 
                />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 
                          font-semibold text-white mb-4 sm:mb-6
                          leading-tight tracking-tight">
              {title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-[#6E7784] text-base sm:text-lg lg:text-xl 
                         max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
              {subtitle}
            </p>

            {/* Last updated */}
            <div className="inline-flex items-center gap-2 px-4 py-2 
                           bg-[#0A1220]/50 border border-[#2E3C51] 
                           text-[#6E7784] text-sm sm:text-base">
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/2 left-4 w-1 h-16 bg-gradient-to-b from-transparent via-[#ff002f] to-transparent opacity-30"></div>
          <div className="absolute top-1/2 right-4 w-1 h-16 bg-gradient-to-b from-transparent via-[#ff002f] to-transparent opacity-30"></div>
        </section>

        {/* Content Section */}
        <section className="relative py-8 sm:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0A1220]/30 backdrop-blur-sm border border-[#2E3C51]
                           shadow-xl shadow-black/20 overflow-hidden">
              
              {/* Content container */}
              <div className="p-6 sm:p-8 lg:p-12">
                {children}
              </div>

              {/* Bottom border accent */}
              <div className="h-1 bg-gradient-to-r from-transparent via-[#ff002f] to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-[#0A1220]/50 backdrop-blur-sm border border-[#2E3C51] 
                           p-6 sm:p-8 lg:p-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                Questions or Concerns?
              </h2>
              <p className="text-[#6E7784] mb-6 sm:mb-8">
                If you have any questions about this {icon === "terms" ? "Terms and Conditions" : "Privacy Policy"}, 
                please don&#39;t hesitate to contact us.
              </p>
              <div className="inline-flex items-center gap-4 text-sm sm:text-base">
                <Link 
                  href="mailto:info@servicesjmk.com" 
                  className="text-[#ff002f] hover:text-white transition-colors duration-300"
                >
                  info@servicesjmk.com
                </Link>

                {/* Descomentar cuando haya un numero telefonico disponible */}
                {/* <span className="text-[#2E3C51]">|</span> */}
                {/* <Link 
                  href="tel:+1234567890" 
                  className="text-[#ff002f] hover:text-white transition-colors duration-300"
                >
                  +1 (234) 567-890
                </Link> */}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default LegalPageLayout;