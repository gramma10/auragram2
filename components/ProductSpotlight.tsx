
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers, ShoppingBag, BarChart3, Mail } from 'lucide-react';
import { Language } from '../App.tsx';
import { ScrollAnimatedText, WordReveal } from './ui/text-scroll-animation.tsx';

/* ───────────────────── Badge ───────────────────── */
const FeatureBadge: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-block px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-royal border border-royal/30 rounded-full bg-royal/5 backdrop-blur-sm">
    {text}
  </span>
);

/* ───────────────────── Feature Item ───────────────────── */
const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="group flex items-start gap-6 p-6 md:p-8 rounded-3xl transition-all duration-500 hover:bg-white/[0.03] hover:translate-x-1">
    <div className="flex-shrink-0 mt-0.5 w-10 h-10 rounded-xl bg-royal/10 flex items-center justify-center text-royal transition-all duration-500 group-hover:bg-royal/20 group-hover:scale-110 group-hover:shadow-[0_0_16px_rgba(53,51,205,0.25)]">
      {icon}
    </div>
    <div>
      <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-royal transition-colors duration-300">{title}</h4>
      <p className="text-white/40 text-[13px] leading-relaxed group-hover:text-white/55 transition-colors duration-300">{desc}</p>
    </div>
  </div>
);

/* ───────────────────── MacBook Mockup ───────────────────── */
const MacBookMockup: React.FC<{ videoSrc: string; onClick: () => void }> = ({ videoSrc, onClick }) => (
  <div className="relative cursor-pointer group" onClick={onClick}>
    <div className="relative rounded-t-2xl border-[3px] border-[#2a2a2a] bg-[#1a1a1a] overflow-hidden shadow-2xl shadow-black/60">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#1a1a1a] rounded-b-xl z-20 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a] border border-[#333]"></div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <video
          src={videoSrc}
          muted autoPlay loop playsInline preload="metadata"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-16 h-16 rounded-full bg-royal/90 backdrop-blur-sm flex items-center justify-center shadow-xl shadow-royal/40 scale-90 group-hover:scale-100 transition-transform duration-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div className="relative mx-auto">
      <div className="h-3 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-lg mx-4"></div>
      <div className="h-4 bg-gradient-to-b from-[#222] to-[#1a1a1a] rounded-b-2xl mx-[-2%] border-x-2 border-b-2 border-[#2a2a2a]"></div>
    </div>
    <div className="absolute -inset-8 bg-royal/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 pointer-events-none"></div>
  </div>
);

/* ───────────────────── Video Modal ───────────────────── */
const VideoModal: React.FC<{ isOpen: boolean; onClose: () => void; videoSrc: string }> = ({ isOpen, onClose, videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && videoRef.current) videoRef.current.play();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl"></div>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:rotate-90"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="relative w-[90vw] max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-royal/20"
        onClick={(e) => e.stopPropagation()}
      >
        <video ref={videoRef} src={videoSrc} controls autoPlay playsInline className="w-full aspect-video bg-black" />
      </motion.div>
    </motion.div>
  );
};

/* ───────────────────── Main Section ───────────────────── */
interface ProductSpotlightProps {
  lang: Language;
}

