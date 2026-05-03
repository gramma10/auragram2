
'use client';

import React from 'react';
import { Language } from '../App.tsx';
import { ImagesScrollingAnimation } from './ui/images-scrolling-animation.tsx';
import { ScrollAnimatedText } from './ui/text-scroll-animation.tsx';

const PortfolioItem: React.FC<{
  title: string;
  category: string;
  image: string;
  span?: string;
  delay: string;
  viewText: string;
  link: string;
}> = ({ title, category, image, span = "col-span-1", delay, viewText, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className={`block relative group rounded-3xl overflow-hidden ${span} reveal bg-[#050505] border border-white/5 transition-all duration-700 hover:shadow-2xl hover:shadow-royal/20 cursor-pointer`}
    style={{ transitionDelay: delay }}
  >
    <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03] opacity-60 group-hover:opacity-100"
      />
    </div>
    <div className="p-8 flex flex-col justify-between">
      <div>
        <span className="text-[10px] uppercase tracking-widest text-royal font-bold mb-2 block">
          {category}
        </span>
        <h4 className="text-xl md:text-2xl text-white font-bold tracking-tight">
          {title}
        </h4>
      </div>
      <div className="mt-4 flex items-center text-royal text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {viewText} &rsaquo;
      </div>
    </div>
  </a>
);

interface PortfolioProps {
  lang: Language;
}

const Portfolio: React.FC<PortfolioProps> = ({ lang }) => {
  const content = {
    en: { title: "Selected Works.", intro: "Every project we undertake has a clear purpose: improving your efficiency. See how we've helped businesses upgrade their image, automate their processes, and increase their profits.", btn: "View All Work", view: "View Project", c1: "Service", c2: "SaaS", c3: "Web App", c4: "Medical" },
    gr: { title: "Επιλεγμένα Έργα.", intro: "Κάθε project που αναλαμβάνουμε έχει έναν ξεκάθαρο σκοπό: τη βελτίωση της δικής σας αποδοτικότητας. Δείτε πώς έχουμε βοηθήσει επιχειρήσεις να αναβαθμίσουν την εικόνα τους, να αυτοματοποιήσουν τις διαδικασίες τους και να αυξήσουν τα κέρδη τους.", btn: "Δείτε όλα τα Έργα", view: "Προβολή Έργου", c1: "Υπηρεσίες", c2: "SaaS", c3: "Web App", c4: "Ιατρικά" }
  };

  const t = content[lang];

  // Make sure to copy the actual exact paths from your artifact generation if using local images, or use screenshots here
  const projects = [
    { title: "Music Barber Shop", category: t.c1, image: "/assets/music barber.png", link: "https://music-barber-shop.vercel.app/", delay: "0.1s" },
    { title: "Tria", category: t.c2, image: "/assets/tria.png", link: "https://tria-gamma.vercel.app/", delay: "0.2s" },
    { title: "RepuBoost", category: t.c3, image: "/assets/Screenshot 2026-03-06 135031.png", link: "https://repuboost.vercel.app/", delay: "0.3s" },
    { title: "Dent Nine Clinic", category: t.c4, image: "/assets/brightsmile dental.png", link: "https://dent-nine.vercel.app/", delay: "0.4s" }
  ];

  const scrollingProjects = projects.map(p => ({
    title: p.title,
    category: p.category,
    src: p.image,
    link: p.link
  }));

  return (
    <section id="work" className="py-32 md:py-48 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-20">
          <div className="flex flex-wrap gap-x-4 mb-6">
            <ScrollAnimatedText text={lang === 'en' ? "Selected" : "Επιλεγμένα"} className="text-4xl md:text-7xl font-serif text-white tracking-tighter leading-none" />
            <ScrollAnimatedText text={lang === 'en' ? "Works." : "Έργα."} className="text-4xl md:text-7xl font-serif text-royal italic tracking-tighter leading-none" />
          </div>
          <p className="text-white/40 text-base md:text-xl font-light max-w-2xl leading-relaxed">
            {t.intro}
          </p>
        </div>
        <div className="w-full relative mt-10">
          <ImagesScrollingAnimation projects={scrollingProjects} />
        </div>
        <div className="mt-20 text-center reveal">
          <button className="px-10 py-4 border border-white/10 rounded-full text-sm font-semibold text-white hover:border-royal hover:text-royal transition-all duration-300">
            {t.btn}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;