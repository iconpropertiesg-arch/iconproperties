'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Bed, Bath, Maximize, Heart, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  locale: string;
  viewMode: 'grid' | 'list';
}

export default function PropertyCard({ property, locale, viewMode }: PropertyCardProps) {
  const t = useTranslations();

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-80 h-64 md:h-48 flex-shrink-0">
            <Image
              src={property.images[0]?.url || '/placeholder-property.jpg'}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                {t(`propertyTypes.${property.type}`)}
              </span>
            </div>
            <button className="absolute top-3 right-3 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors">
                    <Link href={`/${locale}/properties/${property.slug}`}>
                      {property.title}
                    </Link>
                  </h3>
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(property.price, locale)}
                    {(property.purpose === 'rent' || property.status === 'rent') && (
                      <span className="text-base font-normal text-gray-600 ml-1">
                        {t('common.perMonth')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{property.area}</span>
                  <span className="mx-2">•</span>
                  <span>Ref: {property.referenceId}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
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
                {property.interiorSize && (
                  <div className="flex items-center space-x-1">
                    <Maximize className="w-4 h-4" />
                    <span>{property.interiorSize}{t('common.sqm')}</span>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{property.yearBuilt}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {property.description}
              </p>

              {/* Action */}
              <div className="mt-auto">
                <Link
                  href={`/${locale}/properties/${property.slug}`}
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm group"
                >
                  {t('common.viewDetails')}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative h-96 overflow-hidden rounded-2xl border border-white/10 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 bg-transparent">
      {/* Background image fills card */}
      <Image
        src={property.images[0]?.url || '/placeholder-property.jpg'}
        alt={property.title}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />

      {/* Single overlay layer with gradients for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/85 opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        {/* Top badges */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              {t(`propertyTypes.${property.type}`)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {property.availability && (
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                {property.availability === 'sold' ? t('common.sold') : t('common.available')}
              </span>
            )}
          </div>
        </div>

        {/* Center CTA */}
        <div className="flex justify-center">
        </div>

        {/* Bottom info directly over image */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold leading-tight mb-1 transition-colors duration-200 group-hover:text-gray-200">
                <Link href={`/${locale}/properties/${property.slug}`}>
                  {property.title}
                </Link>
              </h3>
              <div className="flex items-center text-sm text-slate-200/90">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{property.area}</span>
              </div>
            </div>
            {property.yearBuilt && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold border border-white/20">
                {property.yearBuilt}
              </span>
            )}
          </div>

          <div className="flex items-center flex-wrap gap-4 text-sm text-slate-200/90">
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
            {property.interiorSize && (
              <div className="flex items-center space-x-1">
                <Maximize className="w-4 h-4" />
                <span>{property.interiorSize}{t('common.sqm')}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wide text-slate-200/80">{property.yearBuilt}</span>
              <div className="text-2xl font-bold text-white leading-tight">
                {formatPrice(property.price, locale)}
                {(property.purpose === 'rent' || property.status === 'rent') && (
                  <span className="text-base font-normal text-slate-200/80 ml-1">
                    {t('common.perMonth')}
                  </span>
                )}
              </div>
            </div>
            <Link
              href={`/${locale}/properties/${property.slug}`}
              className="inline-flex items-center justify-center bg-white text-gray-900 py-2 px-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors group"
            >
              {t('common.viewDetails')}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
