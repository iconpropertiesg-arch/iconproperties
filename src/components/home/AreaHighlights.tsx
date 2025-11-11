'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, MapPin } from 'lucide-react';

interface AreaHighlightsProps {
  locale: string;
}

const areas = [
  {
    name: 'Portals Nous',
    slug: 'portals-nous',
    image: '/areas/portals-nous.jpg',
    caption: 'Luxury marina living with world-class dining',
    properties: 45
  },
  {
    name: 'Puerto de Andratx',
    slug: 'puerto-de-andratx',
    image: '/areas/puerto-andratx.jpg',
    caption: 'Picturesque fishing village turned luxury haven',
    properties: 32
  },
  {
    name: 'Santa Ponsa',
    slug: 'santa-ponsa',
    image: '/areas/santa-ponsa.jpg',
    caption: 'Golf courses and pristine beaches',
    properties: 28
  },
  {
    name: 'Deià',
    slug: 'deia',
    image: '/areas/deia.jpg',
    caption: 'Mountain village with artistic heritage',
    properties: 18
  }
];

export default function AreaHighlights({ locale }: AreaHighlightsProps) {
  const t = useTranslations();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('home.areas.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover Mallorca's most desirable locations, each offering unique lifestyle experiences 
            and exceptional real estate opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/${locale}/areas/${area.slug}`}
              className="group block relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Image
                src={area.image}
                alt={area.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="mb-3">
                  <div className="flex items-center space-x-2 text-sm text-white/80 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{area.properties} properties</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{area.name}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {area.caption}
                  </p>
                </div>
                
                <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
                  <span>Explore area</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
              
              {/* Hover effect border */}
              <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/areas`}
            className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors smooth-elevation"
          >
            {t('home.areas.cta')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
