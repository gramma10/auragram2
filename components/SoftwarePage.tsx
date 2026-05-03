
'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Language } from '../App.tsx';
import Navbar from './Navbar.tsx';
import Footer from './Footer.tsx';
import ShaderBackground from './ui/ShaderBackground.tsx';
import { ScrollAnimatedText, ScrollAnimatedIcons } from './ui/text-scroll-animation.tsx';

interface SoftwarePageProps {
  lang: Language;
  setLang: (l: Language) => void;
  onStartProject: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1], delay },
  }),
};

/* ── Feature Card ── */
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
}> = ({ icon, title, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 10 }}
    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
    whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
      delay: index * 0.15
    }}
    className="group p-6 md:p-10 rounded-3xl border border-white/[0.07] hover:border-royal/30 bg-white/[0.015] hover:bg-white/[0.04] transition-colors duration-500 relative overflow-hidden"
    style={{ perspective: "1000px" }}
  >
    {/* Subtle Inner Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-royal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
      className="w-12 h-12 rounded-xl bg-royal/10 flex items-center justify-center text-royal mb-7 group-hover:bg-royal/20 group-hover:scale-110 transition-all duration-400"
    >
      {icon}
    </motion.div>

    <h3 className="text-lg font-serif text-white mb-3 tracking-tight group-hover:text-royal transition-colors duration-300">
      {title}
    </h3>
    <p className="text-white/35 text-[14px] leading-relaxed font-sans group-hover:text-white/50 transition-colors duration-300">
      {desc}
    </p>
  </motion.div>
);

/* ══════════════════════════════════════════════════════ */
const SoftwarePage: React.FC<SoftwarePageProps> = ({ lang, setLang, onStartProject }) => {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);



  const t = {
    en: {
      tag: 'Service',
      h1: <>Custom Software &<br /><span className="text-royal">SaaS Development.</span></>,
      sub: "We architect bespoke software and full SaaS platforms designed to solve complex operational bottlenecks and scale with you — not against you.",
      cta1: 'Book a Discovery Call',
      painTag: 'The Problem',
      painH: "Outgrowing Your Off-The-Shelf Tools?",
      painBody: "Generic software forces your business to adapt to its limitations. You need tailored operational tech that adapts to your unique processes and empowers your team to perform at their best.",
      solTag: 'What We Build',
      solH: 'Software engineered around your reality.',
      features: [
        {
          title: 'SaaS & Internal Tools',
          desc: "From public multi-tenant platforms to secure internal dashboards, we build exactly what your business needs to operate efficiently.",
        },
        {
          title: 'Scalable Architectures',
          desc: "Built with modern, robust tech stacks designed to handle growing traffic, expanding databases, and complex operations securely.",
        },
        {
          title: 'Seamless Integrations',
          desc: "We connect your new custom software seamlessly with your existing CRMs, ERPs, and third-party APIs.",
        },
      ],
      ctaH: 'Ready to Build?',
      ctaSub: "Let's engineer the exact software your business needs to dominate the market.",
      ctaBtn: 'Start Your Project',
    },
    gr: {
      tag: 'Υπηρεσία',
      h1: <>Custom Λογισμικό &<br /><span className="text-royal">Ανάπτυξη SaaS.</span></>,
      sub: "Κατασκευάζουμε εξατομικευμένο λογισμικό και ολοκληρωμένες πλατφόρμες SaaS, σχεδιασμένες για να λύσουν τα πιο σύνθετα λειτουργικά προβλήματα και να κλιμακωθούν μαζί σας.",
      cta1: 'Κλειστε ενα Discovery Call',
      painTag: 'Το Πρόβλημα',
      painH: 'Σας Περιορίζουν τα Έτοιμα Εργαλεία;',
      painBody: "Το τυποποιημένο λογισμικό αναγκάζει την επιχείρησή σας να προσαρμοστεί στους περιορισμούς του. Χρειάζεστε τεχνολογία που προσαρμόζεται στις δικές σας διαδικασίες και απελευθερώνει τις δυνατότητες της ομάδας σας.",
      solTag: 'Τι Κατασκευάζουμε',
      solH: 'Λογισμικό σχεδιασμένο γύρω από τη δική σας πραγματικότητα.',
      features: [
        {
          title: 'SaaS & Εσωτερικά Εργαλεία',
          desc: "Από multi-tenant πλατφόρμες έως ασφαλή εσωτερικά dashboards, κατασκευάζουμε ακριβώς αυτό που χρειάζεται η επιχείρησή σας.",
        },
        {
          title: 'Κλιμακούμενες Αρχιτεκτονικές',
          desc: "Χτισμένες με σύγχρονα, ισχυρά tech stacks, ικανά να διαχειριστούν αυξανόμενη κίνηση και σύνθετες λειτουργίες με απόλυτη ασφάλεια.",
        },
        {
          title: 'Ομαλές Διασυνδέσεις',
          desc: "Συνδέουμε απρόσκοπτα το νέο σας custom λογισμικό με τα υπάρχοντα CRM, ERP και εργαλεία τρίτων που ήδη χρησιμοποιείτε.",
        },
      ],
      ctaH: 'Έτοιμοι να Ξεκινήσουμε;',
      ctaSub: "Ας σχεδιάσουμε το ακριβές λογισμικό που χρειάζεται η επιχείρησή σας.",
      ctaBtn: 'Ξεκινηστε το Project σας',
    },
  }[lang];

  const featureIcons = [
    /* SaaS / Layers */
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>,
    /* Scalable / Server */
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>,
    /* Integrations / Link */
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>,
  ];

  return (
    <div className="relative min-h-screen text-white selection:bg-royal/30">
      <ShaderBackground />

      {/* Floating Decorative Elements - Simplified for Mobile */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] -right-20 w-[500px] h-[500px] bg-royal/[0.04] blur-[130px] rounded-full hidden md:block"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] -left-20 w-[600px] h-[600px] bg-royal/[0.02] blur-[160px] rounded-full hidden md:block"
        />
      </div>

      <Navbar lang={lang} setLang={setLang} onStartProject={onStartProject} />

      <main className="relative z-10">

        {/* ── HERO ── */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-56 pb-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">

            <div className="flex flex-col items-center justify-center mb-8 mt-12 md:mt-0">
              <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/50 text-[11px] font-bold uppercase tracking-[0.4em] mb-10">
                <span className="w-2 h-2 rounded-full bg-royal animate-pulse shadow-[0_0_10px_rgba(53,51,205,0.8)]" />
                {t.tag}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center mb-8">
              <ScrollAnimatedText
                text={lang === 'en' ? "Custom Software &" : "Custom Λογισμικό &"}
                className="font-serif tracking-tighter leading-[1] text-white text-[clamp(2.5rem,8vw,5.5rem)]"
              />
              <ScrollAnimatedText
                text={lang === 'en' ? "SaaS Development." : "Ανάπτυξη SaaS."}
                className="font-serif tracking-tighter leading-[1] text-royal italic text-[clamp(2.5rem,8vw,5.5rem)]"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.4, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-white text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light mb-14"
            >
              {t.sub}
            </motion.p>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={0.3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={onStartProject}
                className="px-9 py-3.5 bg-royal text-white rounded-full text-[12px] font-black uppercase tracking-widest hover:bg-white hover:text-midnight transition-all duration-300 shadow-[0_0_28px_rgba(53,51,205,0.4)] active:scale-95"
              >
                {t.cta1}
              </button>

            </motion.div>
          </div>
        </section>

        {/* ── PAIN POINT ── */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp} custom={0}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-12 md:p-20"
            >
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-royal/[0.07] blur-[80px] rounded-full pointer-events-none" />

              <span className="block text-[11px] font-bold uppercase tracking-[0.3em] text-white/25 mb-8">
                {t.painTag}
              </span>

              <ScrollAnimatedText
                text={t.painH}
                className="text-2xl md:text-3xl font-serif text-white tracking-tight leading-[1.2] mb-6 max-w-lg"
              />

              <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-lg font-sans">
                {t.painBody}
              </p>

              <div className="mt-10 h-[1px] w-16 bg-royal/50" />
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">

            <div className="mb-20 text-center">
              <motion.span
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={0}
                className="block text-royal font-bold tracking-[0.4em] text-[10px] uppercase mb-5"
              >
                {t.solTag}
              </motion.span>
              <ScrollAnimatedText
                text={t.solH}
                className="text-2xl md:text-4xl font-serif text-white tracking-tighter"
              />
              <div className="w-16 h-[1px] bg-royal/30 mx-auto mt-8" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {t.features.map((f, i) => (
                <FeatureCard key={i} icon={featureIcons[i]} title={f.title} desc={f.desc} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-24 md:py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_60%,rgba(53,51,205,0.1),transparent)] pointer-events-none" />

          <div className="max-w-2xl mx-auto relative z-10">
            <ScrollAnimatedText
              text={t.ctaH}
              className="text-3xl md:text-4xl font-serif text-white tracking-tighter leading-[1.1] mb-6"
            />

            <motion.p
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp} custom={0.1}
              className="text-white/35 text-lg leading-relaxed font-sans mb-10"
            >
              {t.ctaSub}
            </motion.p>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp} custom={0.2}
            >
              <button
                onClick={onStartProject}
                className="px-12 py-4 bg-royal text-white rounded-full text-[13px] font-black uppercase tracking-widest hover:bg-white hover:text-midnight transition-all duration-300 shadow-[0_0_40px_rgba(53,51,205,0.45)] active:scale-95"
              >
                {t.ctaBtn}
              </button>
            </motion.div>
          </div>
        </section>
        <Footer lang={lang} onStartProject={onStartProject} />
      </main>
    </div>
  );
};

export default SoftwarePage;
