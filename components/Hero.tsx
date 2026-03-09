
'use client';

import React from 'react';
import { Language } from '../App.tsx';
import { span } from 'framer-motion/client';

interface HeroProps {
  lang: Language;
  onStartProject: () => void;
}

const Hero: React.FC<HeroProps> = ({ lang, onStartProject }) => {
  const content = {
    en: {
      sub: "Design Engineering Studio",
      title: (
        <span className="flex flex-col">
          <span>Architects of</span>
          <span>Digital Aura.</span>
        </span>
      ),
      desc: <>We blend the emotional essence of <span className="text-white">Aura</span> with the <br className="hidden md:block" /> structural integrity of <span className="text-royal">Gram</span>.</>,
      btn1: "Start Now",
      btn2: "Explore Work"
    },
    gr: {
      sub: "Κατασκευη website & συστηματων",
      title: (
        <span className="flex flex-col">
          <span>Αρχιτέκτονες της</span>
          <span>Ψηφιακής Αύρας.</span>
        </span>
      ),
      desc: <>Σχεδιάζουμε το     <span className="text-white">Παρόν </span> και αυτοματοποιούμε το <span className="text-royal"> Μέλλον</span>,  της επιχείρησης σου.</>,
      btn1: "Ξεκινήστε",
      btn2: "Δείτε τα Έργα"
    }
  };

  const t = content[lang];

  // Conditional font sizes for Greek to ensure it fits in two lines as requested
  const headingSizeClass = lang === 'gr'
    ? "text-[10vw] sm:text-[8.5vw] md:text-[6.5rem] lg:text-[8.5rem] xl:text-[9.5rem]"
    : "text-[12vw] sm:text-[10vw] md:text-[8rem] lg:text-[10rem] xl:text-[11rem]";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-12 overflow-hidden px-6">
      {/* Background Aura */}
      <div className="absolute inset-0 aura-mesh opacity-60 pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-7xl mx-auto reveal active">
        <span className="text-royal font-bold tracking-[0.4em] text-[10px] md:text-[12px] uppercase mb-10 block animate-fade-in">
          {t.sub}
        </span>

        <h1 className={`${headingSizeClass} mb-12 leading-[0.85] font-bold hero-title-gradient tracking-tighter inline-block`}>
          {t.title}
        </h1>

        <p className="text-white/60 text-lg md:text-2xl lg:text-3xl font-medium max-w-4xl mx-auto leading-tight mb-20 px-4">
          {t.desc}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
          <button
            onClick={onStartProject}
            className="w-full sm:w-auto px-14 py-6 bg-royal text-white rounded-full text-[14px] md:text-[16px] font-bold hover:bg-white hover:text-midnight transition-all duration-500 shadow-xl shadow-royal/40 scale-100 hover:scale-105 active:scale-95 uppercase tracking-widest"
          >
            {t.btn1}
          </button>
          <a
            href="#work"
            className="px-14 py-6 text-white/50 hover:text-white text-[14px] md:text-[16px] font-bold transition-all duration-300 group"
          >
            <span className="border-b border-transparent group-hover:border-white transition-all duration-300">{t.btn2}</span> &rsaquo;
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-20 reveal active" style={{ transitionDelay: '1s' }}>
        <div className="w-[1px] h-24 bg-gradient-to-b from-royal to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;