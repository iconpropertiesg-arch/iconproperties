'use client';

import { MapPin, Navigation, Car, Plane } from 'lucide-react';

interface OfficeLocationProps {
  locale: string;
}

export default function OfficeLocation({ locale }: OfficeLocationProps) {
  const directions = [
    {
      icon: Car,
      method: 'By Car',
      description: 'From Palma: Take Ma-1 towards Andratx, exit at Portals Nous',
      time: '15 minutes from Palma center'
    },
    {
      icon: Plane,
      method: 'From Airport',
      description: 'Take Ma-19 to Ma-1, follow signs to Portals Nous',
      time: '20 minutes from Palma Airport'
    }
  ];

  return (
    <section className="relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Visit Our Office</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Located in the heart of Portals Nous, our office provides easy access to Mallorca's 
            luxury property market with convenient parking and marina views.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-gray-800/50 to-blue-900/30 rounded-2xl border border-gray-700 overflow-hidden">
              <div className="h-96 bg-gray-900/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Interactive Map</h3>
                  <p className="text-gray-400 mb-4">
                    Detailed location map will be displayed here
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Calle+Marina+15+Portals+Nous+Mallorca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-600/50"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Address */}
            <div className="bg-gradient-to-br from-gray-800/50 to-blue-900/30 rounded-2xl border border-gray-700 p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Our Address</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Calle Marina, 15<br />
                    07181 Portals Nous<br />
                    Calvià, Mallorca<br />
                    Balearic Islands, Spain
                  </p>
                </div>
              </div>
            </div>

            {/* Directions */}
            <div className="bg-gradient-to-br from-gray-800/50 to-blue-900/30 rounded-2xl border border-gray-700 p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Getting Here</h3>
              <div className="space-y-6">
                {directions.map((direction, index) => {
                  const Icon = direction.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{direction.method}</h4>
                        <p className="text-gray-300 text-sm mb-1">{direction.description}</p>
                        <p className="text-blue-400 text-sm font-medium">{direction.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Parking & Amenities */}
            <div className="bg-gradient-to-br from-gray-800/50 to-blue-900/30 rounded-2xl border border-gray-700 p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Parking & Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Free parking available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Wheelchair accessible</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Near restaurants & cafés</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Marina walking distance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
