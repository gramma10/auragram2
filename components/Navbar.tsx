
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo.tsx';
import { Language } from '../App.tsx';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  onStartProject: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onStartProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const isHomePage = location.pathname === '/';

    if (isHomePage) {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80; // Navbar height + padding
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Navigate to home page first
      navigate('/');
      // Use a small timeout to allow the home page to mount
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
    closeMobile();
  };

  /* ── Scroll detection ── */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Close mobile menu on desktop resize ── */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ── Close services dropdown on outside click ── */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = {
    en: {
      services: 'Services',
      portfolio: 'Portfolio',
      about: 'About',
      contact: 'Contact',
      btn: "Let's Talk",
      serviceItems: [
        { label: 'Web Design & Development', desc: 'Fast, converting websites engineered for growth.', href: '/services/web-design', internal: true },
        { label: 'Custom Software & SaaS', desc: 'Bespoke platforms that scale with your business.', href: '/services/software', internal: true },
        { label: 'AI & Automations', desc: 'Pipelines that eliminate manual work at scale.', href: '/services/automations', internal: true },
      ],
    },
    gr: {
      services: 'Υπηρεσίες',
      portfolio: 'Portfolio',
      about: 'Studio',
      contact: 'Επικοινωνία',
      btn: 'Ξεκινηστε',
      serviceItems: [
        { label: 'Web Design & Development', desc: 'Γρήγορα sites βελτιστοποιημένα για conversions.', href: '/services/web-design', internal: true },
        { label: 'Custom Software & SaaS', desc: 'Πλατφόρμες που κλιμακώνονται με την επιχείρησή σας.', href: '/services/software', internal: true },
        { label: 'AI & Αυτοματισμοί', desc: 'Pipelines που εξαλείφουν τη χειρωνακτική εργασία.', href: '/services/automations', internal: true },
      ],
    },
  }[lang];

  const closeMobile = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  /* ─────────────────────────────────────────────── */
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pt-5 px-4 pointer-events-none">
      {/* ── Floating Pill ── */}
      <div
        className={`
          pointer-events-auto
          relative flex items-center justify-between
          w-full max-w-5xl
          px-4 md:px-6 h-[60px]
          rounded-[50px]
          transition-all duration-500 ease-out
          ${isScrolled
            ? 'bg-[#080810]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]'
            : 'bg-[#080810]/60 backdrop-blur-xl border border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          }
        `}
      >
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center flex-shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="scale-[1.6] transform origin-left ml-2">
            <Logo />
          </div>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <div className="hidden md:flex items-center gap-1">

          {/* Services with Dropdown */}
          <div ref={servicesRef} className="relative">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              {t.services}
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Services Dropdown */}
            <div
              className={`
                absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2
                w-[260px] rounded-2xl overflow-hidden
                bg-[#0a0a14]/98 backdrop-blur-2xl
                border border-white/[0.08]
                shadow-[0_24px_60px_rgba(0,0,0,0.8)]
                transition-all duration-300 origin-top
                ${isServicesOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}
              `}
            >
              <div className="p-2">
                {t.serviceItems.map((item, i) => (
                  <Link
                    key={i}
                    to={item.href}
                    onClick={() => {
                      setIsServicesOpen(false);
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-royal/40 group-hover:bg-royal transition-colors duration-200 flex-shrink-0" />
                    <span className="text-[12px] font-semibold text-white/60 group-hover:text-white transition-colors duration-200 leading-tight">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <a
            href="/#work"
            onClick={(e) => handleNavClick(e, 'work')}
            className="px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
          >
            {t.portfolio}
          </a>

          {/* About */}
          <a
            href="/#the-studio"
            onClick={(e) => handleNavClick(e, 'the-studio')}
            className="px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
          >
            {t.about}
          </a>

          {/* Contact */}
          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
          >
            {t.contact}
          </a>
        </div>

        {/* ── Right Side: Lang Toggle + CTA ── */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1.5">
            <button
              onClick={() => setLang('en')}
              className={`text-[11px] font-bold tracking-wider transition-all duration-200 px-1.5 py-0.5 rounded-full ${lang === 'en'
                ? 'bg-royal/20 text-royal'
                : 'text-white/30 hover:text-white/70'
                }`}
            >
              EN
            </button>
            <span className="text-white/15 text-[10px]">|</span>
            <button
              onClick={() => setLang('gr')}
              className={`text-[11px] font-bold tracking-wider transition-all duration-200 px-1.5 py-0.5 rounded-full ${lang === 'gr'
                ? 'bg-royal/20 text-royal'
                : 'text-white/30 hover:text-white/70'
                }`}
            >
              GR
            </button>
          </div>

          {/* CTA Button */}
          <button
            onClick={onStartProject}
            className="px-5 py-2 bg-royal text-white rounded-full text-[12px] font-black uppercase tracking-widest hover:bg-white hover:text-midnight transition-all duration-300 shadow-[0_0_20px_rgba(53,51,205,0.4)] hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] active:scale-95"
          >
            {t.btn}
          </button>
        </div>

        {/* ── Mobile: Hamburger Only ── */}
        <div className="flex md:hidden items-center gap-3">

          {/* Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.1] transition-all duration-200"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-center justify-center gap-[4.5px] w-[16px]">
              <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[6px] w-full' : 'w-full'}`} />
              <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 w-0' : 'w-full'}`} />
              <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6px] w-full' : 'w-3'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      <div
        className={`
          pointer-events-none absolute top-[76px] left-4 right-4
          rounded-2xl overflow-hidden
          bg-[#0d0d18]/95 backdrop-blur-2xl
          border border-white/[0.08]
          shadow-[0_16px_48px_rgba(0,0,0,0.7)]
          transition-all duration-400 ease-out origin-top
          ${isMobileMenuOpen
            ? 'opacity-100 scale-y-100 pointer-events-auto visible'
            : 'opacity-0 scale-y-95 invisible'
          }
        `}
      >
        <div className="px-4 py-5 flex flex-col gap-1">
          {/* Home */}
          <Link
            to="/"
            onClick={() => {
              closeMobile();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center px-4 py-3 rounded-xl text-[13px] font-semibold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
          >
            {lang === 'en' ? 'Home' : 'Αρχική'}
          </Link>

          {/* Services heading */}
          <div className="px-4 pt-3 pb-1">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">{t.services}</span>
          </div>

          {/* Service items — all 3 direct links */}
          {t.serviceItems.map((item, i) => (
            <Link
              key={i}
              to={item.href}
              onClick={() => {
                closeMobile();
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="flex items-center gap-3 pl-8 pr-4 py-2.5 rounded-xl text-[12px] font-medium text-white/40 hover:text-white hover:bg-white/[0.06] transition-all duration-200 group"
            >
              <span className="w-1 h-1 rounded-full bg-royal/50 group-hover:bg-royal transition-colors duration-200 flex-shrink-0" />
              {item.label}
            </Link>
          ))}

          <a
            href="/#work"
            onClick={(e) => handleNavClick(e, 'work')}
            className="flex items-center px-4 py-3 rounded-xl text-[13px] font-semibold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200 mt-1"
          >
            {t.portfolio}
          </a>

          {/* About — mobile */}
          <a
            href="/#the-studio"
            onClick={(e) => handleNavClick(e, 'the-studio')}
            className="flex items-center px-4 py-3 rounded-xl text-[13px] font-semibold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
          >
            {t.about}
          </a>
          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="flex items-center px-4 py-3 rounded-xl text-[13px] font-semibold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
          >
            {t.contact}
          </a>

          {/* Mobile CTA + Lang Toggle */}
          <div className="pt-5 mt-2 border-t border-white/[0.06] flex flex-col gap-4">
            {/* Language Toggle (mobile menu) */}
            <div className="flex items-center justify-center gap-4 bg-white/[0.05] border border-white/[0.07] rounded-full py-2 mx-auto px-6">
              <button
                onClick={() => setLang('en')}
                className={`text-[12px] font-bold tracking-widest transition-colors ${lang === 'en' ? 'text-royal' : 'text-white/30 hover:text-white/60'}`}
              >
                ENGLISH
              </button>
              <span className="text-white/15 text-[10px]">|</span>
              <button
                onClick={() => setLang('gr')}
                className={`text-[12px] font-bold tracking-widest transition-colors ${lang === 'gr' ? 'text-royal' : 'text-white/30 hover:text-white/60'}`}
              >
                ΕΛΛΗΝΙΚΑ
              </button>
            </div>

            <button
              onClick={() => { onStartProject(); closeMobile(); }}
              className="w-full px-6 py-3.5 bg-royal text-white rounded-full text-[12px] font-black uppercase tracking-widest hover:bg-white hover:text-midnight transition-all duration-300 shadow-[0_0_20px_rgba(53,51,205,0.35)]"
            >
              {t.btn}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;