const ProductSpotlight: React.FC<ProductSpotlightProps> = ({ lang }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoSrc = '/assets/0313.mp4';
  const descRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: descScrollProgress } = useScroll({
    target: descRef,
    offset: ["start 0.8", "center 0.4"]
  });

  const translations = {
    en: {
      badge: 'FLAGSHIP SAAS PRODUCT',
      headingLine1: 'Libra: A Full-Scale',
      headingLine2: 'SaaS Ecosystem',
      description: 'We designed and built a full multi-tenant SaaS platform to replace fragmented, manual workflows for beauty and wellness professionals — with a real-time booking engine, smart dashboards, and automated financial reports, all under one scalable infrastructure.',
      f1: { t: 'Multi-tenant Architecture', d: 'Each professional operates in their own isolated, secure environment with full data isolation.' },
      f2: { t: 'Real-Time Booking Engine', d: 'Frictionless client-facing scheduling with instant confirmation and automated reminders.' },
      f3: { t: 'Financial Intelligence Dashboard', d: 'Live visibility into revenue, net profit, staff commissions, and performance KPIs across locations.' },
      f4: { t: 'Automated Financial Reports', d: 'Scheduled P&L summaries, revenue breakdowns, and tax-ready exports — generated without manual input.' },
      clickToWatch: 'Click to watch full demo',
    },
    gr: {
      badge: 'ΚΟΡΥΦΑΙΟ SAAS ΠΡΟΪΟΝ',
      headingLine1: 'Libra: Ένα Ολοκληρωμένο',
      headingLine2: 'SaaS Οικοσύστημα',
      description: 'Σχεδιάσαμε και αναπτύξαμε μια ολοκληρωμένη multi-tenant SaaS πλατφόρμα για επαγγελματίες ομορφιάς και ευεξίας — με real-time booking engine, smart dashboards και αυτόματες οικονομικές αναφορές, όλα κάτω από μια ενιαία, κλιμακούμενη υποδομή.',
      f1: { t: 'Multi-tenant Αρχιτεκτονική', d: 'Κάθε επαγγελματίας λειτουργεί στο δικό του απομονωμένο, ασφαλές περιβάλλον με πλήρη απομόνωση δεδομένων.' },
      f2: { t: 'Σύστημα κρατήσεων σε πραγματικό χρόνο', d: 'Άμεσο σύστημα κρατήσεων με instant επιβεβαίωση και αυτοματοποιημένες υπενθυμίσεις.' },
      f3: { t: 'Έξυπνα Οικονομικά Dashboards', d: 'Άμεση ορατότητα σε έσοδα, καθαρά κέρδη, προμήθειες προσωπικού και KPIs απόδοσης.' },
      f4: { t: 'Αυτόματες Οικονομικές Αναφορές', d: 'Προγραμματισμένες αναλύσεις P&L, ανάλυση εσόδων και exports — χωρίς καμία χειρωνακτική καταχώρηση.' },
      clickToWatch: 'Κάντε κλικ για προβολή demo',
    },
  };

  const t = translations[lang];

  const features = [
    { icon: <Layers size={18} />, title: t.f1.t, desc: t.f1.d },
    { icon: <ShoppingBag size={18} />, title: t.f2.t, desc: t.f2.d },
    { icon: <BarChart3 size={18} />, title: t.f3.t, desc: t.f3.d },
    { icon: <Mail size={18} />, title: t.f4.t, desc: t.f4.d },
  ];

  return (
    <>
      <section id="product-spotlight" className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal/[0.04] blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-royal/[0.03] blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="mb-8"
              >
                <FeatureBadge text={t.badge} />
              </motion.div>

              <div className="mb-10">
                <ScrollAnimatedText text={t.headingLine1} className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-white tracking-tight leading-[1.1] block mb-2" />
                <ScrollAnimatedText text={t.headingLine2} className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-royal italic tracking-tight leading-[1.1] block" />
              </div>

              <div ref={descRef} className="mb-16 md:mb-20 max-w-xl">
                <WordReveal text={t.description} progress={descScrollProgress} className="text-white text-base md:text-lg leading-relaxed font-light" />
              </div>

              {/* Feature List with Scroll-Linked Movement */}
              <div className="flex flex-col gap-2">
                {features.map((feature, idx) => {
                  const isLeft = idx % 2 === 0;
                  // Each item has a different scroll trigger window
                  const startTrigger = 0.2 + (idx * 0.1);
                  const endTrigger = startTrigger + 0.2;

                  const x = useTransform(
                    descScrollProgress,
                    [startTrigger, endTrigger],
                    [isLeft ? -100 : 100, 0]
                  );
                  const opacity = useTransform(
                    descScrollProgress,
                    [startTrigger, endTrigger],
                    [0, 1]
                  );
                  const scale = useTransform(
                    descScrollProgress,
                    [startTrigger, endTrigger],
                    [0.8, 1]
                  );

                  return (
                    <motion.div
                      key={idx}
                      style={{ x, opacity, scale }}
                    >
                      <FeatureItem {...feature} />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: "1500px" }}
              className="relative"
            >
              <MacBookMockup videoSrc={videoSrc} onClick={() => setIsModalOpen(true)} />
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 0.25 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-center text-white text-xs mt-8 tracking-wide uppercase"
              >
                {t.clickToWatch}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoSrc={videoSrc} />
    </>
  );
};

export default ProductSpotlight;
