
import React from 'react';
import { Language } from '../App.tsx';

interface FooterProps {
  lang: Language;
  onStartProject: () => void;
}

const Footer: React.FC<FooterProps> = ({ lang, onStartProject }) => {
  const content = {
    en: { desc: "Transforming businesses into digital landmarks through precision design.", nav: "NAVIGATION", h: "Home", w: "Work", s: "Services", c: "Contact", inq: "INQUIRIES", btn: "START NOW ›", copy: "© 2024 AURAGRAM STUDIO. ALL RIGHTS RESERVED.", right: "BUILT FOR EXCELLENCE." },
    gr: { desc: "Μεταμορφώνουμε επιχειρήσεις σε ψηφιακά ορόσημα μέσω σχεδιασμού ακριβείας.", nav: "ΠΛΟΗΓΗΣΗ", h: "Αρχική", w: "Έργα", s: "Υπηρεσίες", c: "Επικοινωνία", inq: "ΠΛΗΡΟΦΟΡΙΕΣ", btn: "ΞΕΚΙΝΗΣΤΕ ΤΩΡΑ ›", copy: "© 2024 AURAGRAM STUDIO. ΜΕ ΕΠΙΦΥΛΑΞΗ ΠΑΝΤΟΣ ΔΙΚΑΙΩΜΑΤΟΣ.", right: "ΧΤΙΣΜΕΝΟ ΓΙΑ ΑΡΙΣΤΕΙΑ." }
  };

  const t = content[lang];

  return (
    <footer className="py-24 px-6 md:px-12 lg:px-24 bg-transparent relative z-10 w-full overflow-hidden font-sans">
      <div className="container mx-auto max-w-[1400px]">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 mb-32">
          
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div>
              <a href="/" className="inline-block mb-10 ml-[-12px] md:ml-[-16px]">
                <img src="/assets/auragram-logo.png" alt="AuraGram Logo" className="w-[240px] md:w-[320px] h-auto object-contain" />
              </a>
              <h3 className="text-white/60 text-[16px] md:text-[20px] font-medium max-w-sm leading-relaxed mb-16">
                {t.desc}
              </h3>
            </div>
            <div className="flex space-x-8">
              {['Instagram', 'Twitter', 'LinkedIn'].map(link => (
                <a key={link} href="#" className="text-sm font-semibold text-white/40 hover:text-white transition-colors">{link}</a>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/4">
            <h4 className="text-white/40 text-[11px] uppercase tracking-[0.2em] font-bold mb-8">{t.nav}</h4>
            <ul className="space-y-6">
              <li><a href="#" className="text-[14px] font-medium text-white/60 hover:text-white transition-colors">{t.h}</a></li>
              <li><a href="#work" className="text-[14px] font-medium text-white/60 hover:text-white transition-colors">{t.w}</a></li>
              <li><a href="#services" className="text-[14px] font-medium text-white/60 hover:text-white transition-colors">{t.s}</a></li>
              <li><a href="#contact" className="text-[14px] font-medium text-white/60 hover:text-white transition-colors">{t.c}</a></li>
            </ul>
          </div>
          
          <div className="lg:w-1/4">
            <h4 className="text-[#3533cd] text-[11px] uppercase tracking-[0.2em] font-bold mb-8 drop-shadow-[0_0_8px_rgba(53,51,205,0.4)]">{t.inq}</h4>
            <ul className="space-y-6">
              <li><a href="mailto:auragram.web@gmail.com" className="text-[14px] font-medium text-white/60 hover:text-white transition-colors">auragram.web@gmail.com</a></li>
              <li className="text-[14px] font-medium text-white/60">+30 698 171 8440</li>
              <li className="pt-4">
                <button 
                  onClick={onStartProject}
                  className="text-[#3533cd] font-bold text-xs uppercase tracking-[0.1em] hover:text-white transition-colors flex items-center gap-2 drop-shadow-[0_0_8px_rgba(53,51,205,0.4)]"
                >
                  {t.btn}
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 gap-6 opacity-30 border-t border-white/5">
          <div className="text-[10px] font-bold text-white uppercase tracking-[0.15em]">
            {t.copy}
          </div>
          <div className="text-[10px] font-bold text-white uppercase tracking-[0.15em]">
             {t.right}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;