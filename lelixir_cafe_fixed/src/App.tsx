import React, { useState } from 'react';
import { MenuItem, CustomBrewOptions, CartItem, SpecialtyItem, OriginBean } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutCraft } from './components/AboutCraft';
import { MenuSection } from './components/MenuSection';
import { BrewCustomizerModal } from './components/BrewCustomizerModal';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { OriginExplorer } from './components/OriginExplorer';
import { GallerySection } from './components/GallerySection';
import { ReservationModal } from './components/ReservationModal';
import { CartDrawer } from './components/CartDrawer';
import { ContactFooter } from './components/ContactFooter';
import { AudioAmbiancePlayer } from './components/AudioAmbiancePlayer';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Cart total count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Add Item to Cart (handling custom options)
  const handleAddCustomToCart = (
    item: MenuItem,
    customOptions: CustomBrewOptions,
    unitPrice: number
  ) => {
    const cartItemId = `${item.id}-${customOptions.milk}-${customOptions.shots}-${customOptions.sweetness}-${customOptions.syrup}-${customOptions.temperature}`;

    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItem: item,
          customOptions,
          quantity: 1,
          unitPrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  // Quick Add Standard Item
  const handleQuickAdd = (item: MenuItem) => {
    const cartItemId = `standard-${item.id}`;
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItem: item,
          quantity: 1,
          unitPrice: item.price,
        },
      ];
    });
  };

  // Add Specialty Item
  const handleAddSpecialty = (specialty: SpecialtyItem) => {
    const cartItemId = `specialty-${specialty.id}`;
    const menuItemRepresentation: MenuItem = {
      id: specialty.id,
      name: specialty.name,
      category: 'espresso',
      price: specialty.price,
      description: specialty.description,
      image: specialty.image,
      roastLevel: 'Medium',
      tastingNotes: [specialty.pairing],
    };

    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItem: menuItemRepresentation,
          quantity: 1,
          unitPrice: specialty.price,
        },
      ];
    });

    setIsCartOpen(true);
  };

  // Add Bean Bag
  const handleAddBeanBag = (bean: OriginBean) => {
    const cartItemId = `bean-${bean.id}`;
    const menuItemRepresentation: MenuItem = {
      id: bean.id,
      name: `${bean.name} (250g Whole Bean)`,
      category: 'beans',
      price: bean.pricePer250g,
      description: bean.description,
      image: bean.image,
      roastLevel: 'Medium',
      tastingNotes: bean.tastingNotes,
    };

    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItem: menuItemRepresentation,
          quantity: 1,
          unitPrice: bean.pricePer250g,
        },
      ];
    });

    setIsCartOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove Item
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== id));
  };

  // Clear Cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Smooth Navigation
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#241711] text-[#FFF9F1] font-sans antialiased relative">
      {/* Audio Ambiance Player */}
      <AudioAmbiancePlayer isPlaying={isAudioPlaying} />

      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReserve={() => setIsReserveOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
      />

      {/* Hero Section */}
      <Hero
        onExploreMenu={() => scrollToSection('menu')}
        onDiscoverMore={() => scrollToSection('about')}
      />

      {/* About & Craftsmanship */}
      <AboutCraft />

      {/* Signature Coffee Collection */}
      <MenuSection
        onSelectCustomize={(item) => setCustomizingItem(item)}
        onQuickAdd={handleQuickAdd}
      />

      {/* Custom Brew Modal */}
      <BrewCustomizerModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddCustomToCart}
      />

      {/* Our Specialties — French Patisserie */}
      <SpecialtiesSection onAddSpecialty={handleAddSpecialty} />

      {/* Origin & Roastery Bag Explorer */}
      <OriginExplorer onAddBeanBag={handleAddBeanBag} />

      {/* Café Atmosphere Gallery */}
      <GallerySection />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
      />

      {/* Slide-over Order Tray Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Contact & Footer */}
      <ContactFooter />
    </div>
  );
}
