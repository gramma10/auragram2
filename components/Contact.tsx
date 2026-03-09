
'use client';

import React from 'react';
import { Language } from '../App.tsx';

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
      button: "Δωρεάν Ανάλυση"
    }
  };

  const t = content[lang];

  return (
    <section id="contact" className="py-32 md:py-56 px-6 relative overflow-hidden flex items-center min-h-[80vh]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          {/* Left Column: The Hook */}
          <div className="reveal">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] mb-10 tracking-tighter">
              {t.headline}
            </h2>
            <p className="text-white/40 text-xl md:text-2xl font-light max-w-xl leading-relaxed mb-14 font-sans">
              {t.subheadline}
            </p>
            <button
              onClick={onStartProject}
              className="group relative px-12 py-6 bg-royal text-white text-[12px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-midnight transition-all duration-500 rounded-full overflow-hidden shadow-2xl shadow-royal/40 active:scale-95"
            >
              <span className="relative z-10">{t.button}</span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </button>
          </div>

          {/* Right Column: The Details */}
          <div className="reveal flex flex-col items-start lg:items-end lg:text-right" style={{ transitionDelay: '0.2s' }}>
            <span className="text-royal font-black tracking-[0.4em] text-[10px] uppercase mb-12 block opacity-80">
              {t.action}
            </span>

            <div className="space-y-12 w-full max-w-lg">
              {/* Phone 1 */}
              <a
                href="tel:+306981718440"
                className="group flex items-center lg:justify-end space-x-8 hover:text-royal transition-all duration-500"
              >
                <div className="flex flex-col">
                  <span className="text-2xl md:text-4xl lg:text-5xl text-white font-sans font-light tracking-tight group-hover:text-royal group-hover:drop-shadow-[0_0_15px_rgba(53,51,205,0.6)] transition-all duration-500">
                    +30 698 171 8440
                  </span>
                </div>
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-royal/50 group-hover:bg-royal/5 transition-all duration-500 text-white/30 group-hover:text-royal group-hover:rotate-12">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
              </a>

              {/* Phone 2 */}
              <a
                href="tel:+306943232385"
                className="group flex items-center lg:justify-end space-x-8 hover:text-royal transition-all duration-500"
              >
                <div className="flex flex-col">
                  <span className="text-2xl md:text-4xl lg:text-5xl text-white font-sans font-light tracking-tight group-hover:text-royal group-hover:drop-shadow-[0_0_15px_rgba(53,51,205,0.6)] transition-all duration-500">
                    +30 694 323 2385
                  </span>
                </div>
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-royal/50 group-hover:bg-royal/5 transition-all duration-500 text-white/30 group-hover:text-royal group-hover:rotate-12">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
              </a>

              {/* Email Detail */}
              <div className="pt-16 flex lg:justify-end">
                <a
                  href="mailto:auragram.web@gmail.com"
                  className="text-white/20 hover:text-white transition-all duration-500 border-b border-white/5 pb-2 text-lg md:text-xl tracking-wide group"
                >
                  <span className="group-hover:tracking-widest transition-all duration-500">auragram.web@gmail</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;