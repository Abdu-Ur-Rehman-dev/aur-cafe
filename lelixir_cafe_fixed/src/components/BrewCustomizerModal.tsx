import React, { useState, useEffect } from 'react';
import { MenuItem, CustomBrewOptions } from '../types';
import { X, Check, Coffee, Sparkles } from 'lucide-react';

interface BrewCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, customOptions: CustomBrewOptions, totalPrice: number) => void;
}

export const BrewCustomizerModal: React.FC<BrewCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [milk, setMilk] = useState<CustomBrewOptions['milk']>('Oat Milk');
  const [shots, setShots] = useState<number>(2);
  const [sweetness, setSweetness] = useState<number>(item.sweetnessDefault ?? 50);
  const [syrup, setSyrup] = useState<CustomBrewOptions['syrup']>('Bourbon Vanilla');
  const [temperature, setTemperature] = useState<CustomBrewOptions['temperature']>('Hot');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // Calculate price additions
  const shotPriceExtra = shots > 2 ? (shots - 2) * 1.5 : 0;
  const syrupPriceExtra = syrup !== 'None' ? 1.0 : 0;
  const totalPrice = item.price + shotPriceExtra + syrupPriceExtra;

  const handleConfirm = () => {
    onAddToCart(
      item,
      {
        milk,
        shots,
        sweetness,
        syrup,
        temperature,
        specialNotes,
      },
      totalPrice
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#241711] border border-[#C9A46A]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-[#4A2C20] text-[#F5EBDD] hover:border-[#C9A46A] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 border-b border-[#4A2C20] pb-6">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 rounded-2xl object-cover border border-[#C9A46A]/30 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <span className="text-[10px] text-[#B98252] uppercase tracking-widest font-semibold block">
              Custom Brew Atelier
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#FFF9F1]">{item.name}</h3>
            <p className="text-xs text-[#F5EBDD]/70 mt-1">{item.description}</p>
          </div>
        </div>

        {/* Customization Options */}
        <div className="space-y-5 max-h-[50vh] overflow-y-auto pr-2">
          {/* Temperature Choice */}
          <div className="space-y-2">
            <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-semibold block">
              Serving Temperature
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Hot', 'Iced', 'Extra Hot'] as const).map((temp) => (
                <button
                  key={temp}
                  onClick={() => setTemperature(temp)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    temperature === temp
                      ? 'bg-[#B98252] text-[#241711] border-[#C9A46A]'
                      : 'bg-[#4A2C20]/30 text-[#F5EBDD] border-[#4A2C20] hover:border-[#C9A46A]/30'
                  }`}
                >
                  {temp}
                </button>
              ))}
            </div>
          </div>

          {/* Milk Selection */}
          <div className="space-y-2">
            <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-semibold block">
              Organic Milk / Dairy
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(
                [
                  'Oat Milk',
                  'Almond Milk',
                  'Macadamia Milk',
                  'Whole Milk',
                  'Whole Cream',
                  'None',
                ] as const
              ).map((m) => (
                <button
                  key={m}
                  onClick={() => setMilk(m)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                    milk === m
                      ? 'bg-[#B98252] text-[#241711] border-[#C9A46A] font-bold'
                      : 'bg-[#4A2C20]/30 text-[#F5EBDD] border-[#4A2C20] hover:border-[#C9A46A]/30'
                  }`}
                >
                  <span>{m}</span>
                  {milk === m && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Espresso Shots */}
          <div className="space-y-2">
            <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-semibold flex items-center justify-between">
              <span>Espresso Shots</span>
              <span className="text-[11px] text-[#F5EBDD]/60 font-normal">
                {shots === 1 ? 'Single Shot' : shots === 2 ? 'Double Ristretto (Standard)' : 'Triple Shot (+$1.50)'}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  onClick={() => setShots(s)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    shots === s
                      ? 'bg-[#B98252] text-[#241711] border-[#C9A46A]'
                      : 'bg-[#4A2C20]/30 text-[#F5EBDD] border-[#4A2C20]'
                  }`}
                >
                  {s === 1 ? '1 Shot' : s === 2 ? '2 Shots' : '3 Shots (+$1.50)'}
                </button>
              ))}
            </div>
          </div>

          {/* Sweetness Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-semibold">
                Sweetness Level
              </label>
              <span className="text-xs text-[#FFF9F1] font-bold">{sweetness}%</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[0, 25, 50, 75, 100].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSweetness(lvl)}
                  className={`py-1.5 rounded-lg text-xs font-medium border text-center transition-all ${
                    sweetness === lvl
                      ? 'bg-[#C9A46A] text-[#241711] border-[#C9A46A] font-bold'
                      : 'bg-[#4A2C20]/20 text-[#F5EBDD]/70 border-[#4A2C20]'
                  }`}
                >
                  {lvl}%
                </button>
              ))}
            </div>
          </div>

          {/* Artisanal Syrup Infusion */}
          <div className="space-y-2">
            <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-semibold block">
              Artisanal Syrup Infusion (+$1.00)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  'None',
                  'Bourbon Vanilla',
                  'Raw Honey Caramel',
                  'Dark Hazelnut',
                  'Cardamom Spice',
                ] as const
              ).map((s) => (
                <button
                  key={s}
                  onClick={() => setSyrup(s)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                    syrup === s
                      ? 'bg-[#B98252] text-[#241711] border-[#C9A46A] font-bold'
                      : 'bg-[#4A2C20]/30 text-[#F5EBDD] border-[#4A2C20] hover:border-[#C9A46A]/30'
                  }`}
                >
                  <span>{s}</span>
                  {syrup === s && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Special Notes Input */}
          <div className="space-y-2">
            <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-semibold block">
              Special Barista Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Extra hot, light foam, separate cup..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#4A2C20]/30 border border-[#4A2C20] text-xs text-[#FFF9F1] focus:outline-none focus:border-[#C9A46A]"
            />
          </div>
        </div>

        {/* Footer & Add to Cart Button */}
        <div className="border-t border-[#4A2C20] pt-6 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#F5EBDD]/70 block">Total Unit Price</span>
            <span className="font-serif text-3xl font-bold text-[#C9A46A] tabular-nums">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleConfirm}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B98252] to-[#C9A46A] text-[#241711] font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-[#B98252]/20"
          >
            <Coffee className="w-4 h-4" />
            <span>Add Custom Brew</span>
          </button>
        </div>
      </div>
    </div>
  );
};
