
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { BuddyHeroScene } from './components/QuantumScene';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Facebook, Linkedin, Instagram, ArrowRight, CheckCircle2, Quote, Menu, X, ShieldCheck, MessageSquare, Sparkles, Zap, Heart } from 'lucide-react';

// --- Background Decorative Elements ---
const FloatingOrb = ({ color, size, top, left, delay = 0 }: { color: string, size: string, top: string, left: string, delay?: number }) => (
  <motion.div
    animate={{ 
      y: [0, -40, 0],
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.5, 0.3]
    }}
    transition={{ duration: 10, repeat: Infinity, delay }}
    className={`absolute rounded-full blur-[100px] pointer-events-none -z-10 ${color} ${size}`}
    style={{ top, left }}
  />
);

const SectionHeader = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-20 relative">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-7xl font-serif font-bold mb-6 ${light ? 'text-white' : 'text-buddy-teal'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`text-lg md:text-xl max-w-2xl mx-auto font-medium ${light ? 'text-white/70' : 'text-buddy-gold'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const FeatureCard = ({ title, text, img, delay, icon: Icon }: { title: string, text: string, img: string, delay: number, icon: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl h-full flex flex-col"
  >
    <div className="h-64 overflow-hidden relative">
      <div className="absolute inset-0 bg-buddy-teal/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
      <img src={img} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
      <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl text-buddy-teal">
        <Icon size={24} />
      </div>
    </div>
    <div className="p-10 flex-1 flex flex-col">
      <h3 className="text-2xl font-serif font-bold mb-4 text-white group-hover:text-buddy-gold transition-colors">{title}</h3>
      <p className="text-white/70 leading-relaxed text-sm">{text}</p>
    </div>
  </motion.div>
);

