import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const ButtonExplore = () => {
  const t = useTranslations("hero");
  return (
            <div className="mt-8 sm:mt-6 md:mt-7 lg:mt-8 xl:mt-10
                           animate-fadeInSlideUp animation-delay-300
                           flex justify-start">
              <Link
                href="/solutions"
                role="button"
                aria-label={t("explore")}
                className="group relative inline-flex items-center gap-2 sm:gap-3
                          /* Móvil: Botón más discreto */
                          bg-white/30 hover:bg-white/15 active:bg-white/20
                          backdrop-blur-sm
                          text-white font-medium
                          px-5 py-3 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-7 lg:py-3 xl:px-8 xl:py-4
                          sm:rounded-none
                          text-sm sm:text-sm md:text-sm lg:text-base xl:text-base
                          transition-all duration-300 ease-out
                          transform hover:translate-x-1
                          min-h-[44px] sm:min-h-auto"
              >
                {/* Contenido del botón */}
                <span className="relative flex items-center gap-2">
                  {/* Icono sutil */}
                  <svg 
                    className="w-4 h-4 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 
                              transition-all duration-300 group-hover:translate-x-0.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                          d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  
                  <span className="relative">
                    {t("explore")}
                    {/* Línea decorativa sutil */}
                    <div className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#ff002f] 
                                   group-hover:w-full transition-all duration-300"></div>
                  </span>
                </span>
              </Link>
            </div>
  )
}

export default ButtonExplore
