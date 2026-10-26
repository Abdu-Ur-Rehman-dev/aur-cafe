import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Twitter, Check } from 'lucide-react';

export const ContactFooter: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Private Cupping Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', subject: 'Private Cupping Inquiry', message: '' });
    }, 4000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer id="contact" className="bg-[#241711] text-[#FFF9F1] pt-24 pb-12 relative overflow-hidden border-t border-[#C9A46A]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 space-y-20">
        {/* Contact Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs tracking-[0.3em] text-[#C9A46A] uppercase font-semibold">
                Sanctuary Concierge
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFF9F1]">
                Visit Our Atelier
              </h2>
              <p className="text-[#F5EBDD]/80 text-sm font-light leading-relaxed">
                Whether seeking a private coffee cupping session, corporate event catering, or a slow morning espresso, our sommelier team awaits.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#4A2C20]/20 border border-[#4A2C20] flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-[#241711] text-[#C9A46A] border border-[#C9A46A]/30 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#FFF9F1]">Flagship Location</h4>
                  <p className="text-xs text-[#F5EBDD]/80 mt-0.5">742 Fifth Avenue, Manhattan, NY 10019</p>
                  <p className="text-[10px] text-[#C9A46A] mt-1 uppercase tracking-wider">
                    Valet Parking Available
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#4A2C20]/20 border border-[#4A2C20] flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-[#241711] text-[#C9A46A] border border-[#C9A46A]/30 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#FFF9F1]">Opening Hours</h4>
                  <div className="text-xs text-[#F5EBDD]/80 mt-0.5 space-y-0.5">
                    <p>Monday – Friday: 07:00 AM – 09:00 PM</p>
                    <p>Saturday – Sunday: 08:00 AM – 10:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#4A2C20]/20 border border-[#4A2C20] flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-[#241711] text-[#C9A46A] border border-[#C9A46A]/30 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#FFF9F1]">Concierge Direct</h4>
                  <p className="text-xs text-[#F5EBDD]/80 mt-0.5">concierge@lelixir-atelier.com</p>
                  <p className="text-xs text-[#F5EBDD]/80">+1 (212) 555-0198</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 rounded-3xl bg-[#4A2C20]/30 border border-[#C9A46A]/20 p-8 sm:p-10 espresso-card-glow space-y-6">
            <div>
              <span className="text-xs text-[#B98252] uppercase tracking-widest font-semibold">Inquiries & Event Catering</span>
              <h3 className="font-serif text-2xl font-bold text-[#FFF9F1]">Send a Message</h3>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#B98252]/20 border border-[#C9A46A] text-center space-y-2 animate-in fade-in">
                <Check className="w-8 h-8 text-[#C9A46A] mx-auto" />
                <h4 className="font-serif text-xl font-bold text-[#FFF9F1]">Message Received</h4>
                <p className="text-xs text-[#F5EBDD]/80">
                  Thank you, {formState.name}. Our maître d' will respond within two hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-medium block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lady Vivienne"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241711] border border-[#4A2C20] text-xs text-[#FFF9F1] focus:outline-none focus:border-[#C9A46A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-medium block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vivienne@atelier.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241711] border border-[#4A2C20] text-xs text-[#FFF9F1] focus:outline-none focus:border-[#C9A46A]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-medium block">
                    Inquiry Topic
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#241711] border border-[#4A2C20] text-xs text-[#FFF9F1] focus:outline-none focus:border-[#C9A46A]"
                  >
                    <option value="Private Cupping Inquiry">Private Coffee Cupping Session</option>
                    <option value="Event Catering">Corporate Event & Private Catering</option>
                    <option value="Wholesale Micro-Lots">Wholesale Roasted Bean Supply</option>
                    <option value="General Concierge">General Concierge Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#C9A46A] tracking-wider uppercase font-medium block">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your upcoming occasion or coffee inquiry..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#241711] border border-[#4A2C20] text-xs text-[#FFF9F1] focus:outline-none focus:border-[#C9A46A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#B98252] to-[#C9A46A] text-[#241711] font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Newsletter & Gazette Signup */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#4A2C20]/40 border border-[#C9A46A]/30 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs text-[#C9A46A] uppercase tracking-widest font-semibold">
              The L'Élixir Gazette
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#FFF9F1]">
              Private Harvest Notifications
            </h3>
            <p className="text-xs text-[#F5EBDD]/80 font-light">
              Receive exclusive invitations to rare micro-lot coffee drops, seasonal patisserie releases, and private cupping events.
            </p>
          </div>

          {newsletterSubscribed ? (
            <div className="p-4 rounded-2xl bg-[#B98252]/20 border border-[#C9A46A] text-xs text-[#C9A46A] max-w-md mx-auto font-medium">
              You are now subscribed to The L'Élixir Gazette. Welcome.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-[#241711] border border-[#4A2C20] text-xs text-[#FFF9F1] focus:outline-none focus:border-[#C9A46A]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#C9A46A] text-[#241711] font-bold text-xs tracking-widest uppercase hover:bg-[#FFF9F1] transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-[#4A2C20] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5EBDD]/60">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-base text-[#FFF9F1]">L'ÉLIXIR ATELIER</span>
            <span className="text-[#4A2C20]">|</span>
            <span>© {new Date().getFullYear()} All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#C9A46A] transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#C9A46A] transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#C9A46A] transition-colors"><Twitter className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
