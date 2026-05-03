
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { Language } from '../App.tsx';
import { ScrollAnimatedText } from './ui/text-scroll-animation.tsx';

const ExplodingCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  progress: any;
  range: [number, number];
  lang: Language;
}> = ({ title, description, icon, href, progress, range, lang }) => {
  const opacity = useTransform(progress, 
    [range[0], range[0] + (range[1]-range[0])*0.2, range[0] + (range[1]-range[0])*0.8, range[1]], 
    [0, 1, 1, 0]
  );
  const scale = useTransform(progress, 
    [range[0], range[0] + (range[1]-range[0])*0.2, range[0] + (range[1]-range[0])*0.8, range[1]], 
    [0.5, 1, 1, 2]
  );
  const filter = useTransform(progress, 
    [range[0], range[0] + (range[1]-range[0])*0.2, range[0] + (range[1]-range[0])*0.8, range[1]], 
    ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(40px)']
  );

  const pointerEvents = useTransform(progress, 
    [range[0], range[0] + (range[1]-range[0])*0.2, range[0] + (range[1]-range[0])*0.8, range[1]], 
    ['none', 'auto', 'auto', 'none']
  );

  return (
    <motion.div
      style={{ opacity, scale, filter, pointerEvents }}
      className="absolute inset-0 flex items-center justify-center z-30"
    >
      <div className="p-8 md:p-10 rounded-[2.5rem] bg-midnight/80 backdrop-blur-3xl border border-royal/30 shadow-[0_0_100px_rgba(53,51,205,0.3)] max-w-lg w-full text-center md:text-left pointer-events-auto">
        <div className="mb-6 md:mb-8 w-14 h-14 md:w-16 md:h-16 mx-auto md:mx-0 rounded-2xl bg-royal/20 flex items-center justify-center text-royal shadow-lg shadow-royal/20">
          {icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 md:mb-6 tracking-tight leading-tight">{title}</h3>
        <p className="text-white/60 text-base md:text-lg leading-relaxed font-sans mb-8">{description}</p>
        
        {href && (
          <Link
            to={href}
            onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-royal hover:tracking-[0.3em] transition-all duration-300 relative z-40"
          >
            {lang === 'en' ? 'Explore Service' : 'Εξερευνήστε την Υπηρεσία'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

const ServiceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  lang: Language;
}> = ({ title, description, icon, href, lang }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="group relative p-8 rounded-[2rem] bg-midnight/40 backdrop-blur-xl border border-white/[0.05] hover:border-royal/40 transition-all duration-500 h-full flex flex-col"
  >
    <div className="mb-6 w-12 h-12 rounded-xl bg-royal/10 flex items-center justify-center text-royal">
      {icon}
    </div>
    <h3 className="text-xl font-serif text-white mb-4">{title}</h3>
    <p className="text-white/40 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
    {href && (
      <Link to={href} onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} className="text-[10px] font-bold uppercase tracking-widest text-royal/60 group-hover:text-royal transition-colors">
        {lang === 'en' ? 'Learn More →' : 'Μάθετε Περισσότερα →'}
      </Link>
    )}
  </motion.div>
);

interface ServicesProps {
  lang: Language;
}

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const translations = {
    en: {
      titleLine1: "Our",
      titleLine2: "Capabilities.",
      sub: "Services",
      s1: { t: "Web Design & Development", d: "High-performance, conversion-optimized sites engineered for sub-2-second load times and premium UI/UX." },
      s2: { t: "Software & SaaS", d: "Bespoke platforms designed to solve complex operational bottlenecks and scale with your growth." },
      s3: { t: "AI & Automations", d: "Smart AI pipelines and end-to-end automations that eliminate manual work and boost measurable profit." }
    },
    gr: {
      titleLine1: "Οι",
      titleLine2: "Δυνατότητες.",
      sub: "Υπηρεσίες",
      s1: { t: "Web Design & Development", d: "Sites υψηλών επιδόσεων, βελτιστοποιημένα για conversions με κορυφαίο UI/UX." },
      s2: { t: "Software & SaaS", d: "Custom πλατφόρμες σχεδιασμένες να λύνουν σύνθετα λειτουργικά προβλήματα." },
      s3: { t: "AI & Αυτοματισμοί", d: "AI pipelines που εξαλείφουν τη χειρωνακτική δουλειά και αυξάνουν την κερδοφορία." }
    }
  };

  const t = translations[lang] || translations.en;
  const containerRef = useRef<HTMLDivElement>(null);
  const [showGrid, setShowGrid] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const pathLength = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.5, 0.65, 0.8, 0.9],
    [0, 0.33, 0.33, 0.66, 0.66, 1, 1]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isMobile) {
      if (latest >= 0.95) setShowGrid(true);
      else setShowGrid(false);
    } else {
      setShowGrid(false);
    }
  });

  const stageOpacity = useTransform(scrollYProgress, [0.92, 0.98], [1, 0]);
  const stageScale = useTransform(scrollYProgress, [0.92, 0.98], [1, 0.8]);

  const services = [
    {
      title: t.s1.t,
      description: t.s1.d,
      href: '/services/web-design',
      range: [0.2, 0.35] as [number, number],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      title: t.s2.t,
      description: t.s2.d,
      href: '/services/software',
      range: [0.5, 0.65] as [number, number],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" /><path d="M12 12L2.7 7.3" /><path d="M12 12V21" /><path d="M12 12l9.3-4.7" />
        </svg>
      )
    },
    {
      title: t.s3.t,
      description: t.s3.d,
      href: '/services/automations',
      range: [0.8, 0.9] as [number, number],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
        </svg>
      )
    }
  ];

  return (
    <div ref={containerRef} className="relative h-[650vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Cinematic Stage */}
        <motion.div 
          style={{ opacity: stageOpacity, scale: stageScale }}
          className="relative w-full h-full flex flex-col items-center justify-center px-6"
        >
          {/* Header Area */}
          <div className="absolute top-12 md:top-20 text-center z-20">
            <span className="text-royal font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">{t.sub}</span>
            <div className="flex flex-wrap justify-center gap-x-4">
              <ScrollAnimatedText text={t.titleLine1} className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-tighter leading-none" />
              <ScrollAnimatedText text={t.titleLine2} className="text-4xl md:text-6xl lg:text-7xl font-serif text-royal italic tracking-tighter leading-none" />
            </div>
          </div>

          {/* Progress Circle Area */}
          <div className="relative w-[60vw] h-[60vw] max-w-[380px] max-h-[380px] flex items-center justify-center mt-12 md:mt-20">
            <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-white/10" />
              <motion.circle 
                cx="50" cy="50" r="48" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.2" 
                strokeLinecap="round"
                className="text-royal shadow-[0_0_20px_rgba(53,51,205,0.3)]"
                style={{ pathLength }}
              />
            </svg>

            {/* Checkpoint Icons */}
            {[0.33, 0.66, 1].map((pos, i) => {
              const angle = (pos * 360) - 90;
              const radius = 48;
              const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
              const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
              return (
                <div 
                  key={i}
                  className="absolute w-7 h-7 md:w-8 md:h-8 border border-white/10 rounded-full flex items-center justify-center bg-midnight/80 backdrop-blur-sm shadow-xl"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className="scale-50 opacity-40">{services[i].icon}</div>
                </div>
              );
            })}

            {/* Exploding Cards Area */}
            {services.map((service, i) => (
              <ExplodingCard 
                key={i} 
                {...service} 
                progress={scrollYProgress}
                range={service.range}
                lang={lang}
              />
            ))}
          </div>
        </motion.div>

        {/* Final Grid Reveal (Desktop Only) */}
        <AnimatePresence>
          {showGrid && !isMobile && (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 1.1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6 backdrop-blur-2xl"
            >
              <div className="text-center mb-12 md:mb-16">
                <span className="text-royal font-black tracking-[0.4em] text-[10px] uppercase mb-6 block">{t.sub}</span>
                <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter leading-none mb-4">
                  Full <span className="text-royal italic">Synergy.</span>
                </h2>
                <div className="w-16 h-px bg-royal/40 mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
                {services.map((service, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="h-full"
                  >
                    <ServiceCard {...service} lang={lang} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-royal/5 blur-[120px] rounded-full pointer-events-none" />
      </div>
    </div>
  );
};

export default Services;