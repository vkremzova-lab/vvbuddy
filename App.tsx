/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { BuddyHeroScene } from "./components/QuantumScene";
import { motion } from "framer-motion";
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
  Zap,
} from "lucide-react";

/* ---------- helpers ---------- */

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
        light ? "text-white" : "text-buddy-teal"
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
          light ? "text-white/70" : "text-buddy-gold"
        }`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

/* ---------- cards ---------- */

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

const PriceCard = ({
  title,
  price,
  features,
  href,
  isFeatured = false,
  badge,
}: {
  title: string;
  price: string;
  features: string[];
  href: string;
  isFeatured?: boolean;
  badge?: string;
}) => (
  <div
    className={`group relative flex flex-col rounded-[3rem] transition-all duration-500 ${
      isFeatured ? "md:scale-110 z-20" : "z-10"
    }`}
  >
    {badge && (
      <div
        className={`absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-t-2xl text-[10px] font-black tracking-[0.2em] shadow-lg z-30 flex items-center gap-2 ${
          isFeatured
            ? "bg-buddy-gold text-buddy-teal"
            : "bg-white text-buddy-teal"
        }`}
      >
        <Sparkles size={12} /> {badge}
      </div>
    )}

    <div
      className={`relative flex flex-col h-full rounded-[3rem] overflow-hidden shadow-2xl border transition-all duration-500 ${
        isFeatured
          ? "bg-buddy-teal border-buddy-gold/50"
          : "bg-white border-buddy-light"
      }`}
    >
      <div
        className={`p-10 text-center ${
          isFeatured ? "bg-white/5" : "bg-buddy-gold/10"
        }`}
      >
        <h3
          className={`font-bold text-lg mb-2 uppercase tracking-widest ${
            isFeatured ? "text-buddy-gold" : "text-buddy-teal"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-4xl font-black ${
            isFeatured ? "text-white" : "text-buddy-teal"
          }`}
        >
          {price}
        </p>
      </div>

      <div className="px-10 py-10 flex-1 flex flex-col">
        <ul className="space-y-5 mb-10 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-4 text-sm">
              <div
                className={`mt-0.5 rounded-full p-1 ${
                  isFeatured
                    ? "bg-buddy-gold/20"
                    : "bg-buddy-teal/10"
                }`}
              >
                <CheckCircle2
                  size={14}
                  className={
                    isFeatured ? "text-buddy-gold" : "text-buddy-teal"
                  }
                />
              </div>
              <span
                className={
                  isFeatured ? "text-white/80" : "text-buddy-dark/80"
                }
              >
                {f}
              </span>
            </li>
          ))}
        </ul>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-5 text-center font-bold rounded-2xl transition-all block shadow-xl ${
            isFeatured
              ? "bg-buddy-gold text-buddy-teal hover:bg-white"
              : "bg-buddy-teal text-white hover:bg-buddy-gold hover:text-buddy-teal"
          }`}
        >
          Začít cestu
        </a>
      </div>
    </div>
  </div>
);

/* ---------- app ---------- */

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const TG_LINK = "https://t.me/VVBuddy_bot?start=VVCOACH";

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      <FloatingOrb
        color="bg-buddy-teal"
        size="w-[600px] h-[600px]"
        top="-100px"
        left="-200px"
      />

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#327490]/90 backdrop-blur-xl py-3 shadow-2xl"
            : "py-8 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-14 h-14 rounded-full border-2 border-buddy-gold bg-white shadow-lg overflow-hidden flex items-center justify-center">
              <img
                src="/logo.png"
                alt="VV Buddy logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`font-bold text-2xl ${
                scrolled ? "text-white" : "text-buddy-teal"
              }`}
            >
              VV Buddy
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10 font-bold">
            <button onClick={() => scrollTo("about-buddy")}>
              Kdo je Buddy?
            </button>
            <button onClick={() => scrollTo("pricing")}>Tarify</button>
            <button onClick={() => scrollTo("testimonials")}>
              Reference
            </button>
            <button onClick={() => scrollTo("about-veronika")}>
              Veronika
            </button>
            <a
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-buddy-teal text-white rounded-2xl font-black"
            >
              VSTOUPIT ZDARMA
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center pt-32">
        <BuddyHeroScene />
        <div className="container mx-auto px-8 text-center relative z-10">
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-buddy-teal mb-12">
            Buddy <br />
            <span className="text-buddy-gold">Veroniky V.</span>
          </h1>

          <div className="max-w-lg mx-auto">
            <img
              src="/veronika-hero.jpg"
              alt="Veronika Vinterová"
              className="w-full rounded-[3rem] shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ABOUT VERONIKA */}
      <section id="about-veronika" className="py-40 bg-white">
        <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-5xl md:text-8xl font-serif font-bold text-buddy-teal mb-10">
              Veronika <br />
              <span className="text-buddy-gold">Vinterová</span>
            </h2>
            <p className="text-lg text-stone-700">
              Integrální, vztahová a manažerská koučka. Zakladatelka
              projektů Náhoda a Opravdovost.
            </p>
          </div>

          <img
            src="/veronika-about.jpg"
            alt="Veronika Vinterová"
            className="w-full rounded-[6rem] shadow-2xl"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-buddy-teal py-24 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden border-2 border-buddy-gold bg-white">
          <img
            src="/logo.png"
            alt="VV Buddy"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-white font-serif text-2xl">
          Ing. Veronika Vinterová
        </p>
      </footer>
    </div>
  );
};

export default App;
