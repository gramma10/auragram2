
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = {
    en: { work: 'Work', services: 'Services', contact: 'Contact', btn: 'Start Now' },
    gr: { work: 'Έργα', services: 'Υπηρεσίες', contact: 'Επικοινωνία', btn: 'Ξεκινήστε' }
  }[lang];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all ${isScrolled ? 'glass h-[64px] flex items-center' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between w-full">
        <a href="/" className="flex items-center">
          <div className="scale-[2.5] transform origin-left ml-4">
            <Logo />
          </div>
        </a>
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex space-x-8">
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
      </div>
    </nav>
  );
};

export default Navbar;