
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Language } from '../App.tsx';
import Navbar from './Navbar.tsx';
import Footer from './Footer.tsx';
import BackgroundAura from './BackgroundAura.tsx';

interface NotFoundProps {
  lang: Language;
  setLang: (l: Language) => void;
  openModal: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ lang, setLang, openModal }) => {
  const t = {
    en: {
      heading: "Lost in the matrix?",
      subheadline: "The page you are looking for doesn't exist or has been moved. Let's get you back to building.",
      cta: "Back to Homepage"
    },
    gr: {
      heading: "Χαθήκατε στο matrix;",
      subheadline: "Η σελίδα που αναζητάτε δεν υπάρχει ή έχει μετακινηθεί. Ας επιστρέψουμε στη βάση.",
      cta: "Επιστροφη στην Αρχικη"
    }
  }[lang];

  return (
    <div className="relative min-h-screen bg-midnight text-white overflow-hidden selection:bg-royal/30">
      <BackgroundAura />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar lang={lang} setLang={setLang} onStartProject={openModal} />

        <main className="flex-grow flex items-center justify-center px-6 pt-32 pb-20 relative">
          {/* Background Watermark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.02, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          >
            <span className="text-[40vw] font-black tracking-tighter leading-none select-none">404</span>
          </motion.div>

          <div className="max-w-2xl w-full text-center relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 tracking-tighter leading-tight">
                {t.heading}
              </h1>

              <p className="text-white/40 text-lg md:text-xl font-light mb-12 max-w-lg mx-auto leading-relaxed">
                {t.subheadline}
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-12 py-5 bg-royal text-white rounded-full text-[12px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-midnight transition-all duration-500 shadow-2xl shadow-royal/30 active:scale-95"
                >
                  {t.cta}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </main>

        <Footer lang={lang} onStartProject={openModal} />
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(53,51,205,0.03),transparent_70%)]" />
      </div>
    </div>
  );
};

export default NotFound;
