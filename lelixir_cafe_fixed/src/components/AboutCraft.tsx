import React, { useState } from 'react';
import { ABOUT_BEANS_IMAGE } from '../data/cafeData';
import { Flame, ShieldCheck, Clock, Compass } from 'lucide-react';

export const AboutCraft: React.FC = () => {
  const [selectedRoast, setSelectedRoast] = useState<'light' | 'medium' | 'dark'>('medium');

  const roastProfiles = {
    light: {
      name: 'Light Roast — Artisan Cinnamon (200°C)',
      temp: '200°C',
      time: '9:30 mins',
      notes: 'Bright citrus acidity, tea-like body, sparkling floral aromatics.',
      flavorHighlights: ['Bergamot', 'Wild Berry', 'Jasmine Blossom'],
    },
    medium: {
      name: 'Medium Roast — City Roast (210°C)',
      temp: '210°C',
      time: '11:45 mins',
      notes: 'Perfect equilibrium of caramel sweetness, velvety body, and milk chocolate finish.',
      flavorHighlights: ['Toasted Almond', 'Golden Honey', 'Milk Chocolate'],
    },
    dark: {
      name: 'Dark Roast — French Espresso (225°C)',
      temp: '225°C',
      time: '14:00 mins',
      notes: 'Deep cocoa bitterness, smoky oak wood undertones, thick golden crema.',
      flavorHighlights: ['Dark Cacao 85%', 'Smoked Oak', 'Molasses'],
    },
  };

  const activeRoast = roastProfiles[selectedRoast];

  return (
    <section id="about" className="py-24 bg-[#241711] text-[#FFF9F1] relative overflow-hidden">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A2C20]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B98252]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs tracking-[0.3em] text-[#C9A46A] uppercase font-semibold">
            Our Philosophy & Craft
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFF9F1]">
            Obsessive Precision in Every Harvest
          </h2>
          <div className="w-16 h-[2px] bg-[#C9A46A] mx-auto" />
        </div>

        {/* Two-Column Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Image Column */}
          <div className="lg:col-span-6 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A46A]/20 shadow-2xl aspect-[4/3]">
              <img
                src={ABOUT_BEANS_IMAGE}
                alt="Specialty Glossy Roasted Coffee Beans"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241711] via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex flex-col p-6 rounded-2xl bg-[#4A2C20]/90 backdrop-blur-md border border-[#C9A46A]/30 shadow-2xl">
              <span className="font-serif text-3xl font-bold text-[#C9A46A]">210°C</span>
              <span className="text-xs text-[#F5EBDD]/80 uppercase tracking-widest mt-1">
                Precision Roast Flame
              </span>
            </div>
          </div>

          {/* Text Story Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFF9F1] leading-tight">
              Direct Micro-Lot Trade From Volcanic Highlands
            </h3>

            <p className="text-[#F5EBDD]/85 leading-relaxed text-base">
              At <strong className="text-[#C9A46A] font-semibold">L'Élixir Atelier</strong>, coffee is not merely a beverage — it is a sensory ritual. We forge direct partnerships with micro-lot coffee estates in Panama, Ethiopia, and Guatemala, selecting only the top 1% hand-picked Arabica cherries at peak ripeness.
            </p>

            <p className="text-[#F5EBDD]/85 leading-relaxed text-base">
              Each small batch is roasted on our restored vintage brass Giesen drum roaster. We monitor temperature, airflow, and drum rotation in real-time to preserve the delicate terroirs of every origin.
            </p>

            {/* Key Pillars Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl border border-[#4A2C20] bg-[#4A2C20]/20 flex items-start gap-3">
                <Compass className="w-5 h-5 text-[#C9A46A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-bold text-[#FFF9F1]">100% Micro-Lot</h4>
                  <p className="text-xs text-[#F5EBDD]/70">Fully traceable to single estate farms.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#4A2C20] bg-[#4A2C20]/20 flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C9A46A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-bold text-[#FFF9F1]">48h Freshness</h4>
                  <p className="text-xs text-[#F5EBDD]/70">Served within optimal degassing window.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#4A2C20] bg-[#4A2C20]/20 flex items-start gap-3">
                <Flame className="w-5 h-5 text-[#C9A46A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-bold text-[#FFF9F1]">Flame Profiling</h4>
                  <p className="text-xs text-[#F5EBDD]/70">Tailored heat curve per coffee bean.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#4A2C20] bg-[#4A2C20]/20 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C9A46A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-bold text-[#FFF9F1]">Zero Additives</h4>
                  <p className="text-xs text-[#F5EBDD]/70">Pure natural flavors and organic milks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Roasting Curve Explorer */}
        <div className="p-8 rounded-2xl border border-[#C9A46A]/20 bg-[#4A2C20]/30 backdrop-blur-md espresso-card-glow space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#4A2C20] pb-6">
            <div>
              <span className="text-xs text-[#B98252] uppercase tracking-widest font-semibold">Interactive Roasting Profile</span>
              <h3 className="font-serif text-2xl font-bold text-[#FFF9F1]">Explore Heat & Flavor Evolution</h3>
            </div>

            {/* Roast Select Segmented Control */}
            <div className="flex items-center gap-2 p-1.5 bg-[#241711] rounded-full border border-[#4A2C20]">
              {(['light', 'medium', 'dark'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRoast(r)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                    selectedRoast === r
                      ? 'bg-gradient-to-r from-[#B98252] to-[#C9A46A] text-[#241711] shadow-md'
                      : 'text-[#F5EBDD]/70 hover:text-[#FFF9F1]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Active Roast Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-1">
              <span className="text-xs text-[#B98252] uppercase tracking-wider">Target Profile</span>
              <p className="font-serif text-xl font-bold text-[#FFF9F1]">{activeRoast.name}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#B98252] uppercase tracking-wider">Roast Duration & Heat</span>
              <p className="text-sm font-medium text-[#F5EBDD]">
                Temp: <span className="text-[#C9A46A]">{activeRoast.temp}</span> | Duration: <span className="text-[#C9A46A]">{activeRoast.time}</span>
              </p>
              <p className="text-xs text-[#F5EBDD]/70">{activeRoast.notes}</p>
            </div>

            <div>
              <span className="text-xs text-[#B98252] uppercase tracking-wider block mb-2">Aroma Highlights</span>
              <div className="flex flex-wrap gap-2">
                {activeRoast.flavorHighlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-3 py-1 rounded-md bg-[#241711] border border-[#C9A46A]/30 text-xs text-[#C9A46A] font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
