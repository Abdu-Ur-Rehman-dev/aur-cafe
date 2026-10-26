import React, { useState } from 'react';
import { ReservationData } from '../types';
import { X, Calendar, Clock, Users, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:30 PM',
    guests: 2,
    experienceType: 'Chef Tasting Bar',
    specialRequests: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmed');
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#B98252', '#C9A46A', '#FFF9F1'],
      });
    } catch {
      // fallback
    }
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#241711] border border-[#C9A46A]/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 my-8 my-auto">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-6 right-6 p-2 rounded-full border border-[#4A2C20] text-[#F5EBDD] hover:border-[#C9A46A] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <>
            <div className="space-y-2 border-b border-[#4A2C20] pb-6">
              <div className="flex items-center gap-2 text-xs text-[#C9A46A] tracking-widest uppercase font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Sanctuary Table Booking</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#FFF9F1]">
                Reserve Your Tasting Experience
              </h3>
              <p className="text-xs text-[#F5EBDD]/70 font-light">
                Secure a private seating area or chef's tasting bar position at L'Élixir Atelier.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Experience Type */}
              <div className="space-y-2">
                <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-semibold block">
                  Select Experience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(
                    ['Standard Table', 'Chef Tasting Bar', 'Private Roastery Lounge'] as const
                  ).map((exp) => (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => setFormData({ ...formData, experienceType: exp })}
                      className={`p-3 rounded-xl text-xs font-semibold border text-left transition-all ${
                        formData.experienceType === exp
                          ? 'bg-[#B98252] text-[#241711] border-[#C9A46A] font-bold shadow-md'
                          : 'bg-[#4A2C20]/30 text-[#F5EBDD] border-[#4A2C20] hover:border-[#C9A46A]/40'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date, Time, Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-semibold block flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#4A2C20]/40 border border-[#4A2C20] text-xs text-[#FFF9F1] focus:outline-none focus:border-[#C9A46A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-semibold block flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Time</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#4A2C20]/40 border border-[#4A2C20] text-xs text-[#FFF9F1] focus:outline-none focus:border-[#C9A46A]"
                  >
                    <option value="08:00 AM">08:00 AM — Morning Brew</option>
                    <option value="10:30 AM">10:30 AM — Dawn Patisserie</option>
                    <option value="12:30 PM">12:30 PM — Midday Tasting</option>
                    <option value="04:00 PM">04:00 PM — Afternoon Lounge</option>
                    <option value="07:30 PM">07:30 PM — Evening Cupping</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-semibold block flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Guests</span>
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#4A2C20]/40 border border-[#4A2C20] text-xs text-[#FFF9F1] focus:outline-none focus:border-[#C9A46A]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-semibold block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Alistair Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#4A2C20]/40 border border-[#4A2C20] text-xs text-[#FFF9F1] focus:outline-none focus:border-[#C9A46A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-semibold block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vance@luxury.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#4A2C20]/40 border border-[#4A2C20] text-xs text-[#FFF9F1] focus:outline-none focus:border-[#C9A46A]"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-semibold block">
                  Dietary / Seating Requests
                </label>
                <input
                  type="text"
                  placeholder="e.g. Window nook preferred, gluten-free pastry request..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#4A2C20]/40 border border-[#4A2C20] text-xs text-[#FFF9F1] focus:outline-none focus:border-[#C9A46A]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#B98252] to-[#C9A46A] text-[#241711] font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all shadow-xl shadow-[#B98252]/20"
              >
                Confirm Table Reservation
              </button>
            </form>
          </>
        ) : (
          /* Confirmation State */
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#B98252]/20 border border-[#C9A46A] text-[#C9A46A] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs text-[#C9A46A] tracking-widest uppercase font-semibold">
                Reservation Confirmed
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#FFF9F1]">
                We Look Forward to Welcoming You
              </h3>
              <p className="text-xs text-[#F5EBDD]/80 max-w-md mx-auto">
                A confirmation concierge receipt has been transmitted to{' '}
                <strong className="text-[#C9A46A]">{formData.email}</strong>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#4A2C20]/40 border border-[#C9A46A]/30 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-[#4A2C20] pb-2">
                <span className="text-[#F5EBDD]/60">Guest Name</span>
                <span className="text-[#FFF9F1] font-semibold">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-[#4A2C20] pb-2">
                <span className="text-[#F5EBDD]/60">Experience</span>
                <span className="text-[#C9A46A] font-semibold">{formData.experienceType}</span>
              </div>
              <div className="flex justify-between border-b border-[#4A2C20] pb-2">
                <span className="text-[#F5EBDD]/60">Date & Time</span>
                <span className="text-[#FFF9F1] font-semibold">
                  {formData.date} at {formData.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5EBDD]/60">Party Size</span>
                <span className="text-[#FFF9F1] font-semibold">{formData.guests} Guests</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full bg-[#4A2C20] text-[#FFF9F1] hover:bg-[#C9A46A] hover:text-[#241711] transition-colors text-xs font-semibold tracking-wider uppercase"
            >
              Close Confirmation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
