'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Bed, Bath, Maximize, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface FeaturedPropertiesProps {
  locale: string;
}

interface Property {
  id: string;
  slug: string;
  title: string;
  area: string;
  price: number;
  beds: number | null;
  baths: number | null;
  size: number | null;
  images: string[];
  type: string;
}

export default function FeaturedProperties({ locale }: FeaturedPropertiesProps) {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch properties from database
  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch(`/api/properties?locale=${locale}&includeTranslations=true`);
        if (response.ok) {
          const data = await response.json();
          
          // Map database properties to component format
          const mappedProperties: Property[] = data.properties
            .filter((p: any) => p.slug && p.translations && p.translations.length > 0) // Only include properties with valid slugs and translations
            .map((property: any) => {
              const translation = property.translations[0];
              const firstImage = property.images && property.images.length > 0 
                ? property.images[0] 
                : '/portfolio/villa-son-vida.jpg'; // Fallback image
              
              // Sanitize slug
              let cleanSlug = property.slug || '';
              if (cleanSlug.includes('://') || cleanSlug.includes('localhost') || cleanSlug.startsWith('http')) {
                const parts = cleanSlug.split('/').filter((p: string) => p);
                cleanSlug = parts[parts.length - 1] || '';
              }
              cleanSlug = cleanSlug.replace(/^https?:\/\//, '').replace(/^www\./, '');
              cleanSlug = cleanSlug
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');

              return {
                id: property.id,
                slug: cleanSlug,
                title: translation?.title || 'Property',
                area: property.location || 'Mallorca',
                price: property.price,
                beds: property.bedrooms,
                baths: property.bathrooms,
                size: property.area,
                images: property.images && property.images.length > 0 ? property.images : [firstImage],
                type: property.type === 'residential' ? 'house' : (property.type || 'house'),
              };
            })
            .filter((p: Property) => p.slug && /^[a-z0-9-]+$/.test(p.slug)); // Only include properties with valid slugs

          // Take up to 6 featured properties (or all if less than 6)
          setProperties(mappedProperties.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [locale]);
  
  // Show 3 cards at a time
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(properties.length / cardsPerSlide);
  
  // Auto-play functionality - slides every 4 seconds
  useEffect(() => {
    if (isPaused || properties.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides, properties.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section 
      className="py-24 bg-gradient-to-br from-gray-900 via-blue-950 to-black relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[150px]"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('home.featuredProperties')}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover our hand-picked selection of exceptional properties in Mallorca's most prestigious locations.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-7xl mx-auto mb-12">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all shadow-2xl hover:shadow-blue-600/50 hover:scale-110"
            aria-label="Previous properties"
          >
            <ChevronLeft className="w-7 h-7 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all shadow-2xl hover:shadow-blue-600/50 hover:scale-110"
            aria-label="Next properties"
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </button>

          {/* Slider Track - Shows 3 cards at once */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)` 
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties
                      .slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide)
                      .map((property) => (
                        <div
                          key={property.id}
                          className="property-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                        >
                          <div className="relative h-64 overflow-hidden">
                            {property.images[0] && (property.images[0].startsWith('http://') || property.images[0].startsWith('https://')) ? (
                              <img
                                src={property.images[0]}
                                alt={property.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                              />
                            ) : (
                              <Image
                                src={property.images[0] || '/portfolio/villa-son-vida.jpg'}
                                alt={property.title}
                                fill
                                className="object-cover transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            )}
                            <div className="absolute top-4 left-4">
                              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                {t(`propertyTypes.${property.type}`) || property.type}
                              </span>
                            </div>
                            <div className="absolute top-4 right-4">
                              <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
                                {formatPrice(property.price, locale)}
                              </span>
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="mb-3">
                              <h3 className="text-xl font-semibold text-white mb-1">
                                {property.title}
                              </h3>
                              <p className="text-gray-400">{property.area}</p>
                            </div>

                            <div className="flex items-center space-x-4 mb-6 text-sm text-gray-400">
                              {property.beds && (
                                <div className="flex items-center space-x-1">
                                  <Bed className="w-4 h-4" />
                                  <span>{property.beds} {t('common.beds')}</span>
                                </div>
                              )}
                              {property.baths && (
                                <div className="flex items-center space-x-1">
                                  <Bath className="w-4 h-4" />
                                  <span>{property.baths} {t('common.baths')}</span>
                                </div>
                              )}
                              {property.size && (
                                <div className="flex items-center space-x-1">
                                  <Maximize className="w-4 h-4" />
                                  <span>{property.size}{t('common.sqm')}</span>
                                </div>
                              )}
                            </div>

                            <Link
                              href={`/${locale}/properties/${property.slug}`}
                              className="inline-flex items-center justify-center w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/30"
                            >
                              {t('common.viewDetails')}
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-8 bg-blue-500' 
                      : 'w-2 bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="text-gray-400 mt-4">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No properties available at the moment.</p>
          </div>
        ) : (
          <div className="text-center mt-12">
            <Link
              href={`/${locale}/properties`}
              className="inline-flex items-center bg-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
            >
              {t('common.exploreAll')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
