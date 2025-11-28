'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Play, Eye, Grid3X3 } from 'lucide-react';
import { Property } from '@/types';

interface PropertyGalleryProps {
  property: Property;
  locale: string;
}

export default function PropertyGallery({ property, locale }: PropertyGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = property.images || [];
  
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="h-96 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {/* Main Gallery Grid */}
        <div className="grid grid-cols-4 gap-2 h-64 md:h-80 lg:h-96">
          {/* Main Image */}
          <div className="col-span-4 md:col-span-2 relative">
            {(images[selectedImageIndex]?.url || images[0].url).startsWith('http://') || (images[selectedImageIndex]?.url || images[0].url).startsWith('https://') ? (
              <img
                src={images[selectedImageIndex]?.url || images[0].url}
                alt={images[selectedImageIndex]?.alt || images[0].alt}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openLightbox(selectedImageIndex)}
              />
            ) : (
              <Image
                src={images[selectedImageIndex]?.url || images[0].url}
                alt={images[selectedImageIndex]?.alt || images[0].alt}
                fill
                className="object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openLightbox(selectedImageIndex)}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>

          {/* Thumbnail Grid */}
          <div className="col-span-4 md:col-span-2 grid grid-cols-2 gap-2">
            {images.slice(1, 5).map((image, index) => (
              <div
                key={image.id}
                className="relative cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedImageIndex(index + 1)}
              >
                {image.url.startsWith('http://') || image.url.startsWith('https://') ? (
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
                {index === 3 && images.length > 5 && (
                  <div 
                    className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(0);
                    }}
                  >
                    <Grid3X3 className="w-6 h-6 mr-2" />
                    +{images.length - 4} photos
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Controls */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {property.videoUrl && (
            <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Video Tour</span>
            </button>
          )}
          {property.matterportUrl && (
            <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Virtual Tour</span>
            </button>
          )}
          <button
            onClick={() => openLightbox(0)}
            className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors flex items-center space-x-2"
          >
            <Grid3X3 className="w-4 h-4" />
            <span>View All ({images.length})</span>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={previousImage}
            className="absolute left-4 text-white hover:text-gray-300 z-10"
            disabled={images.length <= 1}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 z-10"
            disabled={images.length <= 1}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative w-full h-full max-w-4xl max-h-4xl">
            {images[lightboxIndex].url.startsWith('http://') || images[lightboxIndex].url.startsWith('https://') ? (
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

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            <span>{lightboxIndex + 1} / {images.length}</span>
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2 overflow-x-auto max-w-md mx-auto">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setLightboxIndex(index)}
                className={`relative w-16 h-16 flex-shrink-0 ${
                  index === lightboxIndex ? 'ring-2 ring-white' : ''
                }`}
              >
                {image.url.startsWith('http://') || image.url.startsWith('https://') ? (
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
                    sizes="64px"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
