'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Play, Eye, Grid3X3, Maximize2 } from 'lucide-react';
import { Property } from '@/types';

interface PropertyGalleryProps {
  property: Property;
  locale: string;
}

export default function PropertyGallery({ property, locale }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = property.images || [];
  
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    goToSlide((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, isTransitioning, goToSlide]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    goToSlide((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, isTransitioning, goToSlide]);

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const previousLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'ArrowLeft') previousLightboxImage();
        if (e.key === 'ArrowRight') nextLightboxImage();
        if (e.key === 'Escape') closeLightbox();
      } else {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, lightboxIndex, images.length]);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      if (isLightboxOpen) nextLightboxImage();
      else nextSlide();
    }
    if (isRightSwipe) {
      if (isLightboxOpen) previousLightboxImage();
      else prevSlide();
    }
  };

  // Auto-play carousel (optional, can be disabled)
  useEffect(() => {
    if (isLightboxOpen) return;
    const interval = setInterval(() => {
      // Auto-advance every 5 seconds (optional)
      // nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isLightboxOpen]);

  if (images.length === 0) {
    return (
      <div className="h-[600px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border border-gray-700">
        <p className="text-gray-400 text-lg">No images available</p>
      </div>
    );
  }

  const isExternalImage = (url: string) => url.startsWith('http://') || url.startsWith('https://');

  return (
    <>
      <div className="relative w-full group">
        {/* Main Carousel Container */}
        <div 
          className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-2xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Image Carousel */}
          <div className="relative w-full h-full">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {isExternalImage(image.url) ? (
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={index === 0}
                  />
                )}
              </div>
            ))}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/10">
              {currentIndex + 1} / {images.length}
            </div>

            {/* View All Button */}
            <button
              onClick={() => openLightbox(currentIndex)}
              className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 border border-white/10 hover:scale-105"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline">View All</span>
            </button>

            {/* Action Buttons */}
            <div className="absolute bottom-4 right-4 z-20 flex flex-col sm:flex-row gap-2">
              {property.videoUrl && (
                <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2.5 rounded-lg font-medium hover:bg-white transition-all duration-300 flex items-center space-x-2 shadow-lg hover:scale-105">
                  <Play className="w-4 h-4" />
                  <span className="hidden sm:inline">Video Tour</span>
                </button>
              )}
              {property.matterportUrl && (
                <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2.5 rounded-lg font-medium hover:bg-white transition-all duration-300 flex items-center space-x-2 shadow-lg hover:scale-105">
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Virtual Tour</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation Strip */}
        {images.length > 1 && (
          <div className="mt-4 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => goToSlide(index)}
                  className={`relative flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? 'ring-2 ring-blue-500 scale-105 shadow-lg shadow-blue-500/50'
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {isExternalImage(image.url) ? (
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  )}
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-blue-500/20" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300"
          style={{ animation: 'fadeIn 0.3s ease-in-out' }}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[110] text-white hover:text-gray-300 transition-colors bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 border border-white/20"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  previousLightboxImage();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-[110] bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightboxImage();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-[110] bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Main Image */}
          <div 
            className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              {isExternalImage(images[lightboxIndex].url) ? (
                <img
                  src={images[lightboxIndex].url}
                  alt={images[lightboxIndex].alt}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={images[lightboxIndex].url}
                  alt={images[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              )}
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full text-base font-medium border border-white/10">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[110] max-w-4xl w-full px-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-center pb-2">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(index);
                    }}
                    className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      index === lightboxIndex
                        ? 'ring-2 ring-blue-500 scale-110'
                        : 'opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    {isExternalImage(image.url) ? (
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
