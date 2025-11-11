'use client';

import { useTranslations } from 'next-intl';
import { Bed, Bath, Maximize, Calendar, MapPin, Home, Hash } from 'lucide-react';
import { formatPrice, formatNumber } from '@/lib/utils';
import { Property } from '@/types';

interface PropertyDetailsProps {
  property: Property;
  locale: string;
}

export default function PropertyDetails({ property, locale }: PropertyDetailsProps) {
  const t = useTranslations();

  const details = [
    {
      icon: Bed,
      label: t('common.beds'),
      value: property.beds?.toString() || 'N/A'
    },
    {
      icon: Bath,
      label: t('common.baths'),
      value: property.baths?.toString() || 'N/A'
    },
    {
      icon: Maximize,
      label: 'Interior Size',
      value: property.interiorSize ? `${formatNumber(property.interiorSize, locale)} ${t('common.sqm')}` : 'N/A'
    },
    {
      icon: Home,
      label: 'Plot Size',
      value: property.plotSize ? `${formatNumber(property.plotSize, locale)} ${t('common.sqm')}` : 'N/A'
    },
    {
      icon: Calendar,
      label: 'Year Built',
      value: property.yearBuilt?.toString() || 'N/A'
    },
    {
      icon: Hash,
      label: 'Reference',
      value: property.referenceId
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {t(`propertyTypes.${property.type}`)}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Available
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {property.title}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{property.location.address}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {formatPrice(property.price, locale)}
            </div>
            <div className="text-gray-600">
              Ref: {property.referenceId}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {details.map((detail, index) => {
          const Icon = detail.icon;
          return (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-sm text-gray-600 mb-1">{detail.label}</div>
              <div className="font-semibold text-gray-900">{detail.value}</div>
            </div>
          );
        })}
      </div>

      {/* Description */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          {property.description.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Property Highlights */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Property Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Interior Features</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Open-plan living and dining areas</li>
              <li>• Gourmet kitchen with premium appliances</li>
              <li>• Master suite with private terrace</li>
              <li>• Floor-to-ceiling windows throughout</li>
              <li>• Air conditioning and underfloor heating</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Exterior Features</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Infinity swimming pool</li>
              <li>• Landscaped Mediterranean gardens</li>
              <li>• Multiple outdoor terraces</li>
              <li>• Outdoor kitchen and dining area</li>
              <li>• Private garage for 2 cars</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
