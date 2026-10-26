import React from 'react';
import { SPECIALTY_ITEMS } from '../data/cafeData';
import { SpecialtyItem } from '../types';
import { Clock, Coffee, Plus } from 'lucide-react';

interface SpecialtiesSectionProps {
  onAddSpecialty: (item: SpecialtyItem) => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({ onAddSpecialty }) => {
  return (
    <section id="specialties" className="py-24 bg-[#241711] text-[#FFF9F1] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs tracking-[0.3em] text-[#C9A46A] uppercase font-semibold">
            Haute Patisserie & Boulangerie
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFF9F1]">
            Our Artisan Specialties
          </h2>
          <p className="text-[#F5EBDD]/80 text-base max-w-xl mx-auto font-light">
            Hand-crafted in house by our master French pastry chefs using AOP Charentes butter, Valrhona grand cru cacao, and Bronte pistachios.
          </p>
          <div className="w-16 h-[2px] bg-[#C9A46A] mx-auto" />
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {SPECIALTY_ITEMS.map((item, index) => {
            // Asymmetrical layout span assignments:
            // Item 0 (Croissant): 7 columns
            // Item 1 (Pistachio Tart): 5 columns
            // Item 2 (Chocolate Souffle): 5 columns
            // Item 3 (Almond Danish): 7 columns
            const colSpan =
              index === 0
                ? 'md:col-span-7'
                : index === 1
                ? 'md:col-span-5'
                : index === 2
                ? 'md:col-span-5'
                : 'md:col-span-7';

            return (
              <div
                key={item.id}
                className={`${colSpan} group rounded-3xl bg-[#4A2C20]/30 border border-[#C9A46A]/20 overflow-hidden flex flex-col justify-between hover:border-[#C9A46A]/60 transition-all duration-500 espresso-card-glow hover:-translate-y-1.5`}
              >
                {/* Image & Overlay */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#241711]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241711] via-[#241711]/40 to-transparent" />

                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 font-serif font-bold text-xl text-[#FFF9F1] px-4 py-1.5 rounded-xl bg-[#241711]/80 backdrop-blur-md border border-[#C9A46A]/30 tabular-nums">
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Preparation Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-[#241711]/80 backdrop-blur-md border border-[#C9A46A]/30 text-[10px] tracking-wider uppercase text-[#C9A46A] font-medium flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{item.prepTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF9F1] group-hover:text-[#C9A46A] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#F5EBDD]/80 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Coffee Pairing Guide */}
                  <div className="p-3 rounded-xl bg-[#241711]/60 border border-[#4A2C20] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#C9A46A]">
                      <Coffee className="w-4 h-4 shrink-0" />
                      <span className="font-medium text-[11px] uppercase tracking-wider">Suggested Pairing:</span>
                    </div>
                    <span className="text-[#F5EBDD] font-serif italic text-sm">{item.pairing}</span>
                  </div>

                  {/* Add Specialty to Order */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex gap-2">
                      {item.allergens.map((allergen) => (
                        <span key={allergen} className="text-[10px] text-[#F5EBDD]/50">
                          Contains {allergen}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => onAddSpecialty(item)}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B98252] to-[#C9A46A] text-[#241711] font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md shadow-[#B98252]/20"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Order</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
