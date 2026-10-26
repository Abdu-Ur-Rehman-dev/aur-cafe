import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/cafeData';
import { GalleryItem } from '../types';
import { Camera, X, Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-24 bg-[#241711] text-[#FFF9F1] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs tracking-[0.3em] text-[#C9A46A] uppercase font-semibold">
            Architectural Sanctuary
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFF9F1]">
            Café Atmosphere Gallery
          </h2>
          <p className="text-[#F5EBDD]/80 text-base max-w-xl mx-auto font-light">
            Designed as a quiet haven away from city hustle. Green marble, polished brass, dark leather, and ambient golden light.
          </p>
          <div className="w-16 h-[2px] bg-[#C9A46A] mx-auto" />
        </div>

        {/* Gallery Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-3xl overflow-hidden border border-[#C9A46A]/20 bg-[#4A2C20]/20 cursor-pointer espresso-card-glow aspect-[16/10] flex flex-col justify-end p-8"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241711] via-[#241711]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

              <div className="relative z-10 space-y-1 transform group-hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#C9A46A] tracking-widest uppercase font-semibold px-3 py-1 rounded-md bg-[#241711]/80 border border-[#C9A46A]/30 backdrop-blur-md">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#241711]/80 border border-[#C9A46A]/40 flex items-center justify-center text-[#C9A46A] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#FFF9F1] pt-2">{item.title}</h3>
                <p className="text-xs text-[#F5EBDD]/80 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative max-w-5xl w-full bg-[#241711] border border-[#C9A46A]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#241711]/80 border border-[#4A2C20] text-[#FFF9F1] hover:border-[#C9A46A] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-[16/9] w-full bg-black">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-8 space-y-3 bg-[#241711] border-t border-[#4A2C20]">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-serif text-3xl font-bold text-[#FFF9F1]">{selectedImage.title}</h3>
                <div className="flex items-center gap-2 text-xs text-[#C9A46A]">
                  <Camera className="w-4 h-4" />
                  <span>{selectedImage.cameraInfo}</span>
                </div>
              </div>
              <p className="text-sm text-[#F5EBDD]/80 font-light">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
