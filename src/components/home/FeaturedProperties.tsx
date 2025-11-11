'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Bed, Bath, Maximize, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface FeaturedPropertiesProps {
  locale: string;
}

// Mock data - in a real app, this would come from an API
const mockProperties = [
  {
    id: '1',
    title: 'Luxury Villa with Sea Views',
    slug: 'luxury-villa-sea-views-portals-nous',
    area: 'Portals Nous',
    price: 2800000,
    beds: 5,
    baths: 4,
    size: 450,
    images: ['/properties/villa-1.jpg'],
    type: 'villa'
  },
  {
    id: '2',
    title: 'Modern Apartment in Puerto Portals',
    slug: 'modern-apartment-puerto-portals',
    area: 'Puerto Portals',
    price: 1200000,
    beds: 3,
    baths: 2,
    size: 180,
    images: ['/properties/apartment-1.jpg'],
    type: 'apartment'
  },
  {
    id: '3',
    title: 'Contemporary House in Santa Ponsa',
    slug: 'contemporary-house-santa-ponsa',
    area: 'Santa Ponsa',
    price: 1650000,
    beds: 4,
    baths: 3,
    size: 320,
    images: ['/properties/house-1.jpg'],
    type: 'house'
  },
  {
    id: '4',
    title: 'Penthouse with Marina Views',
    slug: 'penthouse-marina-views-port-adriano',
    area: 'Port Adriano',
    price: 3200000,
    beds: 4,
    baths: 4,
    size: 280,
    images: ['/properties/penthouse-1.jpg'],
    type: 'apartment'
  },
  {
    id: '5',
    title: 'Traditional Mallorcan Finca',
    slug: 'traditional-finca-andratx',
    area: 'Andratx',
    price: 4500000,
    beds: 6,
    baths: 5,
    size: 600,
    images: ['/properties/finca-1.jpg'],
    type: 'villa'
  },
  {
    id: '6',
    title: 'Beachfront Apartment',
    slug: 'beachfront-apartment-camp-de-mar',
    area: 'Camp de Mar',
    price: 980000,
    beds: 2,
    baths: 2,
    size: 140,
    images: ['/properties/beachfront-1.jpg'],
    type: 'apartment'
  }
];

export default function FeaturedProperties({ locale }: FeaturedPropertiesProps) {
  const t = useTranslations();

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-950 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[150px]"></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('home.featuredProperties')}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover our hand-picked selection of exceptional properties in Mallorca's most prestigious locations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockProperties.map((property) => (
            <div
              key={property.id}
              className="property-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {t(`propertyTypes.${property.type}`)}
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

        <div className="text-center">
          <Link
            href={`/${locale}/properties`}
            className="inline-flex items-center bg-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
          >
            {t('common.exploreAll')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
