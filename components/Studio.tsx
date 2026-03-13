
'use client';

import React from 'react';
import { Language } from '../App.tsx';

interface StudioProps {
  lang: Language;
}

const Studio: React.FC<StudioProps> = ({ lang }) => {
  const translations = {
    en: {
      sub: "Why AuraGram?",
      title: <>Putting <span className="italic hero-title-gradient">efficiency</span> at the core of every <span className="italic hero-title-gradient">decision</span>.</>,
      p1: "Strategic Approach: We don't just execute code based on instructions. We study your metrics and propose technological solutions that bring measurable results.",
      p2: "Our goal is not merely a beautiful storefront, but a digital infrastructure that substantially improves your efficiency and drives growth.",
      c1t: "Custom-made Solutions",
      c1d: "Every project is perfectly tailored to the DNA and real needs of your business.",
      c2t: "Continuous Support",
      c2d: "We act as your long-term technological partner, ensuring continuous evolution."
    },
    gr: {
      sub: "Γιατί η AuraGram;",
      title: <>Η <span className="italic hero-title-gradient">αποδοτικότητα</span> στο επίκεντρο κάθε <span className="italic hero-title-gradient">απόφασης</span>.</>,
      p1: "Στρατηγική Προσέγγιση: Δεν εκτελούμε απλώς κώδικα με βάση οδηγίες. Μελετάμε τα δεδομένα σας και προτείνουμε τεχνολογικές λύσεις που φέρνουν στοχευμένα, μετρήσιμα αποτελέσματα.",
      p2: "Στόχος μας δεν είναι απλώς μια όμορφη βιτρίνα, αλλά μια ψηφιακή υποδομή που βελτιώνει ουσιαστικά την αποδοτικότητά σας και προωθεί την ανάπτυξη.",
      c1t: "Custom-made Λύσεις",
      c1d: "Κάθε project προσαρμόζεται απόλυτα στο DNA και τις πραγματικές ανάγκες της δικής σας επιχείρησης.",
      c2t: "Συνεχής Υποστήριξη",
      c2d: "Είμαστε ο τεχνολογικός συνεργάτης σας, εξασφαλίζοντας τη συνεχή σας εξέλιξη και μετά την παράδοση."
    }
  };

  const t = translations[lang];

  return (
    <section id="the-studio" className="py-24 md:py-48 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative reveal">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-royal/10 blur-[100px] rounded-full"></div>
            <div className="aspect-[4/5] overflow-hidden bg-midnight border border-royal/10 p-4">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                alt="Studio atmosphere"
                className="w-full h-full object-cover grayscale opacity-20 hover:opacity-40 transition-opacity duration-1000"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 hidden md:block w-48 h-48 border border-royal/20 p-8 reveal" style={{ transitionDelay: '0.4s' }}>
              <span className="text-royal font-serif italic text-4xl leading-none">Aura & Gram</span>
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <span className="text-royal font-black tracking-[0.4em] text-[10px] uppercase mb-8 block opacity-60">{t.sub}</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-10 text-white">
              {t.title}
            </h2>
            <div className="space-y-6 text-white/40 text-lg font-light leading-relaxed">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 border-t border-white/5 pt-12">
              <div>
                <h4 className="text-royal font-bold text-xl mb-4 tracking-tight">{t.c1t}</h4>
                <p className="text-sm text-white/30 leading-relaxed">{t.c1d}</p>
              </div>
              <div>
                <h4 className="text-royal font-bold text-xl mb-4 tracking-tight">{t.c2t}</h4>
                <p className="text-sm text-white/30 leading-relaxed">{t.c2d}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studio;