'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Bed, Bath, Maximize, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Property } from '@/types';

interface RelatedPropertiesProps {
  property: Property;
  locale: string;
}

// Mock related properties - in a real app, this would fetch similar properties
const mockRelatedProperties = [
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
    type: 'apartment',
    purpose: 'buy',
    status: 'buy'
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
    type: 'house',
    purpose: 'rent',
    status: 'rent'
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
    type: 'apartment',
    purpose: 'buy',
    status: 'buy'
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
    type: 'villa',
    purpose: 'rent',
    status: 'rent'
  }
];

export default function RelatedProperties({ property, locale }: RelatedPropertiesProps) {
  const t = useTranslations();

  // Filter out the current property and get similar properties
  const relatedProperties = mockRelatedProperties
    .filter(p => p.id !== property.id)
    .slice(0, 4);

  if (relatedProperties.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Similar Properties
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover other exceptional properties that might interest you in similar locations and price ranges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProperties.map((relatedProperty) => (
            <div
              key={relatedProperty.id}
              className="property-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500/50 shadow-xl hover:shadow-2xl hover:/20 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-gray-900">
                {relatedProperty.images[0]?.startsWith('http://') || relatedProperty.images[0]?.startsWith('https://') ? (
                  <img
                    src={relatedProperty.images[0]}
                    alt={relatedProperty.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={relatedProperty.images[0]}
                    alt={relatedProperty.title}
                    fill
                    className="object-contain transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                )}
                <div className="absolute top-3 left-3">
                  <span className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {t(`propertyTypes.${relatedProperty.type}`) || relatedProperty.type}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold">
                    {formatPrice(relatedProperty.price, locale)}
                    {(relatedProperty.purpose === 'rent' || relatedProperty.status === 'rent') && (
                      <span className="text-[10px] font-normal ml-1">
                        {t('common.perMonth')}
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
                    {relatedProperty.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{relatedProperty.area}</p>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-xs text-gray-400">
                  {relatedProperty.beds && (
                    <div className="flex items-center space-x-1">
                      <Bed className="w-3 h-3 text-gray-400" />
                      <span>{relatedProperty.beds}</span>
                    </div>
                  )}
                  {relatedProperty.baths && (
                    <div className="flex items-center space-x-1">
                      <Bath className="w-3 h-3 text-gray-400" />
                      <span>{relatedProperty.baths}</span>
                    </div>
                  )}
                  {relatedProperty.size && (
                    <div className="flex items-center space-x-1">
                      <Maximize className="w-3 h-3 text-gray-400" />
                      <span>{relatedProperty.size}m²</span>
                    </div>
                  )}
                </div>

                <Link
                  href={`/${locale}/properties/${relatedProperty.slug}`}
                  className="inline-flex items-center justify-center w-full bg-gray-700 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors group"
                >
                  {t('common.viewDetails')}
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}/properties`}
            className="inline-flex items-center bg-gray-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-lg"
          >
            View All Properties
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
