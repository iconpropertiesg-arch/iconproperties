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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRelatedProperties.map((relatedProperty) => {
            const firstImageUrl = relatedProperty.images?.[0]?.url;
            const isExternalImage = firstImageUrl?.startsWith('http://') || firstImageUrl?.startsWith('https://');
            return (
              <Link
                key={relatedProperty.id}
                href={`/${locale}/properties/${relatedProperty.slug}`}
                className="group relative h-[420px] rounded-2xl overflow-hidden border border-white/10 hover:border-gray-500 transition-all duration-300 cursor-pointer block hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Full-cover background image - same as homepage */}
                {firstImageUrl ? (
                  isExternalImage ? (
                    <img
                      src={firstImageUrl}
                      alt={relatedProperty.images[0].alt || relatedProperty.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <Image
                      src={firstImageUrl}
                      alt={relatedProperty.images[0].alt || relatedProperty.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  )
                ) : (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}

                {/* Dark overlay for text readability - same as homepage */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/85 group-hover:via-black/50 transition-all duration-300" />

                {/* Content overlay - same structure as homepage cards */}
                <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
                  {/* Top badges */}
                  <div className="flex items-start justify-between">
                    <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      {t(`propertyTypes.${relatedProperty.type}`) || relatedProperty.type}
                    </span>
                    <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {formatPrice(relatedProperty.price, locale)}
                      {(relatedProperty.purpose === 'rent' || relatedProperty.status === 'rent') && (
                        <span className="text-xs font-normal ml-1">
                          {t('common.perMonth')}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Spacer for middle area */}
                  <div className="flex-1" />

                  {/* Bottom info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-gray-300 transition-colors line-clamp-1">
                        {relatedProperty.title}
                      </h3>
                      <p className="text-sm text-gray-300 line-clamp-1">
                        {relatedProperty.area}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      {relatedProperty.beds != null && (
                        <div className="flex items-center space-x-1">
                          <Bed className="w-4 h-4" />
                          <span>{relatedProperty.beds} {t('common.beds')}</span>
                        </div>
                      )}
                      {relatedProperty.baths != null && (
                        <div className="flex items-center space-x-1">
                          <Bath className="w-4 h-4" />
                          <span>{relatedProperty.baths} {t('common.baths')}</span>
                        </div>
                      )}
                      {relatedProperty.interiorSize != null && (
                        <div className="flex items-center space-x-1">
                          <Maximize className="w-4 h-4" />
                          <span>{relatedProperty.interiorSize}{t('common.sqm')}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/20">
                      <div className="inline-flex items-center text-gray-400 group-hover:text-gray-300 transition-colors font-medium">
                        {t('common.viewDetails')}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}/properties`}
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {t('common.exploreAll')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
