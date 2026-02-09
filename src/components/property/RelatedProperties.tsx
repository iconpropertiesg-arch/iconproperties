'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Bed, Bath, Maximize, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Property } from '@/types';

interface RelatedPropertiesProps {
  property: Property;
  relatedProperties: Property[];
  locale: string;
}

export default function RelatedProperties({ property, relatedProperties, locale }: RelatedPropertiesProps) {
  const t = useTranslations();

  // Filter out the current property and ensure slugs are valid
  const filteredRelatedProperties = relatedProperties
    .filter(p => p.id !== property.id && p.slug && p.slug.trim() !== '')
    .slice(0, 4);

  if (filteredRelatedProperties.length === 0) {
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
          {filteredRelatedProperties.map((relatedProperty) => (
            <Link
              key={relatedProperty.id}
              href={`/${locale}/properties/${relatedProperty.slug}`}
              className="property-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500/50 shadow-xl hover:shadow-2xl hover:/20 transition-all duration-300 block cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-gray-900">
                {relatedProperty.images && relatedProperty.images.length > 0 && relatedProperty.images[0]?.url ? (
                  relatedProperty.images[0].url.startsWith('http://') || relatedProperty.images[0].url.startsWith('https://') ? (
                    <img
                      src={relatedProperty.images[0].url}
                      alt={relatedProperty.images[0].alt || relatedProperty.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Image
                      src={relatedProperty.images[0].url}
                      alt={relatedProperty.images[0].alt || relatedProperty.title}
                      fill
                      className="object-contain transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {t(`propertyTypes.${relatedProperty.type}`) || relatedProperty.type}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold">
                    {formatPrice(relatedProperty.price, locale)}
                    {relatedProperty.status === 'rent' && (
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
                  {relatedProperty.interiorSize && (
                    <div className="flex items-center space-x-1">
                      <Maximize className="w-3 h-3 text-gray-400" />
                      <span>{relatedProperty.interiorSize}m²</span>
                    </div>
                  )}
                </div>

                <div className="inline-flex items-center justify-center w-full bg-gray-700 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors group">
                  {t('common.viewDetails')}
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
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
