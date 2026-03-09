
'use client';

import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Services from './components/Services.tsx';
import Portfolio from './components/Portfolio.tsx';
import Studio from './components/Studio.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import ProjectModal from './components/ProjectModal.tsx';
import Chatbot from './components/Chatbot.tsx';
import BackgroundAura from './components/BackgroundAura.tsx';
import CustomCursor from './components/CustomCursor.tsx';

export type Language = 'en' | 'gr';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [lang]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative min-h-screen">
      <BackgroundAura />
      <CustomCursor />

      <div className="relative z-10">
        <Navbar lang={lang} setLang={setLang} onStartProject={openModal} />
        <main>
          <Hero lang={lang} onStartProject={openModal} />
          <Portfolio lang={lang} />
          <Services lang={lang} />
          <Studio lang={lang} />
          <Contact lang={lang} onStartProject={openModal} />
        </main>
        <Footer lang={lang} onStartProject={openModal} />
      </div>

      <ProjectModal isOpen={isModalOpen} onClose={closeModal} lang={lang} />
      <Chatbot lang={lang} />
    </div>
  );
};

export default App;