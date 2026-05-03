
'use client';

import React from 'react';
import { Language } from '../App.tsx';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  lang: Language;
  onStartProject: () => void;
}

const Hero: React.FC<HeroProps> = ({ lang, onStartProject }) => {
  const content = {
    en: {
      sub: "Custom Software · Web Design · Business Automation",
      title: (
        <span className="flex flex-col">
          <span>Build. Automate. Scale.</span>
          <span className="hidden md:block">Designed to Convert.</span>
        </span>
      ),
      desc: <>Custom software, high <span className="text-white">performance</span>,{' '}<br className="hidden md:block" />websites, and business automations engineered for <span className="text-royal">growth</span>.</>,
      btn1: "Start Now"
    },
    gr: {
      sub: "Λογισμικά · Ιστοσελίδες · Αυτοματισμοί Επιχειρήσεων",
      title: (
        <span className="flex flex-col">
          <span>Σχεδιάζουμε. Αυτοματοποιούμε. Εξελίσσουμε.</span>
        </span>
      ),
      desc: <>Σχεδιάζουμε το <span className="text-white">Παρόν</span> και αυτοματοποιούμε το <span className="text-royal">Μέλλον</span> της επιχείρησής σας.</>,
      btn1: "Ξεκινηστε"
    }
  };

  const t = content[lang];

  // Refined font sizes for a more premium, airy look
  const headingSizeClass = lang === 'gr'
    ? "text-[9vw] sm:text-[4vw] md:text-[3rem] lg:text-[4rem] xl:text-[4.5rem]"
    : "text-[10vw] sm:text-[5vw] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem]";

  // Scroll Parallax Effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-12 overflow-hidden px-6">
      {/* Background Aura */}
      <div className="absolute inset-0 aura-mesh opacity-60 pointer-events-none"></div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-7xl mx-auto">
        <span className="text-royal font-bold tracking-[0.3em] text-[8px] md:text-[12px] uppercase mb-8 md:mb-10 block">
          {t.sub}
        </span>

        <h1 className={`${headingSizeClass} mb-8 md:mb-12 leading-[0.95] font-bold hero-title-gradient tracking-tighter inline-block`}>
          {t.title}
        </h1>

        <p className="text-white/40 text-sm md:text-xl lg:text-2xl font-light max-w-2xl mx-auto leading-relaxed mb-12 md:mb-16 px-4">
          {t.desc}
        </p>

        <div className="flex items-center justify-center">
          <button
            onClick={onStartProject}
            className="px-8 py-3.5 md:px-10 md:py-4 bg-royal text-white rounded-full text-[11px] md:text-[13px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-midnight transition-all duration-500 shadow-lg shadow-royal/20 scale-100 hover:scale-105 active:scale-95"
          >
            {t.btn1}
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-10">
        <div className="w-[1px] h-16 bg-gradient-to-b from-royal to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;