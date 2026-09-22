import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { GalleryImage } from '../../types';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const currentImage = images[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !currentImage) return null;

  return (
    <div className="fixed inset-0 z-50 bg-emerald-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-ivory-500 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full">
            {currentImage.category}
          </span>
          <span className="text-xs text-ivory-700">
            {currentIndex + 1} of {images.length}
          </span>
        </div>
        
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-emerald-900/80 hover:bg-gold-600 text-ivory-500 hover:text-emerald-950 border border-gold-500/30 transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Prev Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 z-10 p-3 rounded-full bg-emerald-900/80 hover:bg-gold-600 text-ivory-500 hover:text-emerald-950 border border-gold-500/30 transition-all hover:scale-105"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* The Image */}
        <div className="max-w-5xl max-h-[75vh] flex flex-col items-center">
          <img
            src={currentImage.imageUrl}
            alt={currentImage.title}
            className="max-h-[65vh] w-auto object-contain rounded-xl border border-gold-500/30 shadow-2xl"
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-10 p-3 rounded-full bg-emerald-900/80 hover:bg-gold-600 text-ivory-500 hover:text-emerald-950 border border-gold-500/30 transition-all hover:scale-105"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Caption & Metadata Footer */}
      <div className="max-w-3xl mx-auto text-center text-ivory-500 z-10">
        <h3 className="font-heading text-lg sm:text-2xl font-semibold text-ivory-500 mb-1">
          {currentImage.title}
        </h3>
        <p className="text-base sm:text-lg text-ivory-700 leading-relaxed mb-2">
          {currentImage.caption}
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-gold-400">
          {currentImage.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gold-500" />
              {currentImage.location}
            </span>
          )}
          {currentImage.date && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gold-500" />
              {currentImage.date}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
