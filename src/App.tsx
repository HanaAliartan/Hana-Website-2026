/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

// Custom hook for typewriter effect
interface UseTypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
}

function useTypewriter({ text, speed = 35, startDelay = 500 }: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index++;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

interface PortfolioItem {
  id: string;
  img: string;
  title: string;
  category: 'Posters' | 'Branding' | 'Product' | 'Social Media';
}

const portfolioData: PortfolioItem[] = [
  { id: '1', img: '/img/my-design1.jpg', title: 'Creative Brand Poster', category: 'Posters' },
  { id: '3', img: '/img/my-design3.jpg', title: 'Typography Showcase', category: 'Branding' },
  { id: '15', img: '/img/my-design15.jpg', title: 'Corporate Identity', category: 'Branding' },
  { id: '4', img: '/img/my-design4.jpg', title: 'Advertising Visual', category: 'Posters' },
  { id: '11', img: '/img/my-design11.jpg', title: 'Product Launch Card', category: 'Product' },
  { id: '5', img: '/img/my-design5.jpg', title: 'Editorial Spread', category: 'Social Media' },
  { id: '17', img: '/img/my-design17.jpg', title: 'Studio Graphic', category: 'Branding' },
  { id: '14', img: '/img/my-design14.jpg', title: 'Professional ID Card', category: 'Branding' },
  { id: '20', img: '/img/my-design20.jpg', title: 'Visual Campaign', category: 'Social Media' },
  { id: '16', img: '/img/my-design16.jpg', title: 'Digital Flyer', category: 'Posters' },
  { id: '19', img: '/img/my-design19.jpg', title: 'Magazine Cover Layout', category: 'Social Media' },
  { id: '9', img: '/img/my-design9.jpg', title: 'Promotional Banner', category: 'Posters' },
  { id: '13', img: '/img/my-design13.jpg', title: 'Facebook High-Res Poster', category: 'Social Media' },
  { id: '10', img: '/img/my-design10.jpg', title: 'Creative Art Direction', category: 'Branding' },
  { id: '7', img: '/img/my-design7.jpg', title: 'Tourism & Travel Poster', category: 'Posters' },
  { id: '18', img: '/img/my-design18.jpg', title: 'Executive CV Template', category: 'Branding' },
  { id: 'h1', img: '/img/house.jpg', title: 'Real Estate Architecture Poster', category: 'Posters' },
  { id: 'h2', img: '/img/house2.jpg', title: 'Modern Living Campaign', category: 'Posters' },
  { id: 'c1', img: '/img/cream.jpg', title: 'Skincare Cream Branding', category: 'Product' },
  { id: 'cu', img: '/img/cuud.jpg', title: 'Luxury Perfume & Cuud', category: 'Product' },
  { id: 'b1', img: '/img/bilan.jpg', title: 'Bilan Collection Banner', category: 'Branding' },
  { id: 'bk', img: '/img/book.jpg', title: 'Custom Book Cover', category: 'Branding' },
  { id: 'dr', img: '/img/drs-hana.jpg', title: 'Medical Healthcare Poster', category: 'Posters' },
  { id: 'da', img: '/img/daallo.jpg', title: 'Daallo Airline Promotion', category: 'Posters' },
  { id: 'e2', img: '/img/eid2.jpg', title: 'Eid Mubarak Greeting Art', category: 'Social Media' },
  { id: 'm1', img: '/img/match.jpg', title: 'Sports Match Graphics', category: 'Social Media' },
  { id: 'm2', img: '/img/match2.jpg', title: 'Derby Day Match Art', category: 'Social Media' },
  { id: 'ip', img: '/img/iphone.jpg', title: 'Smartphone Showcase', category: 'Product' },
  { id: 'hy', img: '/img/hayat.jpg', title: 'Hayat Brand Experience', category: 'Branding' },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  // Contact form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  const typewriterText = "welcome to my official website, where you'll find high-quality services. Baahiyahaga ayaa ah mudnaantena koowaad, ku qanacsanaantaada ayaa muhiim ii ah, soodhawoow.";
  const { displayed, done } = useTypewriter({
    text: typewriterText,
    speed: 28,
    startDelay: 400,
  });

  // Action buttons appear 400ms after page load independent of typewriter
  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Background video mouse-scrub controller
  useEffect(() => {
    const SENSITIVITY = 0.8;

    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + timeOffset));

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const clientX = e.touches[0].clientX;
      const video = videoRef.current;
      if (!video || !video.duration) return;

      if (prevXRef.current === null) {
        prevXRef.current = clientX;
        return;
      }

      const delta = clientX - prevXRef.current;
      prevXRef.current = clientX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + timeOffset));

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;

    isSeekingRef.current = false;
    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  };

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      targetTimeRef.current = videoRef.current.currentTime || 0;
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('info@ha4166887.com');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/mgawownr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus({ message: 'Mahadsanid! Fariintaada si guul leh ayaa loo diray.', isError: false });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus({ message: 'Khalad ayaa dhacay. Fadlan mar kale isku day.', isError: true });
      }
    } catch {
      setFormStatus({ message: 'Ma jiro internet ama khalad ayaa dhacay.', isError: true });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPortfolio =
    activeCategory === 'All'
      ? portfolioData
      : portfolioData.filter((item) => item.category === activeCategory);

  return (
    <div className="relative w-full min-h-screen text-[#252525] font-['Poppins',sans-serif]">
      {/* ===================== NAVBAR (fixed, z-index: 50) ===================== */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#185b9f]/90 backdrop-blur-md px-5 sm:px-8 py-3.5 sm:py-4 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto flex row justify-between items-center">
          {/* Logo (left) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-row items-center gap-2 group cursor-pointer"
          >
            <span className="text-xl sm:text-2xl">👩‍💻</span>
            <span className="text-[20px] sm:text-[24px] font-bold text-white tracking-wide">
              HANI ALI
            </span>
          </a>

          {/* Desktop nav links (center, hidden below md) */}
          <nav className="hidden md:flex flex-row items-center gap-1 text-[16px] font-medium text-white">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-4 py-1.5 rounded-full hover:bg-[#640115] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-4 py-1.5 rounded-full hover:bg-[#640115] transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="px-4 py-1.5 rounded-full hover:bg-[#640115] transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="px-4 py-1.5 rounded-full hover:bg-[#640115] transition-colors cursor-pointer"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-1.5 rounded-full hover:bg-[#640115] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Desktop CTA (right, hidden below md) */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="text-[15px] font-semibold text-white bg-amber-500 hover:bg-amber-400 px-5 py-2 rounded-full shadow transition-all hover:scale-105 cursor-pointer"
            >
              Contact Me
            </button>
          </div>

          {/* Mobile hamburger (visible below md) */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] cursor-pointer z-50 focus:outline-none"
          >
            <span
              className={`w-6 h-[2.5px] bg-white transition-all duration-300 origin-center ${
                mobileMenuOpen ? 'rotate-45 translate-y-[7.5px]' : ''
              }`}
            />
            <span
              className={`w-6 h-[2.5px] bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-6 h-[2.5px] bg-white transition-all duration-300 origin-center ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-6 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span className="text-xs uppercase tracking-widest text-[#185b9f] font-semibold">
          Menu Navigation
        </span>
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-[28px] font-semibold text-black hover:text-[#185b9f] transition-colors text-left"
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection('about')}
          className="text-[28px] font-semibold text-black hover:text-[#185b9f] transition-colors text-left"
        >
          About
        </button>
        <button
          onClick={() => scrollToSection('services')}
          className="text-[28px] font-semibold text-black hover:text-[#185b9f] transition-colors text-left"
        >
          Services
        </button>
        <button
          onClick={() => scrollToSection('portfolio')}
          className="text-[28px] font-semibold text-black hover:text-[#185b9f] transition-colors text-left"
        >
          Portfolio
        </button>
        <button
          onClick={() => scrollToSection('contact')}
          className="text-[28px] font-semibold text-[#640115] underline underline-offset-4 text-left"
        >
          Contact Me
        </button>
      </div>

      {/* ===================== HERO SECTION WITH MOUSE-SCRUB VIDEO ===================== */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col justify-end pb-14 md:justify-center md:pb-0 px-5 sm:px-10 lg:px-16">
        {/* BACKGROUND VIDEO (mouse-scrub controlled & centered) */}
        <video
          ref={videoRef}
          src="/background.mp4"
          muted
          playsInline
          preload="auto"
          onSeeked={handleSeeked}
          onLoadedMetadata={handleVideoLoadedMetadata}
          className="fixed inset-0 z-0 w-full h-full object-cover object-center pointer-events-none"
          style={{
            objectPosition: 'center center',
          }}
        />

        {/* Soft atmospheric gradient overlay for readability while keeping video vibrant */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-black/20 to-black/30 pointer-events-none" />

        {/* Hero Interactive Content Container */}
        <div className="relative z-10 max-w-2xl text-white">
          {/* 1. Blurred intro label */}
          <div
            className="pointer-events-none select-none mb-3 sm:mb-4"
            style={{
              fontSize: 'clamp(18px, 3.5vw, 24px)',
              lineHeight: 1.3,
              fontWeight: 500,
              color: '#ffffff',
              filter: 'blur(3px)',
            }}
          >
            Hi, I'm HANI ALI
            <br />
            Graphic Designer &amp; Web Developer
          </div>

          {/* Title banner */}
          <div className="inline-block bg-[#185b9f]/80 backdrop-blur-md px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium tracking-wide mb-3 border border-white/20">
            Interactive Video Hero • Drag or move cursor to scrub
          </div>

          {/* 2. Typewriter text */}
          <p
            className="text-white mb-6 sm:mb-7 font-normal"
            style={{
              fontSize: 'clamp(18px, 3.5vw, 24px)',
              lineHeight: 1.4,
              minHeight: '68px',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[3px] animate-blink"
                aria-hidden="true"
              />
            )}
          </p>

          {/* 3. Action pill buttons */}
          <div
            className={`flex flex-wrap gap-y-2 transition-all duration-500 ease-out ${
              buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {/* White pill buttons styled to exact specs */}
            <button
              type="button"
              onClick={() => scrollToSection('services')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.35em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-[#185b9f] hover:text-white transition-colors duration-200 font-medium shadow-md"
            >
              My Services
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('portfolio')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.35em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-[#185b9f] hover:text-white transition-colors duration-200 font-medium shadow-md"
            >
              View Portfolio
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.35em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-[#185b9f] hover:text-white transition-colors duration-200 font-medium shadow-md"
            >
              About Me
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.35em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-[#185b9f] hover:text-white transition-colors duration-200 font-medium shadow-md"
            >
              Contact Me
            </button>

            {/* Outline pill button with copy icon */}
            <button
              type="button"
              onClick={handleCopyEmail}
              title="Click to copy email address"
              className="inline-flex items-center justify-center text-white bg-black/40 backdrop-blur-sm border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.35em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 group font-medium"
            >
              <span>
                Reach us:{' '}
                <span className="underline underline-offset-1">info@ha4166887.com</span>
              </span>
              {copied ? (
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-emerald-300 group-hover:text-black"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div
          onClick={() => scrollToSection('about')}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/80 hover:text-white cursor-pointer transition-colors text-xs uppercase tracking-wider"
        >
          <span>Scroll down</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ===================== ABOUT SECTION ===================== */}
      <section id="about" className="relative z-10 bg-[#faf4f5] py-24 px-5 sm:px-10 lg:px-16 border-t border-black/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          {/* Portrait Image */}
          <div className="w-full md:w-5/12 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#185b9f] to-[#640115] rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition duration-500" />
              <img
                src="/img/me.jpg"
                alt="Hani Ali"
                className="relative rounded-2xl w-full max-w-[340px] shadow-2xl object-cover aspect-[4/5] border-4 border-white"
              />
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-7/12">
            <span className="text-xs font-bold tracking-widest text-[#185b9f] uppercase mb-2 block">
              Biography &amp; Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#252525] mb-5">
              About Me
            </h2>
            <div className="w-16 h-1 bg-[#640115] rounded mb-6" />

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-4">
              I am a creative designer specializing in modern and visually compelling design. I have a strong foundational skill set in web design.
            </p>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-8">
              I focus on creating engaging visuals combined with seamless user experiences. My goal is to deliver high-quality work that meets and exceeds client expectations.
            </p>

            {/* Social Links from website */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.facebook.com/share/1Eeaxx5ins/"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center text-[#B30F2A] hover:bg-[#185b9f] hover:text-white transition-all transform hover:-translate-y-1 text-lg font-bold"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="https://www.instagram.com/hana_4ever0?igsh=MWQ5Nmk3Mmg1dGZ4cA==&igsi=MWQ5Nmk3Mmg1dGZ4cA=="
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center text-[#B30F2A] hover:bg-[#185b9f] hover:text-white transition-all transform hover:-translate-y-1 text-lg font-bold"
                aria-label="Instagram"
              >
                ig
              </a>
              <a
                href="https://t.me/Haniali4"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center text-[#B30F2A] hover:bg-[#185b9f] hover:text-white transition-all transform hover:-translate-y-1 text-lg font-bold"
                aria-label="Telegram"
              >
                tg
              </a>
              <a
                href="https://tiktok.com/@hanaaali026"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center text-[#B30F2A] hover:bg-[#185b9f] hover:text-white transition-all transform hover:-translate-y-1 text-lg font-bold"
                aria-label="TikTok"
              >
                tt
              </a>
              <a
                href="https://wa.me/252770751605"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center text-[#B30F2A] hover:bg-[#185b9f] hover:text-white transition-all transform hover:-translate-y-1 text-lg font-bold"
                aria-label="WhatsApp"
              >
                wa
              </a>

              <button
                onClick={() => scrollToSection('contact')}
                className="ml-auto inline-flex items-center gap-2 bg-[#185b9f] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#640115] transition-colors cursor-pointer text-sm"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SERVICES SECTION ===================== */}
      <section id="services" className="relative z-10 bg-white py-24 px-5 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#185b9f] uppercase mb-2 block">
              What I Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#252525] mb-4">
              MY SERVICES
            </h2>
            <div className="w-16 h-1 bg-[#640115] mx-auto rounded mb-4" />
            <p className="text-neutral-600 text-sm sm:text-base">
              Providing modern, visually captivating design solutions tailored for businesses, professionals, and brands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1: CV */}
            <div className="bg-[#faf4f5] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 flex flex-col group">
              <div className="overflow-hidden h-52 bg-neutral-100">
                <img
                  src="/img/my-design18.jpg"
                  alt="CV Design"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#252525] mb-2 group-hover:text-[#185b9f] transition-colors">
                  Professional CV
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-grow">
                  Waxan ku diyarin Kara CV aad uga hadlesid Shaqadada oo aad ku shaqesan kartid. Modern and high-impact layouts.
                </p>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full py-2 px-4 rounded-full bg-white text-[#185b9f] border border-[#185b9f]/20 font-medium text-xs hover:bg-[#185b9f] hover:text-white transition-colors cursor-pointer"
                >
                  Order Service
                </button>
              </div>
            </div>

            {/* Service 2: ID CARD */}
            <div className="bg-[#faf4f5] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 flex flex-col group">
              <div className="overflow-hidden h-52 bg-neutral-100">
                <img
                  src="/img/my-design14.jpg"
                  alt="ID CARD Design"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#252525] mb-2 group-hover:text-[#185b9f] transition-colors">
                  Corporate ID CARD
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-grow">
                  Waxan kalo sameeya Id-card Qurux iyo Tayo leh, Qanacsanaanta Macamisheyda waa ii muhiim, soodhawow.
                </p>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full py-2 px-4 rounded-full bg-white text-[#185b9f] border border-[#185b9f]/20 font-medium text-xs hover:bg-[#185b9f] hover:text-white transition-colors cursor-pointer"
                >
                  Order Service
                </button>
              </div>
            </div>

            {/* Service 3: Poster Tourism */}
            <div className="bg-[#faf4f5] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 flex flex-col group">
              <div className="overflow-hidden h-52 bg-neutral-100">
                <img
                  src="/img/my-design7.jpg"
                  alt="Poster Tourism"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#252525] mb-2 group-hover:text-[#185b9f] transition-colors">
                  Poster Tourism &amp; Ads
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-grow">
                  Sido kale waxan sameyaa poster Dalxiis (Poster Xageysiin Shirkadeed ah), Waxan shirkadada kuso bandhigi doonaa poster social media.
                </p>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full py-2 px-4 rounded-full bg-white text-[#185b9f] border border-[#185b9f]/20 font-medium text-xs hover:bg-[#185b9f] hover:text-white transition-colors cursor-pointer"
                >
                  Order Service
                </button>
              </div>
            </div>

            {/* Service 4: Poster Facebook */}
            <div className="bg-[#faf4f5] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 flex flex-col group">
              <div className="overflow-hidden h-52 bg-neutral-100">
                <img
                  src="/img/my-design13.jpg"
                  alt="Poster Facebook"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#252525] mb-2 group-hover:text-[#185b9f] transition-colors">
                  Poster Facebook
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-grow">
                  Macamiil Poster Facebook Qurux iyo Tayo leh ayad iga heleysa oo shirkadaada ama ganacsigaaga kor u qaadaya.
                </p>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full py-2 px-4 rounded-full bg-white text-[#185b9f] border border-[#185b9f]/20 font-medium text-xs hover:bg-[#185b9f] hover:text-white transition-colors cursor-pointer"
                >
                  Order Service
                </button>
              </div>
            </div>

            {/* Service 5: Poster Collection & Logos */}
            <div className="bg-[#faf4f5] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 flex flex-col group">
              <div className="overflow-hidden h-52 bg-neutral-100">
                <img
                  src="/img/bilan.jpg"
                  alt="Poster Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#252525] mb-2 group-hover:text-[#185b9f] transition-colors">
                  Brand Logos &amp; Collections
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-grow">
                  Macamiil Sido kale kama Marna posterada Logos Collections, (Anything) wan ku sameen donaa tayo sare leh.
                </p>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full py-2 px-4 rounded-full bg-white text-[#185b9f] border border-[#185b9f]/20 font-medium text-xs hover:bg-[#185b9f] hover:text-white transition-colors cursor-pointer"
                >
                  Order Service
                </button>
              </div>
            </div>

            {/* Service 6: Product & Doctors Ads */}
            <div className="bg-[#faf4f5] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 flex flex-col group">
              <div className="overflow-hidden h-52 bg-neutral-100">
                <img
                  src="/img/drs-hana.jpg"
                  alt="Product & Healthcare Ads"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#252525] mb-2 group-hover:text-[#185b9f] transition-colors">
                  Product &amp; Healthcare Ads
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-grow">
                  Macamiil Sido kale kama Marna posterada Creams, Doctors &amp; Health campaigns wan ku sameen donaa.
                </p>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full py-2 px-4 rounded-full bg-white text-[#185b9f] border border-[#185b9f]/20 font-medium text-xs hover:bg-[#185b9f] hover:text-white transition-colors cursor-pointer"
                >
                  Order Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PORTFOLIO SECTION ===================== */}
      <section id="portfolio" className="relative z-10 bg-[#faf4f5] py-24 px-5 sm:px-10 lg:px-16 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-[#185b9f] uppercase mb-2 block">
              Selected Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#252525] mb-4">
              PORTFOLIO
            </h2>
            <div className="w-16 h-1 bg-[#640115] mx-auto rounded mb-4" />
            <p className="text-neutral-600 text-sm sm:text-base">
              A curated selection of graphics, brand identities, social campaigns, and print designs. Click any work to inspect in detail.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
            {['All', 'Posters', 'Branding', 'Product', 'Social Media'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#185b9f] text-white shadow-md'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredPortfolio.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage({ src: item.img, title: item.title })}
                className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 aspect-[3/4] cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    {item.category}
                  </span>
                  <p className="text-xs font-semibold leading-snug line-clamp-2">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CONTACT SECTION ===================== */}
      <section id="contact" className="relative z-10 bg-white py-24 px-5 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#185b9f] uppercase mb-2 block">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#252525] mb-4">
              CONTACT ME
            </h2>
            <div className="w-16 h-1 bg-[#640115] mx-auto rounded mb-4" />
            <p className="text-neutral-600 text-sm sm:text-base">
              Ready to start your next design project or discuss a custom creative solution? Drop me a message below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf4f5] border border-black/5">
                <div className="w-12 h-12 rounded-xl bg-[#185b9f] text-white flex items-center justify-center shrink-0 text-xl">
                  📍
                </div>
                <div>
                  <h4 className="font-semibold text-[#252525] text-sm">Location</h4>
                  <p className="text-neutral-600 text-sm mt-0.5">Dg-Daynile, Suuqa-Jayga, SOM.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf4f5] border border-black/5">
                <div className="w-12 h-12 rounded-xl bg-[#185b9f] text-white flex items-center justify-center shrink-0 text-xl">
                  ✉️
                </div>
                <div>
                  <h4 className="font-semibold text-[#252525] text-sm">Email Address</h4>
                  <p className="text-neutral-600 text-sm mt-0.5">info@ha4166887.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf4f5] border border-black/5">
                <div className="w-12 h-12 rounded-xl bg-[#185b9f] text-white flex items-center justify-center shrink-0 text-xl">
                  📞
                </div>
                <div>
                  <h4 className="font-semibold text-[#252525] text-sm">Phone / WhatsApp</h4>
                  <p className="text-neutral-600 text-sm mt-0.5">+252 0770751605</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf4f5] border border-black/5">
                <div className="w-12 h-12 rounded-xl bg-[#185b9f] text-white flex items-center justify-center shrink-0 text-xl">
                  🕒
                </div>
                <div>
                  <h4 className="font-semibold text-[#252525] text-sm">Working Hours</h4>
                  <p className="text-neutral-600 text-xs sm:text-sm mt-0.5">
                    Everyday: 12:30pm – 15:30pm<br />
                    Everyday: 19:00pm – 22:00pm
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleFormSubmit} className="space-y-4 bg-[#faf4f5] p-6 sm:p-8 rounded-2xl border border-black/5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#185b9f]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#185b9f]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Describe what you want to create..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#185b9f]"
                  />
                </div>

                {formStatus && (
                  <div
                    className={`p-3 rounded-xl text-sm font-medium ${
                      formStatus.isError ? 'bg-red-50 text-[#8b0219]' : 'bg-green-50 text-emerald-700'
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-full bg-[#185b9f] hover:bg-[#640115] text-white font-semibold text-sm transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  {submitting ? 'Sug Waxyar…' : 'Submit Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="relative z-10 bg-[#185b9f] text-white py-12 px-5 sm:px-10 lg:px-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">👩‍💻</span>
            <span className="font-bold text-lg tracking-wide">HANI ALI</span>
            <span className="text-white/60 text-sm ml-2">© 2026 All Rights Reserved</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/80">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Back to Top
            </button>
            <span>•</span>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <span>•</span>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>

      {/* ===================== LIGHTBOX MODAL ===================== */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex items-center justify-between border-b border-neutral-100 bg-white">
              <h4 className="font-semibold text-sm sm:text-base text-neutral-800">{lightboxImage.title}</h4>
              <button
                onClick={() => setLightboxImage(null)}
                className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-xl font-bold cursor-pointer"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="p-2 overflow-auto flex items-center justify-center bg-neutral-900/10">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
