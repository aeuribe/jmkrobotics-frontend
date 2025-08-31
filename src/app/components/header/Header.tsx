"use client"
import React, { useState } from 'react';
import { Search, Globe, Mail, Menu, X, Check, MapPin } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  const languages: Language[] = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
  ];

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openLanguageModal = (): void => {
    setIsLanguageModalOpen(true);
  };

  const closeLanguageModal = (): void => {
    setIsLanguageModalOpen(false);
  };

  const handleLanguageSelect = (languageCode: string): void => {
    setSelectedLanguage(languageCode);
    setIsLanguageModalOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      closeLanguageModal();
    }
  };

  return (
    <>
      <header className="relative bg-[#020C18]">
        <div className="flex justify-between items-center h-16 md:h-20 px-4 sm:px-6 lg:px-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <p className="text-white font-jakarta font-bold text-lg">
              <span className="text-[#E4173C]">JMK</span> ROBOTICS
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <div className="flex gap-6 xl:gap-10 text-white text-[14px] font-satoshi font-light tracking-wider">
              <a href="/" className="hover:text-[#E4173C] transition-colors">Home</a>
              <a href="/" className="hover:text-[#E4173C] transition-colors">Products</a>
              <a href="/" className="hover:text-[#E4173C] transition-colors">Solutions</a>
              <a href="/" className="hover:text-[#E4173C] transition-colors">Distributors</a>
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 flex-shrink-0">
            <button className="text-white hover:text-[#E4173C] transition-colors">
              <Search size={20} />
            </button>
            
            <button 
              onClick={openLanguageModal}
              className="text-white hover:text-[#E4173C] transition-colors"
            >
              <Globe size={20} />
            </button>

            <button className="flex items-center gap-2 bg-[#E4173C] text-[#020C18] text-[14px] rounded-md px-3 py-1 font-medium hover:bg-[#c91534] transition-colors">
              <Mail size={16} />
              <span className="hidden lg:inline">Contact Us</span>
              <span className="lg:hidden">Contact</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#020C18] border-t border-gray-700 z-50">
            <nav className="px-4 py-6">
              <div className="flex flex-col gap-4 mb-6">
                <a href="/" className="text-white hover:text-[#E4173C] transition-colors py-2 font-satoshi font-light">Home</a>
                <a href="/" className="text-white hover:text-[#E4173C] transition-colors py-2 font-satoshi font-light">Products</a>
                <a href="/" className="text-white hover:text-[#E4173C] transition-colors py-2 font-satoshi font-light">Solutions</a>
                <a href="/" className="text-white hover:text-[#E4173C] transition-colors py-2 font-satoshi font-light">Distributors</a>
              </div>
              
              <div className="flex flex-col gap-4 pt-4 border-t border-gray-700">
                <div className="flex items-center gap-4">
                  <button className="text-white hover:text-[#E4173C] transition-colors p-2">
                    <Search size={20} />
                  </button>
                  
                  <button 
                    onClick={openLanguageModal}
                    className="text-white hover:text-[#E4173C] transition-colors p-2"
                  >
                    <Globe size={20} />
                  </button>
                </div>
                <button className="flex items-center justify-center gap-2 bg-[#E4173C] text-[#020C18] text-[14px] rounded-md px-4 py-3 font-medium hover:bg-[#c91534] transition-colors w-full">
                  <MapPin size={16} />
                  Find a Dealer
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Language Modal */}
      {isLanguageModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Select Language</h2>
                <button
                  onClick={closeLanguageModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{language.flag}</span>
                      <span className="text-gray-900">{language.name}</span>
                    </div>
                    {selectedLanguage === language.code && (
                      <Check size={16} className="text-[#E4173C]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;