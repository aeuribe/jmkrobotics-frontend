'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale } from 'next-intl';
import { searchMachines, SearchResult } from '@/lib/algolia';

export function HeaderSearch() {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const hits = await searchMachines(query);
    setResults(hits);
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleResultClick = (url: string) => {
    setIsOpen(false);
    setSearchTerm('');
    setResults([]);
    window.location.href = url;
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-[2px] border border-[#0F141E]/[0.11] bg-[#EAE8E1] px-3 py-1.5 text-xs font-medium text-[#475569] transition-all hover:border-[#0B2D5B]/25 hover:bg-[#FAF9F6] hover:text-[#0F141E]"
        aria-label={isEs ? 'Buscar maquinaria' : 'Search machinery'}
      >
        <Search className="h-3.5 w-3.5 text-[#1E3A5F]" />
        <span className="hidden xl:inline">{isEs ? 'Buscar...' : 'Search...'}</span>
        <kbd className="hidden xl:inline-flex items-center rounded border border-[#0F141E]/[0.13] bg-[#FAF9F6] px-1.5 py-0.5 font-mono text-[10px] text-[#5C6575]">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[60] obsidian-stage/45 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 top-20 z-[70] w-[92vw] max-w-2xl -translate-x-1/2 overflow-hidden rounded-[2px] border border-[#0F141E]/[0.11] bg-[#FAF9F6] shadow-[0_24px_64px_-12px_rgba(7,26,54,0.28)]"
            >
              <div className="relative flex items-center border-b border-[#0F141E]/[0.09]">
                <Search className="pointer-events-none absolute left-5 h-5 w-5 text-[#1E3A5F]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder={isEs ? 'Buscar llenadoras, tapadoras, etiquetadoras...' : 'Search fillers, cappers, labelers...'}
                  className="w-full bg-transparent py-4 pl-13 pr-12 text-base text-[#0F141E] placeholder-[#94A3B8] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => (searchTerm ? handleSearch('') : setIsOpen(false))}
                  className="absolute right-4 rounded-[2px] p-1.5 text-[#5C6575] transition-colors hover:bg-[#EAE8E1] hover:text-[#0F141E]"
                  aria-label={isEs ? 'Cerrar búsqueda' : 'Close search'}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[58vh] overflow-y-auto">
                {searchTerm.length === 0 ? (
                  <div className="px-6 py-8 text-center">
                    <p className="text-sm text-[#5C6575]">
                      {isEs
                        ? 'Escribe el nombre o aplicación del equipo que necesitas.'
                        : 'Start typing a machine name or packaging application.'}
                    </p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="divide-y divide-[#0B2D5B]/6 py-1">
                    {results.map((result, index) => (
                      <motion.button
                        type="button"
                        key={`${result.url}-${index}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        onClick={() => handleResultClick(result.url)}
                        className="group flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors hover:bg-[#F4F3EF]"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="truncate text-sm font-semibold text-[#0F141E] transition-colors group-hover:text-[#9E1C28]">
                              {result.title}
                            </h3>
                            <span className="rounded bg-[#0E131D]/8 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-[#1E3A5F]">
                              {result.type}
                            </span>
                          </div>
                          {result.description && (
                            <p className="mt-0.5 line-clamp-1 text-xs text-[#5C6575]">
                              {result.description}
                            </p>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-[#94A3B8] transition-all group-hover:translate-x-1 group-hover:text-[#9E1C28]" />
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="px-6 py-8 text-center">
                    <p className="text-sm text-[#5C6575]">
                      {isEs ? `Sin resultados para "${searchTerm}"` : `No results found for "${searchTerm}"`}
                    </p>
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
