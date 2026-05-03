
'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Language } from '../App.tsx';
import Navbar from './Navbar.tsx';
import Footer from './Footer.tsx';
import ShaderBackground from './ui/ShaderBackground.tsx';
import { ScrollAnimatedText, ScrollAnimatedIcons } from './ui/text-scroll-animation.tsx';

interface AutomationsPageProps {
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
    className="group p-8 md:p-10 rounded-3xl border border-white/[0.07] hover:border-royal/30 bg-white/[0.015] hover:bg-white/[0.04] transition-colors duration-500 relative overflow-hidden"
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
const AutomationsPage: React.FC<AutomationsPageProps> = ({ lang, setLang, onStartProject }) => {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);


  const t = {
    en: {
      tag: 'Service',
      h1: <>AI & Workflow<br /><span className="text-royal">Automations.</span></>,
      sub: "Every hour spent on repetitive tasks is an hour not spent on growth. We build smart AI agents and end-to-end pipelines that turn idle time into measurable profit.",
      cta1: 'Book a Discovery Call',
      painTag: 'The Problem',
      painH: 'Manual Work Is Draining Your Resources.',
      painBody: "Human error, operational fatigue, and disjointed systems are costing you more than you think. Automate the mundane so your team can focus on high-impact, revenue-generating work.",
      solTag: 'What We Automate',
      solH: 'Your business, running on autopilot.',
      features: [
        {
          title: 'Smart AI Chatbots',
          desc: "Custom AI agents handling 24/7 support, pre-qualifying leads, and feeding directly into your sales pipeline.",
        },
        {
          title: 'End-to-End Workflows',
          desc: "Connect your apps and transfer data automatically — from lead capture to invoicing, running perfectly in the background.",
        },
        {
          title: 'Cost Reduction',
          desc: "Eliminate manual tasks and drastically reduce operational overhead while scaling your output capacity.",
        },
      ],
      ctaH: "Ready to Automate?",
      ctaSub: "Let's identify your bottlenecks and build the systems to eliminate them.",
      ctaBtn: 'Start Your Project',
    },
    gr: {
      tag: 'Υπηρεσία',
      h1: <>AI & Αυτοματισμοί<br /><span className="text-royal">Διαδικασιών.</span></>,
      sub: "Κάθε ώρα που ξοδεύετε σε επαναλαμβανόμενες εργασίες είναι χαμένος χρόνος. Χτίζουμε έξυπνα AI chatbots και αυτοματισμούς που μετατρέπουν τον χαμένο χρόνο σε μετρήσιμο κέρδος.",
      cta1: 'Κλειστε ενα Discovery Call',
      painTag: 'Το Πρόβλημα',
      painH: 'Χειροκίνητες Εργασίες Εξαντλούν τους Πόρους σας.',
      painBody: "Τα ανθρώπινα λάθη, η κούραση και τα ασύνδετα συστήματα σας κοστίζουν περισσότερο απ' ό,τι νομίζετε. Ήρθε η ώρα να αυτοματοποιήσετε τη ρουτίνα.",
      solTag: 'Τι Αυτοματοποιούμε',
      solH: 'Η επιχείρησή σας, σε αυτόματο πιλότο.',
      features: [
        {
          title: 'Έξυπνα AI Chatbots',
          desc: "Custom AI agents που αναλαμβάνουν 24/7 υποστήριξη πελατών και αξιολογούν αυτόματα τα leads σας.",
        },
        {
          title: 'Ολοκληρωμένα Workflows',
          desc: "Αυτόματη μεταφορά δεδομένων μεταξύ εφαρμογών — από την εύρεση πελατών μέχρι την τιμολόγηση.",
        },
        {
          title: 'Μείωση Λειτουργικού Κόστους',
          desc: "Εξαλείψτε τις χειροκίνητες εργασίες και μειώστε δραστικά τα έξοδα, αυξάνοντας την παραγωγικότητα.",
        },
      ],
      ctaH: 'Έτοιμοι να Αυτοματοποιήσετε;',
      ctaSub: "Ας εντοπίσουμε τα λειτουργικά σας εμπόδια και ας χτίσουμε τα συστήματα που θα τα εξαλείψουν.",
      ctaBtn: 'Ξεκινηστε το Project σας',
    },
  }[lang];

  const featureIcons = [
    /* AI / Bot */
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" strokeWidth="2.5" />
      <line x1="12" y1="16" x2="12" y2="16" strokeWidth="2.5" />
      <line x1="16" y1="16" x2="16" y2="16" strokeWidth="2.5" />
    </svg>,
    /* Workflow / Arrows */
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>,
    /* Cost / Trending down */
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>,
  ];

  return (
    <div className="relative min-h-screen text-white selection:bg-royal/30">
      <ShaderBackground />

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 15, 0],
            rotate: [0, 8, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] -left-20 w-[450px] h-[450px] bg-royal/[0.05] blur-[140px] rounded-full"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[15%] -right-20 w-[550px] h-[550px] bg-royal/[0.03] blur-[120px] rounded-full"
        />
      </div>

      <Navbar lang={lang} setLang={setLang} onStartProject={onStartProject} />

      <main className="relative z-10">

        {/* ── HERO ── */}
        <section className="min-h-[95vh] flex flex-col items-center justify-center pt-36 pb-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-10"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/50 text-[10px] font-bold uppercase tracking-[0.4em]">
                <span className="w-1.5 h-1.5 rounded-full bg-royal animate-pulse shadow-[0_0_8px_rgba(53,51,205,0.8)]" />
                {t.tag}
              </span>
            </motion.div>

            <div className="flex flex-col items-center justify-center mb-8">
              <ScrollAnimatedText
                text={lang === 'en' ? "AI & Workflow" : "AI & Αυτοματισμοί"}
                className="font-serif tracking-tighter leading-[1] text-white text-[clamp(2.5rem,8vw,5.5rem)]"
              />
              <ScrollAnimatedText
                text={lang === 'en' ? "Automations." : "Διαδικασιών."}
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
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 bg-royal/[0.07] blur-[80px] rounded-full pointer-events-none" />

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
        <section className="py-28 md:py-48 px-6 text-center relative overflow-hidden">
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

export default AutomationsPage;
