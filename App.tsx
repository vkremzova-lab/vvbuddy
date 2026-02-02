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

/* ---------------- helpers ---------------- */

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

/* ---------------- app ---------------- */

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      {/* background */}
      <FloatingOrb
        color="bg-buddy-teal"
        size="w-[600px] h-[600px]"
        top="-100px"
        left="-200px"
      />
      <FloatingOrb
        color="bg-buddy-gold"
        size="w-[500px] h-[500px]"
        top="40%"
        left="80%"
        delay={2}
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

          <div className="hidden md:flex items-center gap-10">
            <button onClick={() => scrollTo("about-buddy")}>Kdo je Buddy?</button>
            <button onClick={() => scrollTo("pricing")}>Tarify</button>
            <button onClick={() => scrollTo("about-veronika")}>Veronika</button>
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
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-32">
        <BuddyHeroScene />

        <div className="container mx-auto px-8 relative z-10 text-center">
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-buddy-teal mb-10">
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
              Integrální koučka a zakladatelka projektů Náhoda a Opravdovost.
            </p>
          </div>

          <div className="relative">
            <img
              src="/veronika-about.jpg"
              alt="Veronika Vinterová"
              className="w-full rounded-[6rem] shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-buddy-teal py-24 text-center">
        <div className="container mx-auto px-8">
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
        </div>
      </footer>
    </div>
  );
};

export default App;
