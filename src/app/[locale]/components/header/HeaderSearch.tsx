'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { searchMachines, SearchResult } from '@/lib/algolia';

export function HeaderSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 🚀 Aquí llamas a tu función de Algolia
  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    if (!query) return setResults([]);

    const hits = await searchMachines(query);
    setResults(hits);
  };

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleResultClick = (url: string) => {
    setIsOpen(false);
    setSearchTerm('');
    setResults([]);
    window.location.href = url;
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-[#ff002f] transition-colors p-2"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setIsOpen(false)}
            />

            {/* Search Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              /* RESPONSIVE FIX: w-[92vw] para móvil, max-w-2xl para desktop. Ajuste de posición top. */
              className="fixed top-16 md:top-20 left-1/2 -translate-x-1/2 w-[92vw] md:w-full md:max-w-2xl bg-[#020C18] border-1 border-gray-700 shadow-2xl z-[70]  md:rounded-none overflow-hidden"
            >
              <div className="relative border-b border-gray-700">
                {/* Icono ajustado con left-4 para móvil y left-6 para desktop */}
                <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search machines..."
                  /* RESPONSIVE FIX: padding responsive, tamaño de texto base->lg */
                  className="w-full pl-12 pr-12 md:pl-14 md:pr-14 py-4 md:py-5 bg-transparent text-white placeholder-gray-400 text-base md:text-lg focus:outline-none"
                />
                
                {searchTerm && (
                  <button
                    onClick={() => handleSearch('')}
                    /* Icono de cerrar ajustado a la derecha */
                    className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ff002f] transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                {searchTerm.length === 0 ? (
                  <div className="p-6 md:p-8 text-center">
                    <p className="text-gray-400 text-sm md:text-base">Start typing to search...</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleResultClick(result.url)}
                        /* RESPONSIVE FIX: px-4 para móvil, px-6 para desktop. */
                        className="w-full px-4 md:px-6 py-3 md:py-4 flex items-start gap-3 md:gap-4 hover:bg-gray-800/50 transition-colors group text-left"
                      >
                        {/* flex-1 min-w-0 es vital para que el truncate funcione dentro de flex */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-white group-hover:text-[#ff002f] transition-colors text-sm md:text-base font-medium truncate max-w-full">
                              {result.title}
                            </h3>
                            <span className="text-[10px] md:text-xs px-1.5 py-0.5 bg-gray-700 text-gray-400 uppercase rounded whitespace-nowrap">
                              {result.type}
                            </span>
                          </div>
                          {result.description && (
                            <p className="text-xs md:text-sm text-gray-400 line-clamp-1 break-words">
                              {result.description}
                            </p>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-[#ff002f] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 md:p-8 text-center">
                    <p className="text-gray-400 mb-2 text-sm md:text-base">No results found for `&quot;`{searchTerm}`&quot;`</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}