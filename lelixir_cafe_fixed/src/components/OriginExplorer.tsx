import React, { useState } from 'react';
import { ORIGIN_BEANS } from '../data/cafeData';
import { OriginBean } from '../types';
import { Globe, Mountain, Sparkles, ShoppingBag, Check } from 'lucide-react';

interface OriginExplorerProps {
  onAddBeanBag: (bean: OriginBean) => void;
}

export const OriginExplorer: React.FC<OriginExplorerProps> = ({ onAddBeanBag }) => {
  const [selectedBeanId, setSelectedBeanId] = useState<string>(ORIGIN_BEANS[0].id);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const selectedBean = ORIGIN_BEANS.find((b) => b.id === selectedBeanId) || ORIGIN_BEANS[0];

  const handleAddBeanBagWithFeedback = () => {
    onAddBeanBag(selectedBean);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const flavorMetrics = [
    { key: 'acidity', label: 'Sparkling Acidity', val: selectedBean.flavorProfile.acidity },
    { key: 'body', label: 'Mouthfeel & Body', val: selectedBean.flavorProfile.body },
    { key: 'sweetness', label: 'Caramel Sweetness', val: selectedBean.flavorProfile.sweetness },
    { key: 'floral', label: 'Floral Aromatics', val: selectedBean.flavorProfile.floral },
    { key: 'nutty', label: 'Cacao & Nutty', val: selectedBean.flavorProfile.nutty },
  ];

  return (
    <section id="origins" className="py-24 bg-[#241711] text-[#FFF9F1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs tracking-[0.3em] text-[#C9A46A] uppercase font-semibold">
            Micro-Lot Origin Terroirs
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFF9F1]">
            Single-Origin Roastery Bags
          </h2>
          <p className="text-[#F5EBDD]/80 text-base max-w-xl mx-auto font-light">
            Take home freshly flame-roasted whole beans in nitrogen-flushed, sealed valve bags.
          </p>
          <div className="w-16 h-[2px] bg-[#C9A46A] mx-auto" />
        </div>

        {/* Origin Selector Segmented Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {ORIGIN_BEANS.map((bean) => (
            <button
              key={bean.id}
              onClick={() => setSelectedBeanId(bean.id)}
              className={`p-6 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between ${
                selectedBeanId === bean.id
                  ? 'bg-[#4A2C20] border-[#C9A46A] shadow-xl ring-1 ring-[#C9A46A]/50'
                  : 'bg-[#4A2C20]/20 border-[#4A2C20] hover:border-[#C9A46A]/40'
              }`}
            >
              <div>
                <span className="text-[10px] text-[#B98252] uppercase tracking-widest font-semibold block">
                  {bean.country}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#FFF9F1] mt-0.5">{bean.name}</h3>
                <p className="text-xs text-[#F5EBDD]/60 mt-1">{bean.region}</p>
              </div>
              <span className="font-serif font-bold text-lg text-[#C9A46A] tabular-nums">
                ${bean.pricePer250g.toFixed(2)}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Origin Deep Dive Card */}
        <div className="rounded-3xl bg-[#4A2C20]/30 border border-[#C9A46A]/30 p-8 sm:p-12 espresso-card-glow grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image & Stats */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C9A46A]/20">
              <img
                src={selectedBean.image}
                alt={selectedBean.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241711] via-transparent to-transparent opacity-70" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#241711]/60 border border-[#4A2C20] space-y-1">
                <div className="flex items-center gap-2 text-[#C9A46A] text-xs">
                  <Mountain className="w-4 h-4" />
                  <span className="uppercase tracking-wider">Altitude</span>
                </div>
                <p className="font-serif text-lg font-bold text-[#FFF9F1]">{selectedBean.altitude}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#241711]/60 border border-[#4A2C20] space-y-1">
                <div className="flex items-center gap-2 text-[#C9A46A] text-xs">
                  <Globe className="w-4 h-4" />
                  <span className="uppercase tracking-wider">Process</span>
                </div>
                <p className="font-serif text-lg font-bold text-[#FFF9F1]">{selectedBean.process}</p>
              </div>
            </div>
          </div>

          {/* Details & Flavor Radar Bars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#C9A46A] text-xs tracking-widest uppercase font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Single Estate Reserve</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFF9F1]">
                {selectedBean.name}
              </h3>
              <p className="text-sm text-[#F5EBDD]/80 leading-relaxed font-light">
                {selectedBean.description}
              </p>
            </div>

            {/* Tasting Notes Pills */}
            <div className="space-y-2">
              <span className="text-xs text-[#B98252] uppercase tracking-wider block font-semibold">
                Primary Flavor Notes
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedBean.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="px-4 py-1.5 rounded-full bg-[#241711] border border-[#C9A46A]/40 text-xs text-[#C9A46A] font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Flavor Spectrum Bars */}
            <div className="space-y-3 pt-2">
              <span className="text-xs text-[#B98252] uppercase tracking-wider block font-semibold">
                Cup Profile Spectrum (1–10 Scale)
              </span>

              <div className="space-y-2.5">
                {flavorMetrics.map((fm) => (
                  <div key={fm.key} className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-[#F5EBDD]/80">
                      <span>{fm.label}</span>
                      <span className="text-[#C9A46A] font-bold">{fm.val}/10</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#241711] overflow-hidden border border-[#4A2C20]">
                      <div
                        className="h-full bg-gradient-to-r from-[#B98252] to-[#C9A46A] rounded-full transition-all duration-700"
                        style={{ width: `${fm.val * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Bean Bag Action */}
            <div className="pt-4 flex items-center justify-between gap-6 border-t border-[#4A2C20]">
              <div>
                <span className="text-xs text-[#F5EBDD]/70 block">Whole Bean 250g Valve Bag</span>
                <span className="font-serif text-3xl font-bold text-[#C9A46A] tabular-nums">
                  ${selectedBean.pricePer250g.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleAddBeanBagWithFeedback}
                className={`px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 shadow-lg ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-[#B98252] to-[#C9A46A] text-[#241711] hover:brightness-110 shadow-[#B98252]/20'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order 250g Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
