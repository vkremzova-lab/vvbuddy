/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { BuddyHeroScene } from './components/QuantumScene';
import { motion } from 'framer-motion';
import {
  Facebook,
  Linkedin,
  Instagram,
  ArrowRight,
  CheckCircle2,
  Quote,
  Menu,
  X,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Zap
} from 'lucide-react';

/* ---------- Background Decorative Elements ---------- */
const FloatingOrb = ({
  color,
  size,
  top,
  left,
  delay = 0,
}: {
  color: string;
  size: string;
  top: string;
  left: string;
  delay?: number;
}) => (
  <motion.div
    animate={{
      y: [0, -40, 0],
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{ duration: 10, repeat: Infinity, delay }}
    className={`absolute rounded-full blur-[100px] pointer-events-none -z-10 ${color} ${size}`}
    style={{ top, left }}
  />
);

/* ---------- Shared Components ---------- */
const SectionHeader = ({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) => (
  <div className="text-center mb-20 relative">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-7xl font-serif font-bold mb-6 ${
        light ? 'text-white' : 'text-buddy-teal'
      }`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`text-lg md:text-xl max-w-2xl mx-auto font-medium ${
          light ? 'text-white/70' : 'text-buddy-gold'
        }`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

/* ---------- Feature Card ---------- */
const FeatureCard = ({
  title,
  text,
  img,
  delay,
  icon: Icon,
}: {
  title: string;
  text: string;
  img: string;
  delay: number;
  icon: any;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl h-full flex flex-col"
  >
    <div className="h-64 overflow-hidden relative">
      <div className="absolute inset-0 bg-buddy-teal/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
      />
      <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl text-buddy-teal">
        <Icon size={24} />
      </div>
    </div>
    <div className="p-10 flex-1 flex flex-col">
      <h3 className="text-2xl font-serif font-bold mb-4 text-white group-hover:text-buddy-gold transition-colors">
        {title}
      </h3>
      <p className="text-white/70 leading-relaxed text-sm">{text}</p>
    </div>
  </motion.div>
);

/* ---------- Testimonial ---------- */
const Testimonial = ({
  text,
  author,
  delay,
}: {
  text: string;
  author: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="bg-white/70 backdrop-blur-md p-10 md:p-12 rounded-[3.5rem] shadow-xl border border-white relative h-full flex flex-col"
  >
    <div className="absolute -top-5 -left-5 bg-buddy-gold p-4 rounded-2xl text-white shadow-lg">
      <Quote size={24} fill="currentColor" />
    </div>
    <p className="text-stone-700 italic leading-relaxed text-base md:text-lg mb-8 flex-1">
      "{text}"
    </p>
    <p className="font-bold text-buddy-teal text-lg md:text-xl text-right">
      {author}
    </p>
  </motion.div>
);

/* ---------- App ---------- */
const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const TG_LINK = 'https://t.me/VVBuddy_bot?start=VVCOACH';

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      <FloatingOrb color="bg-buddy-teal" size="w-[600px] h-[600px]" top="-100px" left="-200px" />
      <FloatingOrb color="bg-buddy-gold" size="w-[500px] h-[500px]" top="40%" left="80%" delay={2} />

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#327490]/90 backdrop-blur-xl py-3' : 'py-8'
        }`}
      >
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-14 h-14 rounded-full border-2 border-buddy-gold bg-white overflow-hidden">
              <img src="/logo.png" alt="VV Buddy logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-2xl text-white">VV Buddy</span>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center pt-32">
        <BuddyHeroScene />
        <div className="relative z-10 max-w-lg mx-auto">
          <img
            src="/veronika-hero.jpg"
            alt="Veronika Vinterová"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </section>

      {/* ABOUT VERONIKA */}
      <section id="about-veronika" className="py-40 bg-white">
        <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-6xl font-serif font-bold text-buddy-teal mb-10">
              Veronika <span className="text-buddy-gold">Vinterová</span>
            </h2>
            <p className="text-stone-700 text-lg">
              Integrální koučka, zakladatelka Náhoda & Opravdovost.
            </p>
          </div>
          <img
            src="/veronika-about.jpg"
            alt="Veronika Vinterová profil"
            className="rounded-[4rem] shadow-2xl"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-buddy-teal py-20 text-center text-white">
        <img
          src="/logo.png"
          alt="VV Buddy logo"
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-white"
        />
        <p className="font-serif text-2xl">Ing. Veronika Vinterová</p>
      </footer>
    </div>
  );
};

export default App;
