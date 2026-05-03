
'use client';

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Services from './components/Services.tsx';
import ProductSpotlight from './components/ProductSpotlight.tsx';
import Portfolio from './components/Portfolio.tsx';
import Studio from './components/Studio.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import ProjectModal from './components/ProjectModal.tsx';
import BackgroundAura from './components/BackgroundAura.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import WebDesignPage from './components/WebDesignPage.tsx';
import SoftwarePage from './components/SoftwarePage.tsx';
import AutomationsPage from './components/AutomationsPage.tsx';
import NotFound from './components/NotFound.tsx';

export type Language = 'en' | 'gr';

/* ── Home page (unchanged) ── */
const HomePage: React.FC<{
  lang: Language;
  setLang: (l: Language) => void;
  openModal: () => void;
}> = ({ lang, setLang, openModal }) => {
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

  // Pull content up as user scrolls down from Hero
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, -150]);

  return (
    <div className="relative min-h-screen">
      <BackgroundAura />
      <div className="relative z-10">
        <Navbar lang={lang} setLang={setLang} onStartProject={openModal} />
        <main>
          <Hero lang={lang} onStartProject={openModal} />
          <motion.div style={{ y: contentY, marginBottom: "-150px" }} className="relative z-20 w-full">
            <Portfolio lang={lang} />
            <ProductSpotlight lang={lang} />
            <Services lang={lang} />
            <Studio lang={lang} />
            <Contact lang={lang} onStartProject={openModal} />
            <Footer lang={lang} onStartProject={openModal} />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

/* ── App root with router ── */
const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route
          path="/"
          element={<HomePage lang={lang} setLang={setLang} openModal={openModal} />}
        />
        <Route
          path="/services/automations"
          element={
            <AutomationsPage lang={lang} setLang={setLang} onStartProject={openModal} />
          }
        />
        <Route
          path="/services/software"
          element={
            <SoftwarePage lang={lang} setLang={setLang} onStartProject={openModal} />
          }
        />
        <Route
          path="/services/web-design"
          element={
            <WebDesignPage lang={lang} setLang={setLang} onStartProject={openModal} />
          }
        />
        <Route
          path="*"
          element={
            <NotFound lang={lang} setLang={setLang} openModal={openModal} />
          }
        />
      </Routes>
      <ProjectModal isOpen={isModalOpen} onClose={closeModal} lang={lang} />
    </BrowserRouter>
  );
};

export default App;