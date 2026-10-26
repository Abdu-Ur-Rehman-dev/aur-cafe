import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles, Coffee } from 'lucide-react';
import { HERO_IMAGE } from '../data/cafeData';

interface HeroProps {
  onExploreMenu: () => void;
  onDiscoverMore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onDiscoverMore }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 bg-[#241711]">
      {/* Background Image Container with Cinematic Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Luxury Ceramic Espresso Cup"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic Multi-Layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#241711] via-[#241711]/60 to-[#241711]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#241711]/90 via-[#241711]/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#241711]/30 to-[#241711]" />
      </div>

      {/* Realistic Coffee Steam Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center opacity-70">
        <div className="relative w-full max-w-lg h-96">
          <div className="absolute left-1/2 bottom-1/3 w-32 h-64 bg-gradient-to-t from-[#F5EBDD]/20 via-[#F5EBDD]/10 to-transparent blur-2xl rounded-full animate-steam-1" />
          <div className="absolute left-1/2 bottom-1/3 w-24 h-56 bg-gradient-to-t from-[#C9A46A]/20 via-[#F5EBDD]/10 to-transparent blur-xl rounded-full animate-steam-2" />
          <div className="absolute left-1/2 bottom-1/3 w-40 h-72 bg-gradient-to-t from-[#FFF9F1]/15 via-[#FFF9F1]/5 to-transparent blur-2xl rounded-full animate-steam-3" />
        </div>
      </div>

      {/* Subtle Floating Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-[#C9A46A]/30 blur-xs animate-float-slow" />
        <div className="absolute top-1/3 right-16 w-3 h-3 rounded-full bg-[#B98252]/40 blur-xs animate-float-medium" />
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#FFF9F1]/40 blur-xs animate-float-slow" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full text-center lg:text-left py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-8">
            {/* Kicker Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#C9A46A]/30 bg-[#4A2C20]/40 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A46A]" />
              <span className="text-xs tracking-[0.3em] text-[#F5EBDD] uppercase font-medium">
                Artisanal Roastery & Haute Patisserie
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#FFF9F1] leading-[1.05]"
            >
              Crafted for <br className="hidden sm:block" />
              <span className="gold-gradient-text italic font-serif font-normal">
                Every Moment.
              </span>
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="text-lg sm:text-xl text-[#F5EBDD]/85 max-w-2xl leading-relaxed font-light"
            >
              Where rare single-origin micro-lots, master flame roasting, and French high patisserie meet in a sanctuary of rich espresso and warm golden light.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4"
            >
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#B98252] to-[#C9A46A] text-[#241711] font-bold text-sm tracking-widest uppercase hover:brightness-110 transition-all shadow-xl hover:shadow-[#B98252]/40 hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
              >
                <Coffee className="w-4 h-4 text-[#241711] group-hover:rotate-12 transition-transform" />
                <span>Explore Menu</span>
              </button>

              <button
                onClick={onDiscoverMore}
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#C9A46A]/50 bg-[#241711]/50 backdrop-blur-md text-[#FFF9F1] font-medium text-sm tracking-widest uppercase hover:bg-[#C9A46A]/10 hover:border-[#C9A46A] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Discover Our Craft</span>
              </button>
            </motion.div>
          </div>

          {/* Side Feature Badge Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="lg:col-span-4 hidden lg:flex flex-col gap-4"
          >
            <div className="p-6 rounded-2xl border border-[#C9A46A]/20 bg-[#4A2C20]/30 backdrop-blur-md espresso-card-glow space-y-2">
              <span className="text-xs text-[#B98252] uppercase tracking-widest">Today's Single Origin</span>
              <p className="font-serif text-2xl font-bold text-[#FFF9F1]">Panama Geisha Boquete</p>
              <p className="text-xs text-[#F5EBDD]/70">Notes of jasmine bloom, white peach, and wild honey nectar.</p>
            </div>

            <div className="p-6 rounded-2xl border border-[#C9A46A]/20 bg-[#4A2C20]/30 backdrop-blur-md espresso-card-glow space-y-2">
              <span className="text-xs text-[#B98252] uppercase tracking-widest">Patisserie Feature</span>
              <p className="font-serif text-2xl font-bold text-[#FFF9F1]">Charentes Butter Croissant</p>
              <p className="text-xs text-[#F5EBDD]/70">72-layer butter lamination baked fresh at dawn daily.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-xs text-[#C9A46A] tracking-widest uppercase cursor-pointer"
        onClick={onDiscoverMore}
      >
        <span>Scroll</span>
        <ArrowDown className="w-4 h-4 text-[#C9A46A]" />
      </motion.div>
    </section>
  );
};
