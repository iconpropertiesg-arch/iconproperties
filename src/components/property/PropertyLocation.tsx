'use client';

import { MapPin, Car, Plane, Utensils, ShoppingBag, GraduationCap, Building2 } from 'lucide-react';
import { Property } from '@/types';

interface PropertyLocationProps {
  property: Property;
  locale: string;
}

export default function PropertyLocation({ property, locale }: PropertyLocationProps) {
  // Mock nearby amenities data - in a real app, this could come from a places API
  const nearbyAmenities = [
    {
      category: 'Restaurants',
      icon: Utensils,
      items: [
        { name: 'Flanigan Restaurant', distance: '0.3 km', rating: 4.5 },
        { name: 'Cappuccino Grand Marina', distance: '0.8 km', rating: 4.3 },
        { name: 'Tristán Restaurant', distance: '1.2 km', rating: 4.7 },
      ]
    },
    {
      category: 'Shopping',
      icon: ShoppingBag,
      items: [
        { name: 'Puerto Portals Marina', distance: '0.8 km', rating: 4.4 },
        { name: 'El Corte Inglés', distance: '5.2 km', rating: 4.2 },
        { name: 'Palma City Center', distance: '12 km', rating: 4.1 },
      ]
    },
    {
      category: 'Schools',
      icon: GraduationCap,
      items: [
        { name: 'Agora Portals International School', distance: '1.5 km', rating: 4.6 },
        { name: 'Bellver International College', distance: '8 km', rating: 4.4 },
        { name: 'King Richard III College', distance: '15 km', rating: 4.5 },
      ]
    }
  ];

  const transportInfo = [
    { icon: Car, label: 'To Palma Center', time: '15 minutes' },
    { icon: Plane, label: 'To Airport', time: '20 minutes' },
    { icon: Building2, label: 'To Port', time: '18 minutes' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Location & Neighborhood</h2>

      {/* Address & Map Placeholder */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600 leading-relaxed">
              {property.location.address}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              * Exact location shown to qualified buyers only
            </p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Interactive map will be shown here</p>
            <button className="mt-2 text-primary font-medium hover:text-primary/80">
              View on Google Maps
            </button>
          </div>
        </div>
      </div>

      {/* Transportation */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Transportation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {transportInfo.map((transport, index) => {
            const Icon = transport.icon;
            return (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg">
                <Icon className="w-6 h-6 text-primary" />
                <div>
                  <div className="font-medium text-gray-900">{transport.label}</div>
                  <div className="text-sm text-gray-600">{transport.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nearby Amenities */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Nearby Amenities</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {nearbyAmenities.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <div key={categoryIndex} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CategoryIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{category.category}</h4>
                </div>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                        <div className="text-xs text-gray-600">{item.distance}</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-xs text-gray-600">{item.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Area Description */}
      <div className="bg-primary/5 rounded-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">About {property.area}</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Portals Nous is one of Mallorca's most prestigious coastal areas, renowned for its luxury marina, 
          upscale restaurants, and beautiful beaches. This exclusive enclave offers a sophisticated lifestyle 
          with easy access to both the cosmopolitan amenities of Palma and the natural beauty of the Mediterranean.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The area is home to some of the island's finest properties, attracting discerning buyers seeking 
          privacy, elegance, and world-class services. With its strategic location and premium infrastructure, 
          Portals Nous represents the pinnacle of luxury living in Mallorca.
        </p>
      </div>
    </div>
  );
}
