import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/cafeData';
import { MenuItem } from '../types';
import { Sliders, Plus, Check } from 'lucide-react';

interface MenuSectionProps {
  onSelectCustomize: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectCustomize,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Signature Drinks' },
    { id: 'espresso', label: 'Espresso & Pour-Over' },
    { id: 'coldbrew', label: 'Cold Drip & Nitro' },
    { id: 'lattes', label: 'Specialty Lattes' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleQuickAddWithFeedback = (item: MenuItem) => {
    onQuickAdd(item);
    setAddedItemIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== item.id));
    }, 1500);
  };

  return (
    <section id="menu" className="py-24 bg-[#241711] text-[#FFF9F1] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs tracking-[0.3em] text-[#C9A46A] uppercase font-semibold">
            Signature Beverage Collection
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFF9F1]">
            Curated Artisanal Coffee
          </h2>
          <p className="text-[#F5EBDD]/80 text-base max-w-xl mx-auto font-light">
            Each coffee item is masterfully extracted to highlight its native terroirs. Select any beverage to customize roast, milk, and flavor infusions.
          </p>
          <div className="w-16 h-[2px] bg-[#C9A46A] mx-auto" />
        </div>

        {/* Category Filters - Interactive Buttons */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#B98252] to-[#C9A46A] text-[#241711] shadow-lg shadow-[#B98252]/20'
                  : 'bg-[#4A2C20]/40 text-[#F5EBDD]/70 border border-[#4A2C20] hover:border-[#C9A46A]/40 hover:text-[#FFF9F1]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item) => {
            const isJustAdded = addedItemIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="group rounded-2xl bg-[#4A2C20]/30 border border-[#C9A46A]/20 overflow-hidden flex flex-col justify-between hover:border-[#C9A46A]/60 transition-all duration-500 hover:-translate-y-1.5 espresso-card-glow"
              >
                <div>
                  {/* Image Slot */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#241711]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#241711] via-transparent to-transparent opacity-80" />

                    {/* Roast Tag - Clean Unboxed Metadata */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#241711]/80 backdrop-blur-md border border-[#C9A46A]/30 text-[10px] tracking-wider uppercase text-[#C9A46A] font-medium">
                      {item.roastLevel} Roast
                    </div>

                    {/* Price Tag */}
                    <div className="absolute top-3 right-3 font-serif font-bold text-lg text-[#FFF9F1] px-3 py-1 rounded-md bg-[#241711]/80 backdrop-blur-md border border-[#C9A46A]/30 tabular-nums">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-6 space-y-3">
                    {item.origin && (
                      <span className="text-[11px] text-[#B98252] tracking-widest uppercase block font-medium">
                        {item.origin}
                      </span>
                    )}

                    <h3 className="font-serif text-2xl font-bold text-[#FFF9F1] group-hover:text-[#C9A46A] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-xs text-[#F5EBDD]/80 leading-relaxed font-light line-clamp-3">
                      {item.description}
                    </p>

                    {/* Tasting Notes */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {item.tastingNotes.map((note) => (
                        <span
                          key={note}
                          className="text-[10px] text-[#F5EBDD]/60 bg-[#241711]/60 px-2 py-0.5 rounded border border-[#4A2C20]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2 mt-auto">
                  <button
                    onClick={() => onSelectCustomize(item)}
                    className="w-full py-2.5 rounded-xl border border-[#C9A46A]/40 bg-[#241711]/60 text-[#F5EBDD] hover:bg-[#C9A46A]/10 hover:border-[#C9A46A] transition-colors text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#C9A46A]" />
                    <span>Customize</span>
                  </button>

                  <button
                    onClick={() => handleQuickAddWithFeedback(item)}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-[#B98252] to-[#C9A46A] text-[#241711] hover:brightness-110'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Quick Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