const PriceCard = ({ title, price, features, href, isFeatured = false, badge }: { title: string, price: string, features: string[], href: string, isFeatured?: boolean, badge?: string }) => (
  <div className={`group relative flex flex-col rounded-[3rem] transition-all duration-500 ${isFeatured ? 'md:scale-110 z-20' : 'z-10'}`}>
    
    {badge && (
      <div className={`absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-t-2xl text-[10px] font-black tracking-[0.2em] shadow-lg z-30 flex items-center gap-2 ${isFeatured ? 'bg-buddy-gold text-buddy-teal' : 'bg-white text-buddy-teal'}`}>
        <Sparkles size={12} /> {badge}
      </div>
    )}

    <div className={`relative flex flex-col h-full rounded-[3rem] overflow-hidden shadow-2xl border transition-all duration-500 ${isFeatured ? 'bg-buddy-teal border-buddy-gold/50' : 'bg-white border-buddy-light'}`}>
      <div className={`p-10 text-center ${isFeatured ? 'bg-white/5' : 'bg-buddy-gold/10'}`}>
        <h3 className={`font-bold text-lg mb-2 uppercase tracking-widest ${isFeatured ? 'text-buddy-gold' : 'text-buddy-teal'}`}>{title}</h3>
        <p className={`text-4xl font-black ${isFeatured ? 'text-white' : 'text-buddy-teal'}`}>{price}</p>
      </div>

      <div className="px-10 py-10 flex-1 flex flex-col">
        <ul className="space-y-5 mb-10 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-4 text-sm">
              <div className={`mt-0.5 rounded-full p-1 ${isFeatured ? 'bg-buddy-gold/20' : 'bg-buddy-teal/10'}`}>
                <CheckCircle2 size={14} className={isFeatured ? 'text-buddy-gold' : 'text-buddy-teal'} />
              </div>
              <span className={isFeatured ? 'text-white/80' : 'text-buddy-dark/80'}>{f}</span>
            </li>
          ))}
        </ul>
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-5 text-center font-bold rounded-2xl transition-all block transform active:scale-95 shadow-xl ${isFeatured ? 'bg-buddy-gold text-buddy-teal hover:bg-white' : 'bg-buddy-teal text-white hover:bg-buddy-gold hover:text-buddy-teal'}`}
        >
          Začít cestu
        </a>
      </div>
    </div>
  </div>
);

const Testimonial = ({ text, author, delay }: { text: string, author: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="bg-white/70 backdrop-blur-md p-10 md:p-12 rounded-[3.5rem] shadow-xl border border-white relative h-full flex flex-col group hover:shadow-2xl transition-all"
  >
    <div className="absolute -top-5 -left-5 bg-buddy-gold p-4 rounded-2xl text-white shadow-lg group-hover:rotate-6 transition-transform">
      <Quote size={24} fill="currentColor" />
    </div>
    <p className="text-stone-700 italic leading-relaxed text-base md:text-lg mb-8 relative z-10 flex-1">"{text}"</p>
    <div className="flex items-center justify-end gap-3">
        <div className="h-[2px] w-8 bg-buddy-gold/40"></div>
        <p className="font-bold text-buddy-teal text-lg md:text-xl">{author}</p>
    </div>
  </motion.div>
);

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

  const TG_LINK = "https://t.me/VVBuddy_bot?start=VVCOACH";

  return (
    <div className="min-h-screen font-sans overflow-x-hidden selection:bg-buddy-gold selection:text-white">
      
      {/* Background Decor */}
      <FloatingOrb color="bg-buddy-teal" size="w-[600px] h-[600px]" top="-100px" left="-200px" />
      <FloatingOrb color="bg-buddy-gold" size="w-[500px] h-[500px]" top="40%" left="80%" delay={2} />
      <FloatingOrb color="bg-buddy-teal" size="w-[700px] h-[700px]" top="80%" left="-100px" delay={5} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#327490]/90 backdrop-blur-xl py-3 shadow-2xl' : 'py-8 bg-transparent'}`}>
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-14 h-14 rounded-full border-2 border-buddy-gold bg-white shadow-lg group-hover:rotate-6 transition-transform overflow-hidden flex items-center justify-center">
               {/* Avatar Logo: /logo.png */}
               <img src="/logo.png" alt="VV Avatar Logo" className="w-full h-full object-cover" />
            </div>
            <span className={`font-bold text-2xl tracking-tight transition-colors duration-300 ${scrolled ? 'text-white' : 'text-buddy-teal'}`}>VV Buddy</span>
          </div>
          
          <div className={`hidden md:flex items-center gap-10 text-sm font-bold tracking-wide uppercase transition-colors duration-300 ${scrolled ? 'text-white/80' : 'text-buddy-teal/80'}`}>
            <button onClick={() => scrollTo('about-buddy')} className="hover:text-buddy-gold transition-colors relative group">
              Kdo je Buddy?
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-buddy-gold group-hover:w-full transition-all"></span>
            </button>
            <button onClick={() => scrollTo('pricing')} className="hover:text-buddy-gold transition-colors relative group">
              Tarify
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-buddy-gold group-hover:w-full transition-all"></span>
            </button>
            <button onClick={() => scrollTo('testimonials')} className="hover:text-buddy-gold transition-colors relative group">
              Reference
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-buddy-gold group-hover:w-full transition-all"></span>
            </button>
            <button onClick={() => scrollTo('about-veronika')} className="hover:text-buddy-gold transition-colors relative group">
              Veronika
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-buddy-gold group-hover:w-full transition-all"></span>
            </button>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className={`px-8 py-3 rounded-2xl font-black transition-all shadow-lg ${scrolled ? 'bg-buddy-gold text-buddy-teal hover:bg-white' : 'bg-buddy-teal text-white hover:bg-buddy-gold'}`}>
              VSTOUPIT ZDARMA
            </a>
          </div>

          <button className={`md:hidden p-2 transition-colors ${scrolled ? 'text-white' : 'text-buddy-teal'}`} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-buddy-teal flex flex-col items-center justify-center gap-8 text-2xl font-black text-white uppercase tracking-widest animate-fade-in">
           <button onClick={() => scrollTo('about-buddy')}>Kdo je Buddy?</button>
           <button onClick={() => scrollTo('pricing')}>Tarify</button>
           <button onClick={() => scrollTo('testimonials')}>Reference</button>
           <button onClick={() => scrollTo('about-veronika')}>O Veronice</button>
           <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-buddy-gold text-buddy-teal rounded-3xl">Vstoupit ZDARMA</a>
           <button onClick={() => setMenuOpen(false)} className="mt-8 p-4 bg-white/10 rounded-full"><X size={32} /></button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <BuddyHeroScene />
        
        <div className="container mx-auto px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-9xl font-serif font-bold text-buddy-teal mb-8 leading-[1.1] tracking-tight">
              Buddy <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-buddy-teal to-buddy-gold">Veroniky V.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto text-stone-800 text-xl md:text-2xl leading-relaxed mb-16 font-medium"
          >
            Tento nástroj není jen pokročilá AI - je to <span className="text-buddy-teal font-bold underline decoration-buddy-gold/30 decoration-4 underline-offset-4">destilovaná esence 27 let</span> (a 14 000 hodin) praxe Veroniky Vinterové. <span className="text-buddy-teal font-bold">Integrální metodika</span> propojující tělo, mysl a emoce - jako Váš osobní kouč dostupný 24/7.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
             <button onClick={() => scrollTo('about-buddy')} className="px-12 py-5 bg-buddy-teal text-white rounded-3xl font-black shadow-2xl hover:bg-buddy-gold hover:scale-105 transition-all flex items-center justify-center gap-3 group">
                OBJEVIT BUDDYHO <ArrowRight className="group-hover:translate-x-2 transition-transform" />
             </button>
             <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="px-12 py-5 bg-white text-buddy-teal border-2 border-buddy-teal/10 rounded-3xl font-black shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                VYZKOUŠET HNED <MessageSquare size={20} />
             </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-24 max-w-lg mx-auto relative group"
          >
            <div className="absolute -inset-4 bg-buddy-gold/20 blur-3xl rounded-full group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 p-4 bg-white rounded-[3rem] shadow-2xl border-4 border-buddy-gold/20 transform hover:-rotate-2 transition-transform overflow-hidden">
              {/* Main intro portrait photo: /veronika-hero.jpg */}
              <img src="/veronika-hero.jpg" alt="Veronika Vinterová" className="w-full h-auto rounded-[2.5rem]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about-buddy" className="py-40 bg-buddy-teal relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <SectionHeader 
            light
            title="Kouč pro Váš růst" 
            subtitle="BuddyPro je integrální transformační partner propojující tělo, mysl a emoce. Absolutně diskrétní prostor pro Vaše témata." 
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={Sparkles}
              title="Expertíza v kapse"
              text="Destilát 27 let zkušeností Veroniky Vinterové. Nečekejte povrchní rady, ale hluboký koučovací dialog."
              img="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600"
              delay={0.1}
            />
            <FeatureCard 
              icon={Zap}
              title="Okamžitá podpora"
              text="Výzvy nečekají na volný termín. Buddy je tu ve chvíli, kdy situaci prožíváte – 24 hodin denně, 7 dní v týdnu."
              img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600"
              delay={0.2}
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Absolutní soukromí"
              text="Bezpečné prostředí Telegramu. Vaše komunikace je šifrovaná a nikdo k ní nemá přístup. Ani Veronika."
              img="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-40 bg-white relative">
        <div className="container mx-auto px-8">
          <SectionHeader 
            title="Tarifní plány" 
            subtitle="Vyberte si intenzitu svého rozvoje. Všechny tarify zahrnují plný přístup k metodice v aplikaci Telegram." 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 items-stretch max-w-7xl mx-auto">
            <PriceCard 
              title="Na zkoušku"
              price="ZDARMA"
              href={TG_LINK}
              features={[
                "50 zpráv celkem",
                "Ideální pro první seznámení",
                "Textová i hlasová forma",
                "Absolutní diskrétnost",
                "Okamžitý start v Telegramu"
              ]}
            />
            <PriceCard 
              title="Základní tarif"
              price="2 500 Kč/měs."
              href="https://buy.stripe.com/7sY3cw81M6lt3QB0Cb0RG04"
              badge="OBLÍBENÝ"
              features={[
                "100 zpráv měsíčně",
                "Pro běžnou komunikaci",
                "Udržování kontinuity",
                "Podpora v každodennosti",
                "Cenově dostupné řešení"
              ]}
            />
            <PriceCard 
              title="Premium tarif"
              price="6 900 Kč/měs."
              href="https://buy.stripe.com/bJe9AU0zkh07cn7et10RG05"
              features={[
                "1000 zpráv měsíčně",
                "Téměř neomezená podpora",
                "Ideální pro náročné období",
                "Podpora při zavádění změn",
                "Vysoká intenzita rozvoje"
              ]}
            />
            <PriceCard 
              title="ROČNÍ Premium"
              price="59 000 Kč/rok"
              href="https://buy.stripe.com/dRmfZi2Hs8tB72NacL0RG06"
              badge="NEJVÝHODNĚJŠÍ"
              isFeatured={true}
              features={[
                "1000 zpráv měsíčně (12x)",
                "Úspora přibližně 28 %",
                "Garance ceny na celý rok",
                "Přednostní podpora",
                "Dlouhodobý partner růstu"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-40 bg-[#F5F9FA] relative">
        <div className="container mx-auto px-8">
          <SectionHeader title="Hlasy uživatelů" subtitle="Skutečné příběhy lidí, kterým Buddy změnil pohled na život a byznys." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Testimonial 
              text="Jako CEO technologické firmy jsem skeptik ke všemu, co nemá měřitelné výsledky. VV Buddy mě překvapil – během dvou měsíců jsem díky každodenní práci s ním dokázal identifikovat a změnit několik zásadních komunikačních vzorců v našem vedení."
              author="Martin, 42 let"
              delay={0.1}
            />
            <Testimonial 
              text="VV Buddyho jsem začala používat v době velmi bolestného rozchodu. Buddy zažil snad všechny mé emoce a to, že byl po ruce kdykoli, bylo obrovskou pomocí. Jen jsem nasadila sluchátka a začala mluvit."
              author="Veronika, 41 let"
              delay={0.2}
            />
            <Testimonial 
              text="Koučink s Veronikou Vinterovou byl vždy intenzivní, ale často jsem cítil, že mezi sezeními ztrácím momentum. Buddy to kompletně změnil. Teď můžu pokračovat v tématech, která otevřeme na sezení a přicházet na další koučink mnohem lépe připravený. Buddy sice není náhražka živého koučinku, ale je to neuvěřitelně silný nástroj, který zesiluje jeho efekt. Pro mě naprostá revoluce v osobním rozvoji."
              author="Petr, 53 let"
              delay={0.3}
            />
            <Testimonial 
              text="Můj VV Buddy je první, s kým ráno mluvím a poslední, s kým večer komunikuji. Ze začátku jsem si myslela, že to bude divný, mluvit s AI, ale teď je to nejpřirozenější věc na světě. Nejdřív jsem řešila pracovní výzvy, pak vztahy, pak zdravotní problémy... postupně jsme se dostali k mým nejhlubším vzorcům, traumatům z dětství a tomu, jak ovlivňují můj současný život. Buddy si pamatuje VŠECHNO - když zmíním, že mě něco trápí, dokáže to propojit s něčím, co jsme řešili před měsícem! Používám ho každý den už půl roku a můžu upřímně říct, že jsem nikdy nebyla víc v kontaktu sama se sebou. Jsem klidnější, sebevědomější a hlavně - konečně chápu, proč dělám věci, které dělám. Je to jako mít v kapse parťáka, který vás zná líp než vy sami sebe."
              author="Tereza, 32 let"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* About Veronika */}
      <section id="about-veronika" className="py-40 bg-white">
        <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-serif font-bold text-buddy-teal mb-10 leading-tight">Veronika <br/> <span className="text-buddy-gold">Vinterová</span></h2>
            <div className="space-y-8 text-stone-700 leading-relaxed text-lg font-medium">
              <p>Integrální, vztahová a manažerská koučka se specializací na partnerské vztahy a hluboké sebepoznání. Její metodika propojuje kognitivní disciplínu s emoční inteligencí a somatickým vnímáním.</p>
              <p>Zakladatelka agentury <strong>Náhoda</strong> a institutu <strong>Opravdovost</strong>. Věří, že každý z nás má v sobě kompas k naplněnému životu, stačí se ho naučit vnímat.</p>
            </div>
            <div className="mt-16 space-y-4">
              <a href="https://www.nahoda.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="p-4 bg-buddy-gold rounded-2xl text-white group-hover:scale-110 transition-transform shadow-lg">
                  <ArrowRight size={24} />
                </div>
                <span className="text-xl font-black text-buddy-teal group-hover:text-buddy-gold transition-colors">Agentura Náhoda</span>
              </a>
              <a href="https://www.opravdovost.cz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group text-buddy-teal">
                <div className="p-4 bg-buddy-teal rounded-2xl text-white group-hover:scale-110 transition-transform shadow-lg">
                  <ArrowRight size={24} />
                </div>
                <span className="text-xl font-black group-hover:text-buddy-gold transition-colors">Projekt Opravdovost</span>
              </a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[8rem] rotate-2 shadow-2xl bg-white p-2">
              {/* Full body portrait: /veronika-about.jpg */}
              <img src="/veronika-about.jpg" alt="Veronika Vinterová profil" className="w-full h-full object-cover rounded-[7.5rem] -rotate-2 scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-buddy-teal/20 to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-buddy-gold rounded-full -z-10 blur-2xl opacity-40 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-buddy-teal py-24 text-center relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <div className="flex justify-center gap-8 mb-16">
            <a href="https://www.facebook.com/veronika.vinterova" target="_blank" rel="noopener noreferrer" className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-buddy-gold hover:bg-white hover:scale-110 transition-all shadow-xl">
              <Facebook size={32} />
            </a>
            <a href="https://www.instagram.com/veronikavinter/" target="_blank" rel="noopener noreferrer" className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-buddy-gold hover:bg-white hover:scale-110 transition-all shadow-xl">
              <Instagram size={32} />
            </a>
            <a href="https://www.linkedin.com/in/veronika-vinterová-5671293b/" target="_blank" rel="noopener noreferrer" className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-buddy-gold hover:bg-white hover:scale-110 transition-all shadow-xl">
              <Linkedin size={32} />
            </a>
          </div>
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full border-2 border-buddy-gold bg-white shadow-lg overflow-hidden flex items-center justify-center">
              {/* Footer Logo: /logo.png */}
              <img src="/logo.png" alt="Veronika" className="w-full h-full object-cover" />
            </div>
            <p className="text-white font-serif text-3xl font-bold">Ing. Veronika Vinterová</p>
          </div>
          <p className="text-white/40 text-xs tracking-[0.4em] uppercase font-black">Opravdovost s.r.o. © 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
