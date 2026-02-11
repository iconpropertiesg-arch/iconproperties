'use client';

import { CheckCircle, Wifi, Car, Thermometer, Shield, Waves, TreePine, Dumbbell, Film, Wine, Home, Zap } from 'lucide-react';
import { Property } from '@/types';

interface PropertyFeaturesProps {
  property: Property;
  locale: string;
}

// Icon mapping for features
const featureIcons: { [key: string]: any } = {
  'Swimming Pool': Waves,
  'Sea Views': Waves,
  'Garage': Car,
  'Garden': TreePine,
  'Terrace': Home,
  'Air Conditioning': Thermometer,
  'Underfloor Heating': Thermometer,
  'Wine Cellar': Wine,
  'Guest House': Home,
  'Gym': Dumbbell,
  'Home Cinema': Film,
  'Smart Home System': Zap,
  'Security System': Shield,
  'WiFi': Wifi,
};

export default function PropertyFeatures({ property, locale }: PropertyFeaturesProps) {
  const features = property.features || [];

  if (features.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Features & Amenities</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => {
          const Icon = featureIcons[feature] || CheckCircle;
          
          return (
            <div
              key={index}
              className="flex items-center space-x-3 p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-gray-500/50 hover:bg-gray-800 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-700/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-500/30">
                <Icon className="w-5 h-5 text-gray-400" />
              </div>
              <span className="font-medium text-white">{feature}</span>
            </div>
          );
        })}
      </div>

      {/* Additional Features Categories */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Energy & Sustainability</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-300">Solar panels installed</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-300">Energy efficiency rating: A</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-300">Rainwater collection system</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-300">LED lighting throughout</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Security & Technology</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">24/7 security system</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">Video surveillance</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">Smart home automation</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">High-speed fiber internet</span>
            </li>
          </ul>
        </div>
      </div> */}

      {/* Floorplan Section */}
      {/* <div className="border-t border-gray-700 pt-8">
        <h3 className="text-xl font-semibold text-white mb-6">Floor Plans</h3>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-700/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-500/30">
            <Home className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="font-semibold text-white mb-2">Floor Plans Available</h4>
          <p className="text-gray-300 mb-4">
            Detailed architectural plans and layouts are available upon request.
          </p>
          <button className="bg-gray-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Request Floor Plans
          </button>
        </div>
      </div> */}
    </div>
  );
}
