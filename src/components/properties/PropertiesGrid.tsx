'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Grid, List, MapPin } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { Property } from '@/types';

interface PropertiesGridProps {
  locale: string;
  searchParams: { [key: string]: string | string[] | undefined };
}

// Mock data - in a real app, this would come from an API
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Villa with Sea Views',
    slug: 'luxury-villa-sea-views-portals-nous',
    status: 'buy',
    type: 'villa',
    area: 'Portals Nous',
    price: 2800000,
    beds: 5,
    baths: 4,
    interiorSize: 450,
    plotSize: 800,
    yearBuilt: 2019,
    description: 'Stunning contemporary villa with panoramic sea views...',
    features: ['Swimming Pool', 'Sea Views', 'Garage', 'Garden', 'Terrace'],
    images: [
      { id: '1', url: '/properties/villa-1.jpg', alt: 'Villa exterior', order: 1 },
      { id: '2', url: '/properties/villa-1-2.jpg', alt: 'Villa interior', order: 2 },
    ],
    location: { lat: 39.5267, lng: 2.5584, address: 'Portals Nous, Mallorca' },
    agent: {
      id: '1',
      name: 'Daniel Rodriguez',
      email: 'daniel@lioncapitala.com',
      phone: '+34 123 456 789',
      whatsapp: '+34 123 456 789',
      avatar: '/agents/daniel.jpg',
      languages: ['en', 'es', 'de']
    },
    referenceId: 'LCR-001',
    availability: 'available',
    seo: {
      title: 'Luxury Villa with Sea Views in Portals Nous',
      description: 'Stunning 5-bedroom villa with sea views in Portals Nous'
    }
  },
  {
    id: '2',
    title: 'Modern Apartment in Puerto Portals',
    slug: 'modern-apartment-puerto-portals',
    status: 'buy',
    type: 'apartment',
    area: 'Puerto Portals',
    price: 1200000,
    beds: 3,
    baths: 2,
    interiorSize: 180,
    yearBuilt: 2020,
    description: 'Contemporary apartment in prestigious marina location...',
    features: ['Marina Views', 'Terrace', 'Parking', 'Storage'],
    images: [
      { id: '3', url: '/properties/apartment-1.jpg', alt: 'Apartment exterior', order: 1 },
    ],
    location: { lat: 39.5389, lng: 2.5478, address: 'Puerto Portals, Mallorca' },
    agent: {
      id: '1',
      name: 'Daniel Rodriguez',
      email: 'daniel@lioncapitala.com',
      phone: '+34 123 456 789',
      whatsapp: '+34 123 456 789',
      avatar: '/agents/daniel.jpg',
      languages: ['en', 'es', 'de']
    },
    referenceId: 'LCR-002',
    availability: 'available',
    seo: {
      title: 'Modern Apartment in Puerto Portals',
      description: '3-bedroom apartment with marina views in Puerto Portals'
    }
  },
  // Add more mock properties...
];

export default function PropertiesGrid({ locale, searchParams }: PropertiesGridProps) {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 12;
  const t = useTranslations();

  // Filter properties based on search params
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      let filtered = [...mockProperties];

      // Apply filters
      if (searchParams.purpose) {
        filtered = filtered.filter(p => p.status === searchParams.purpose);
      }

      if (searchParams.type) {
        const types = Array.isArray(searchParams.type) ? searchParams.type : [searchParams.type];
        filtered = filtered.filter(p => types.includes(p.type));
      }

      if (searchParams.location) {
        filtered = filtered.filter(p => 
          p.area.toLowerCase().includes((searchParams.location as string).toLowerCase())
        );
      }

      if (searchParams.priceMin) {
        filtered = filtered.filter(p => p.price >= parseInt(searchParams.priceMin as string));
      }

      if (searchParams.priceMax) {
        filtered = filtered.filter(p => p.price <= parseInt(searchParams.priceMax as string));
      }

      if (searchParams.beds) {
        const beds = searchParams.beds as string;
        if (beds === '5+') {
          filtered = filtered.filter(p => p.beds && p.beds >= 5);
        } else if (beds !== '') {
          filtered = filtered.filter(p => p.beds === parseInt(beds));
        }
      }

      if (searchParams.baths) {
        const baths = searchParams.baths as string;
        if (baths === '5+') {
          filtered = filtered.filter(p => p.baths && p.baths >= 5);
        } else if (baths !== '') {
          filtered = filtered.filter(p => p.baths === parseInt(baths));
        }
      }

      // Apply sorting
      const sort = searchParams.sort as string || 'newest';
      if (sort === 'price_asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sort === 'price_desc') {
        filtered.sort((a, b) => b.price - a.price);
      }
      // Default is newest (keep original order)

      setProperties(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const currentProperties = properties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg h-96 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-lg p-4 border border-gray-200">
        <div>
          <p className="text-gray-600">
            {properties.length === 0 ? (
              t('common.noResults')
            ) : (
              `${properties.length} ${properties.length === 1 ? 'property' : 'properties'} found`
            )}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white shadow-sm text-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white shadow-sm text-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Map Toggle */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Map</span>
          </button>
        </div>
      </div>

      {/* Properties Grid/List */}
      {properties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600">
              {t('common.noResults')}
            </p>
          </div>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {currentProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              locale={locale}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === page
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
