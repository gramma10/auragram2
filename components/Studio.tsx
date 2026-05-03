
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Language } from '../App.tsx';

interface StudioProps {
  lang: Language;
}

import { ScrollAnimatedText, WordReveal } from './ui/text-scroll-animation.tsx';

const Studio: React.FC<StudioProps> = ({ lang }) => {
  const translations = {
    en: {
      sub: "Why AuraGram?",
      titleLine1: "You don't have a marketing problem.",
      titleLine2: "You have an infrastructure problem.",
      p1: "Your website is bouncing potential clients before they read a word. Your team is copying data between spreadsheets instead of closing deals. Your operations depend on manual steps that only work when someone remembers to do them.",
      p2: "These are not minor inconveniences — they are direct, measurable leaks in your revenue. AuraGram builds the digital infrastructure so founders can focus strictly on growth. We build the engine. You drive the results.",
      c1t: "Websites That Convert",
      c1d: "Fast-loading, SEO-optimized, working for you 24/7 — establishing credibility on autopilot.",
      c2t: "Systems Built to Scale",
      c2d: "Custom software and automation pipelines that grow with your business — no more replacing tools.",
      c3t: "No More Manual Work",
      c3d: "Automated logic handles the repetitive so your team focuses entirely on what actually moves revenue.",
      c4t: "Long-Term Tech Partner",
      c4d: "We are invested in your outcomes. Not a one-off vendor — a committed partner from build through growth."
    },
    gr: {
      sub: "Γιατί η AuraGram;",
      titleLine1: "Δεν έχετε πρόβλημα marketing.",
      titleLine2: "Έχετε πρόβλημα υποδομής.",
      p1: "Το website σας χάνει πιθανούς πελάτες πριν διαβάσουν μια λέξη. Η ομάδα σας αντιγράφει δεδομένα μεταξύ spreadsheets αντί να κλείνει deals. Η λειτουργία σας εξαρτάται από χειρωνακτικά βήματα που δουλεύουν μόνο όταν κάποιος θυμηθεί.",
      p2: "Αυτά δεν είναι μικρές ενοχλήσεις — είναι άμεσες, μετρήσιμες απώλειες εσόδων. Η AuraGram χτίζει την ψηφιακή υποδομή ώστε οι ιδρυτές να επικεντρωθούν αποκλειστικά στην ανάπτυξη. Χτίζουμε τον κινητήρα. Εσείς οδηγείτε.",
      c1t: "Ιστοσελίδες που Φέρνουν Πωλήσεις",
      c1d: "Γρήγορα, SEO-optimized, δουλεύουν για εσάς 24/7 — μετατρέπουν τους επισκέπτες σε πελάτες και εδραιώνουν την αξιοπιστία σας αυτόματα.",
      c2t: "Συστήματα για Κλιμάκωση",
      c2d: "Custom software και automation pipelines που μεγαλώνουν μαζί σας — χωρίς να αντικαθιστάτε εργαλεία.",
      c3t: "Τέλος στη Χειροκίνητη Εργασία",
      c3d: "Αυτοματοποιημένη λογική για τα επαναλαμβανόμενα, ώστε η ομάδα σας να εστιάζει σε αυτό που πραγματικά αυξάνει τα έσοδα.",
      c4t: "Μακροπρόθεσμος Τεχνικός Συνεργάτης",
      c4d: "Επενδύουμε στα αποτελέσματά σας.Όχι ένας απλός προμηθευτής — ένας στρατηγικός συνεργάτης, από την αρχική κατασκευή μέχρι την τελική κλιμάκωση της επιχείρησής σας."
    }
  };

  const t = translations[lang];

  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: textScrollProgress } = useScroll({
    target: textRef,
    offset: ["start 0.8", "center 0.4"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  const featureIcons = [
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  ];

  return (
    <section id="the-studio" ref={sectionRef} className="py-32 md:py-48 px-6 overflow-hidden relative">
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-royal/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-royal/3 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden bg-white/[0.02] border border-white/[0.05] p-3 md:p-5 rounded-2xl group">
              <motion.img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                alt="Studio atmosphere"
                style={{ y: imgY, scale: imgScale }}
                className="w-full h-[130%] -mt-[15%] object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-60" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute -bottom-6 -right-6 hidden md:flex flex-col items-end bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-6 rounded-xl"
            >
              <span className="text-royal font-serif italic text-3xl leading-none">Aura & Gram</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 mt-2">Established MMXXIV</span>
            </motion.div>
          </motion.div>

          <div className="flex flex-col">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              className="text-royal font-black tracking-[0.4em] text-[10px] uppercase mb-10 block"
            >
              {t.sub}
            </motion.span>

            <div className="mb-12">
              <ScrollAnimatedText
                text={t.titleLine1}
                className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] text-white block mb-4"
              />
              <ScrollAnimatedText
                text={t.titleLine2}
                className="text-4xl md:text-5xl lg:text-6xl font-serif italic leading-[1.1] text-royal block"
              />
            </div>

            <div ref={textRef} className="space-y-8 text-white/40 text-base md:text-lg font-light leading-relaxed mb-16 max-w-xl">
              <WordReveal text={t.p1} progress={textScrollProgress} />
              <WordReveal text={t.p2} progress={textScrollProgress} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-16 border-t border-white/5 pt-16">
              {[
                { t: t.c1t, d: t.c1d },
                { t: t.c2t, d: t.c2d },
                { t: t.c3t, d: t.c3d },
                { t: t.c4t, d: t.c4d }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
                  className="group relative"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-royal/10 flex items-center justify-center text-royal group-hover:bg-royal group-hover:text-white transition-all duration-500">
                      {featureIcons[i]}
                    </div>
                    <div className="h-[1px] flex-grow bg-white/5 group-hover:bg-royal/30 transition-colors duration-500" />
                  </div>

                  <ScrollAnimatedText
                    text={item.t}
                    className="text-white group-hover:text-royal font-bold text-lg mb-3 tracking-tight block transition-colors duration-300"
                  />

                  <p className="text-sm text-white/30 leading-relaxed group-hover:text-white/50 transition-colors duration-300">
                    {item.d}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Studio;