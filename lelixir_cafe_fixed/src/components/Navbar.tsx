import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShoppingBag, Menu as MenuIcon, X, Calendar } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReserve: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReserve,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Specialties', href: '#specialties' },
    { name: 'Origins', href: '#origins' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#241711]/90 backdrop-blur-md py-4 border-b border-[#C9A46A]/20 shadow-2xl'
          : 'bg-gradient-to-b from-[#241711]/80 via-[#241711]/40 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title */}
        <a href="#" className="group flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-full border border-[#C9A46A]/40 flex items-center justify-center bg-[#4A2C20]/40 group-hover:border-[#C9A46A] transition-colors">
            <span className="font-serif italic text-lg text-[#C9A46A] font-bold">É</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl lg:text-2xl font-bold tracking-wider text-[#FFF9F1] group-hover:text-[#C9A46A] transition-colors whitespace-nowrap">
              L'ÉLIXIR
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#B98252] uppercase font-medium -mt-1">
              Atelier & Café
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase text-[#F5EBDD]/80">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#C9A46A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A46A] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap shrink-0"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions (Audio, Cart, Reserve) */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Audio Ambiance Toggle */}
          <button
            onClick={onToggleAudio}
            className={`p-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 text-xs tracking-wider uppercase ${
              isAudioPlaying
                ? 'border-[#C9A46A] bg-[#B98252]/20 text-[#C9A46A]'
                : 'border-[#4A2C20] bg-[#241711]/60 text-[#F5EBDD]/70 hover:border-[#C9A46A]/50 hover:text-[#FFF9F1]'
            }`}
            title={isAudioPlaying ? 'Mute Ambiance Sound' : 'Play Café Ambiance Sound'}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-[#C9A46A] animate-pulse" />
                <span className="hidden xl:inline text-[11px]">Ambiance On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#F5EBDD]/60" />
                <span className="hidden xl:inline text-[11px]">Ambiance</span>
              </>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full border border-[#4A2C20] bg-[#241711]/60 text-[#FFF9F1] hover:border-[#C9A46A] transition-colors"
            title="View Order"
          >
            <ShoppingBag className="w-5 h-5 text-[#F5EBDD]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#B98252] text-[#241711] text-[11px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Reserve Table CTA Button */}
          <button
            onClick={onOpenReserve}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B98252] to-[#C9A46A] text-[#241711] font-semibold text-xs tracking-widest uppercase hover:brightness-110 transition-all shadow-lg hover:shadow-[#B98252]/30 whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve Table</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#FFF9F1] hover:text-[#C9A46A] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#241711] border-b border-[#C9A46A]/20 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif tracking-wider text-[#F5EBDD] hover:text-[#C9A46A] py-1 border-b border-[#4A2C20]/40"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReserve();
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#B98252] to-[#C9A46A] text-[#241711] font-bold text-xs tracking-widest uppercase text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Table</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
