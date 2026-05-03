
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../App.tsx';
import { ScrollAnimatedText } from './ui/text-scroll-animation.tsx';

interface ContactProps {
  lang: Language;
  onStartProject: () => void;
}

const Contact: React.FC<ContactProps> = ({ lang, onStartProject }) => {
  const content = {
    en: {
      headline: "Ready for the next digital era?",
      subheadline: "Request a free consultation today and discover how we can solve the problems holding you back.",
      action: "Contact us directly:",
      button: "Free Consultation"
    },
    gr: {
      headline: "Έτοιμοι για την επόμενη ψηφιακή εποχή;",
      subheadline: "Ζητήστε σήμερα μια δωρεάν ανάλυση των αναγκών σας και ανακαλύψτε πώς μπορούμε να λύσουμε τα προβλήματα που σας κρατούν πίσω.",
      action: "Καλέστε μας άμεσα:",
      button: "Δωρεαν Αναλυση"
    }
  };

  const t = content[lang];

  return (
    <section id="contact" className="py-32 md:py-48 px-6 relative overflow-hidden flex items-center min-h-[70vh] md:min-h-[90vh]">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(53,51,205,0.08)_0%,transparent_60%)] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-royal/[0.02] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column: The Hook */}
          <div className="flex flex-col">
            <div className="mb-12 md:mb-16">
              <ScrollAnimatedText
                text={t.headline}
                className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] tracking-tighter"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.4, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white text-xl md:text-2xl font-light max-w-xl leading-relaxed mb-14"
            >
              {t.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <button
                onClick={onStartProject}
                className="group relative px-12 py-6 bg-royal text-white text-[12px] uppercase tracking-[0.4em] font-black hover:bg-white hover:text-midnight transition-all duration-500 rounded-full overflow-hidden shadow-2xl shadow-royal/40 active:scale-95"
              >
                <span className="relative z-10">{t.button}</span>
                <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </button>
            </motion.div>
          </div>

          {/* Right Column: The Details */}
          <div className="flex flex-col items-start lg:items-end lg:text-right pt-12 lg:pt-0">
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 0.8, x: 0 }}
              viewport={{ once: true }}
              className="text-royal font-black tracking-[0.4em] text-[10px] uppercase mb-12 block"
            >
              {t.action}
            </motion.span>

            <div className="space-y-12 w-full max-w-lg">
              {/* Phone 1 */}
              <motion.a
                href="tel:+306981718440"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="group flex items-center lg:justify-end space-x-8 hover:text-royal transition-all duration-500"
              >
                <div className="flex flex-col">
                  <span className="text-3xl md:text-5xl lg:text-6xl text-white font-sans font-light tracking-tighter group-hover:text-royal transition-all duration-500">
                    +30 698 171 8440
                  </span>
                </div>
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-royal/50 group-hover:bg-royal/5 transition-all duration-500 text-white/30 group-hover:text-royal group-hover:rotate-12">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
              </motion.a>

              {/* Phone 2 */}
              <motion.a
                href="tel:+306943232385"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="group flex items-center lg:justify-end space-x-8 hover:text-royal transition-all duration-500"
              >
                <div className="flex flex-col">
                  <span className="text-3xl md:text-5xl lg:text-6xl text-white font-sans font-light tracking-tighter group-hover:text-royal transition-all duration-500">
                    +30 694 323 2385
                  </span>
                </div>
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-royal/50 group-hover:bg-royal/5 transition-all duration-500 text-white/30 group-hover:text-royal group-hover:rotate-12">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
              </motion.a>

              {/* Email Detail */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1 }}
                className="pt-16 flex lg:justify-end"
              >
                <a
                  href="mailto:auragram.web@gmail.com"
                  className="text-white/20 hover:text-white transition-all duration-500 border-b border-white/5 pb-2 text-lg md:text-xl tracking-wide group"
                >
                  <span className="group-hover:tracking-[0.2em] transition-all duration-500">auragram.web@gmail.com</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;