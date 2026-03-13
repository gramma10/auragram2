
'use client';

import React, { useState, useEffect } from 'react';
import Logo from './Logo.tsx';
import { Language } from '../App.tsx';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  onStartProject: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onStartProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const t = {
    en: { work: 'Work', services: 'Services', contact: 'Contact', btn: 'Start Now' },
    gr: { work: 'Έργα', services: 'Υπηρεσίες', contact: 'Επικοινωνία', btn: 'Ξεκινήστε' }
  }[lang];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all ${isScrolled ? 'glass h-[64px] flex items-center' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between w-full">
        <a href="/" className="flex items-center">
          <div className="scale-[2] md:scale-[2.5] transform origin-left ml-2 md:ml-4">
            <Logo />
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-8">
            <a href="#work" className="text-[12px] font-bold text-white/40 hover:text-white uppercase tracking-widest">{t.work}</a>
            <a href="#services" className="text-[12px] font-bold text-white/40 hover:text-white uppercase tracking-widest">{t.services}</a>
            <a href="#contact" className="text-[12px] font-bold text-white/40 hover:text-white uppercase tracking-widest">{t.contact}</a>
          </div>
          <div className="flex items-center space-x-6 border-l border-white/10 pl-6">
            <div className="flex space-x-2">
              <button onClick={() => setLang('en')} className={`text-xs font-bold transition-colors ${lang === 'en' ? 'text-white' : 'text-white/30 hover:text-white/60'}`}>EN</button>
              <span className="text-white/20">/</span>
              <button onClick={() => setLang('gr')} className={`text-xs font-bold transition-colors ${lang === 'gr' ? 'text-white' : 'text-white/30 hover:text-white/60'}`}>GR</button>
            </div>
            <button onClick={onStartProject} className="px-6 py-2 bg-royal text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors">{t.btn}</button>
          </div>
        </div>

        {/* Mobile: Language Toggle + Hamburger */}
        <div className="flex md:hidden items-center space-x-4">
          <div className="flex space-x-1.5">
            <button onClick={() => setLang('en')} className={`text-[10px] font-bold transition-colors ${lang === 'en' ? 'text-white' : 'text-white/30'}`}>EN</button>
            <span className="text-white/20 text-[10px]">/</span>
            <button onClick={() => setLang('gr')} className={`text-[10px] font-bold transition-colors ${lang === 'gr' ? 'text-white' : 'text-white/30'}`}>GR</button>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <span className={`block w-5 h-[1.5px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}></span>
              <span className={`block w-5 h-[1.5px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-[1.5px] bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-full left-0 w-full glass border-t border-white/5 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-8 flex flex-col space-y-6">
          <a href="#work" onClick={handleNavClick} className="text-[13px] font-bold text-white/50 hover:text-white uppercase tracking-widest transition-colors">{t.work}</a>
          <a href="#services" onClick={handleNavClick} className="text-[13px] font-bold text-white/50 hover:text-white uppercase tracking-widest transition-colors">{t.services}</a>
          <a href="#contact" onClick={handleNavClick} className="text-[13px] font-bold text-white/50 hover:text-white uppercase tracking-widest transition-colors">{t.contact}</a>
          <div className="pt-2">
            <button
              onClick={() => { onStartProject(); setIsMobileMenuOpen(false); }}
              className="w-full px-6 py-3 bg-royal text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              {t.btn}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;