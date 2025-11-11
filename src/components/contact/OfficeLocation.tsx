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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Located in the heart of Portals Nous, our office provides easy access to Mallorca's 
            luxury property market with convenient parking and marina views.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-96 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Interactive Map</h3>
                  <p className="text-gray-500 mb-4">
                    Detailed location map will be displayed here
                  </p>
                  <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    Open in Google Maps
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Address */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Calle Marina, 15<br />
                    07181 Portals Nous<br />
                    Calvià, Mallorca<br />
                    Balearic Islands, Spain
                  </p>
                </div>
              </div>
            </div>

            {/* Directions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Getting Here</h3>
              <div className="space-y-6">
                {directions.map((direction, index) => {
                  const Icon = direction.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{direction.method}</h4>
                        <p className="text-gray-600 text-sm mb-1">{direction.description}</p>
                        <p className="text-blue-600 text-sm font-medium">{direction.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Parking & Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Parking & Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Free parking available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Wheelchair accessible</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Near restaurants & cafés</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Marina walking distance</span>
                </div>
              </div>
            </div>

            {/* Visit CTA */}
            <div className="bg-primary rounded-2xl p-8 text-white text-center">
              <h3 className="text-xl font-semibold mb-4">Ready to Visit?</h3>
              <p className="text-white/90 mb-6">
                Schedule an appointment to discuss your property needs in our comfortable office environment.
              </p>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-lg font-semibold transition-colors">
                <Navigation className="w-5 h-5 inline mr-2" />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
