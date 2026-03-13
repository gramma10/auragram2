
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Layers, ShoppingBag, BarChart3, Mail } from 'lucide-react';
import { Language } from '../App.tsx';

/* ───────────────────── Badge ───────────────────── */
const FeatureBadge: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-block px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-royal border border-royal/30 rounded-full bg-royal/5 backdrop-blur-sm">
    {text}
  </span>
);

/* ───────────────────── Feature Item ───────────────────── */
const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="group flex items-start gap-4 p-4 rounded-2xl transition-all duration-500 hover:bg-white/[0.03] hover:translate-x-1">
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
    {/* Screen */}
    <div className="relative rounded-t-2xl border-[3px] border-[#2a2a2a] bg-[#1a1a1a] overflow-hidden shadow-2xl shadow-black/60">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#1a1a1a] rounded-b-xl z-20 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a] border border-[#333]"></div>
      </div>
      
      {/* Screen Content */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <video
          src={videoSrc}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-16 h-16 rounded-full bg-royal/90 backdrop-blur-sm flex items-center justify-center shadow-xl shadow-royal/40 scale-90 group-hover:scale-100 transition-transform duration-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Base / Keyboard */}
    <div className="relative mx-auto">
      {/* Hinge */}
      <div className="h-3 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-lg mx-4"></div>
      {/* Body */}
      <div className="h-4 bg-gradient-to-b from-[#222] to-[#1a1a1a] rounded-b-2xl mx-[-2%] border-x-2 border-b-2 border-[#2a2a2a]"></div>
    </div>

    {/* Ambient Glow */}
    <div className="absolute -inset-8 bg-royal/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 pointer-events-none"></div>
  </div>
);

/* ───────────────────── Video Modal ───────────────────── */
const VideoModal: React.FC<{ isOpen: boolean; onClose: () => void; videoSrc: string }> = ({ isOpen, onClose, videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
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
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl"></div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:rotate-90"
        aria-label="Close modal"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Video Container */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="relative w-[90vw] max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-royal/20"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          controls
          autoPlay
          playsInline
          className="w-full aspect-video bg-black"
        />
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

  const translations = {
    en: {
      badge: 'FEATURED SAAS PRODUCT',
      heading: 'Libra: A Full-Scale SaaS Ecosystem',
      description:
        'Σχεδιάσαμε και αναπτύξαμε μια multi-tenant πλατφόρμα διαχείρισης για επαγγελματίες ομορφιάς. Από το real-time booking engine μέχρι τα αυτόματα οικονομικά reports, το Libra αποτελεί την αιχμή της τεχνικής μας εξειδίκευσης στο Product Engineering.',
      f1: { t: 'Multi-tenant Architecture', d: 'Full data isolation with Supabase RLS.' },
      f2: { t: 'Smart Inventory & Sales', d: 'Real-time stock tracking and automated expenses.' },
      f3: { t: 'Financial Intelligence', d: 'Advanced dashboard for net profit and staff commissions.' },
      f4: { t: 'Automated Workflows', d: 'SMS (Apifon) & Email (Resend) automated reminders.' },
      clickToWatch: 'Click to watch full demo',
    },
    gr: {
      badge: 'ΚΟΡΥΦΑΙΟ SAAS ΠΡΟΪΟΝ',
      heading: 'Libra: Ένα Ολοκληρωμένο SaaS Οικοσύστημα',
      description:
        'Σχεδιάσαμε και αναπτύξαμε μια multi-tenant πλατφόρμα διαχείρισης για επαγγελματίες ομορφιάς. Από το real-time booking engine μέχρι τα αυτόματα οικονομικά reports, το Libra αποτελεί την αιχμή της τεχνικής μας εξειδίκευσης στο Product Engineering.',
      f1: { t: 'Multi-tenant Architecture', d: 'Πλήρης απομόνωση δεδομένων με Supabase RLS.' },
      f2: { t: 'Smart Inventory & Sales', d: 'Real-time παρακολούθηση αποθεμάτων και αυτοματοποιημένα έξοδα.' },
      f3: { t: 'Financial Intelligence', d: 'Προηγμένο dashboard για καθαρά κέρδη και προμήθειες προσωπικού.' },
      f4: { t: 'Automated Workflows', d: 'SMS (Apifon) & Email (Resend) αυτόματες υπενθυμίσεις.' },
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
      <section id="product-spotlight" className="py-20 md:py-48 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal/[0.04] blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-royal/[0.03] blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* ── Left Column: Content ── */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="mb-8">
                <FeatureBadge text={t.badge} />
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-white tracking-tight leading-[1.1] mb-8">
                {lang === 'en' ? (
                  <>Libra: A Full-Scale<br /><span className="text-royal">SaaS Ecosystem</span></>
                ) : (
                  <>Libra: Ένα Ολοκληρωμένο<br /><span className="text-royal">SaaS Οικοσύστημα</span></>
                )}
              </h2>

              <p className="text-white/45 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-sans">
                {t.description}
              </p>

              {/* Feature List */}
              <div className="flex flex-col gap-2">
                {features.map((feature, idx) => (
                  <FeatureItem key={idx} {...feature} />
                ))}
              </div>
            </motion.div>

            {/* ── Right Column: MacBook Mockup ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <MacBookMockup videoSrc={videoSrc} onClick={() => setIsModalOpen(true)} />
              <p className="text-center text-white/25 text-xs mt-6 tracking-wide uppercase">
                {t.clickToWatch}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoSrc={videoSrc} />
    </>
  );
};

export default ProductSpotlight;
