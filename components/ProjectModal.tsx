
'use client';

import React, { useState } from 'react';
import { Language } from '../App.tsx';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, lang }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [service, setService] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const translations = {
    en: {
      successTitle: "Your vision has been received.",
      successDesc: "Our architects will reach out within 24 hours.",
      returnBtn: "Return to Studio",
      sub: "Initialization",
      title: "Start a Project",
      name: "Name",
      email: "Email Address",
      building: "What are we building?",
      services: ['Website', 'Software', 'Automation'],
      desc: "Tell us about your project...",
      submit: "Send Request"
    },
    gr: {
      successTitle: "Το όραμά σας παρελήφθη.",
      successDesc: "Οι αρχιτέκτονές μας θα επικοινωνήσουν μαζί σας εντός 24 ωρών.",
      returnBtn: "Επιστροφή στο Studio",
      sub: "Αρχικοποίηση",
      title: "Ξεκινήστε ένα Έργο",
      name: "Όνομα",
      email: "Διεύθυνση Email",
      building: "Τι σχεδιάζουμε;",
      services: ['Website', 'Λογισμικό', 'Αυτοματισμοί'],
      desc: "Πείτε μας για το έργο σας...",
      submit: "Αποστολή Αιτήματος"
    }
  };

  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className={`relative w-full max-w-2xl bg-midnight border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 shadow-2xl shadow-royal/20 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-20"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="p-8 md:p-12 relative">
          {isSuccess ? (
            <div className="py-20 text-center reveal active">
              <h2 className="text-4xl md:text-5xl text-white font-serif mb-6">{t.successTitle}</h2>
              <p className="text-royal/60 text-lg mb-10">{t.successDesc}</p>
              <button
                onClick={onClose}
                className="px-10 py-4 border border-white/10 rounded-full text-white hover:border-royal hover:text-royal transition-all"
              >
                {t.returnBtn}
              </button>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <span className="text-royal font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">{t.sub}</span>
                <h2 className="text-4xl md:text-5xl text-white font-serif tracking-tight">{t.title}</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder={t.name}
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-white/20 focus:border-royal focus:outline-none transition-all duration-500"
                    />
                  </div>
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder={t.email}
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-white/20 focus:border-royal focus:outline-none transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{t.building}</span>
                  <div className="flex flex-wrap gap-3">
                    {t.services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setService(s)}
                        className={`px-6 py-2 rounded-full border text-xs font-bold transition-all duration-300 ${service === s ? 'bg-royal border-royal text-white' : 'border-white/10 text-white/40 hover:border-royal/50 hover:text-white'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative group">
                  <textarea
                    placeholder={t.desc}
                    rows={3}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-white/20 focus:border-royal focus:outline-none transition-all duration-500 resize-none"
                  ></textarea>
                </div>

                <button
                  disabled={isSubmitting}
                  className="w-full group relative py-6 rounded-full overflow-hidden transition-all duration-500 shadow-xl hover:shadow-white/10 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #cbd5e1 0%, #ffffff 50%, #94a3b8 100%)' }}
                >
                  <span className={`text-midnight font-bold uppercase tracking-[0.3em] text-xs transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                    {t.submit}
                  </span>
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-midnight/30 border-t-midnight rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;