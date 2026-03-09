
'use client';

import React from 'react';
import { Language } from '../App.tsx';

const ServiceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}> = ({ title, description, icon, index }) => (
  <div
    className="group relative p-10 rounded-3xl bg-midnight/40 backdrop-blur-xl border border-white/10 transition-all duration-700 hover:-translate-y-3 hover:border-royal/60 hover:shadow-[0_20px_50px_rgba(53,51,205,0.4)] reveal"
    style={{ transitionDelay: `${index * 0.15}s` }}
  >
    <div className="mb-8 p-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center text-royal transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(53,51,205,0.3)]">
      {icon}
    </div>
    <h3 className="text-2xl md:text-3xl font-serif text-white mb-6 tracking-tight leading-tight group-hover:text-royal transition-colors duration-300">
      {title}
    </h3>
    <p className="text-white/40 text-lg leading-relaxed font-sans mb-8 group-hover:text-white/60 transition-colors duration-300">
      {description}
    </p>
    <div className="h-[1px] w-full bg-gradient-to-r from-royal to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
    <div className="absolute top-0 right-0 w-32 h-32 bg-royal/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
  </div>
);

interface ServicesProps {
  lang: Language;
}

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const translations = {
    en: {
      title: "Our Services.",
      sub: "Capabilities",
      s1: { t: "Web Design & Development", d: "Blazing speed, premium UX, and design that converts casual visitors into loyal customers. Websites that work relentlessly for your brand." },
      s2: { t: "Custom Software", d: "Ready-made solutions? Not for us. We design and develop specialized software tailored precisely to the unique challenges of your business." },
      s3: { t: "Business Automations", d: "The 'autopilot' you need for sales & support. We integrate AI Chatbots and Email/SMS automations for 24/7 service without wasting your time." }
    },
    gr: {
      title: "Οι Υπηρεσίες μας.",
      sub: "Δυνατότητες",
      s1: { t: "Web Design & Development", d: "Εκπληκτική ταχύτητα, κορυφαίο UX και σχεδιασμός που μετατρέπει τους απλούς επισκέπτες σε πιστούς πελάτες. Ιστοσελίδες που δουλεύουν ακατάπαυστα για εσάς." },
      s2: { t: "Custom Software", d: "Έτοιμες λύσεις; Όχι για εμάς. Αναπτύσσουμε εξειδικευμένο λογισμικό, φτιαγμένο ακριβώς στα μέτρα των προκλήσεων της δικής σας επιχείρησης." },
      s3: { t: "Business Automations", d: "Ο 24/7 αυτόματος πιλότος σας. Ενσωματώνουμε AI Chatbots και αυτοματισμούς Email & SMS για εξυπηρέτηση και πωλήσεις, χωρίς να σπαταλάτε χρόνο." }
    }
  };

  const t = translations[lang];

  const services = [
    {
      title: t.s1.t,
      description: t.s1.d,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      title: t.s2.t,
      description: t.s2.d,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" /><path d="M12 12L2.7 7.3" /><path d="M12 12V21" /><path d="M12 12l9.3-4.7" />
        </svg>
      )
    },
    {
      title: t.s3.t,
      description: t.s3.d,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="py-32 md:py-48 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] aura-mesh opacity-20 pointer-events-none"></div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-24 reveal">
          <span className="text-royal font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">{t.sub}</span>
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter leading-none mb-8">
            {lang === 'en' ? <>Our <span className="text-royal">Services.</span></> : <>Οι <span className="text-royal">Υπηρεσίες μας.</span></>}
          </h2>
          <div className="w-24 h-[1px] bg-royal/30 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;