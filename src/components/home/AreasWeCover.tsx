'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AreasWeCoverProps {
  locale: string;
}

interface Area {
  name: string;
  x: number; // Percentage from left
  y: number; // Percentage from top
  description: string;
  properties?: string;
}

const areas: Area[] = [
  // Western/Southwestern areas
  {
    name: 'Port Andratx',
    x: 18,
    y: 60,
    description: 'Exclusive marina and coastal properties',
    properties: 'Luxury villas & waterfront properties'
  },
  {
    name: 'Santa Ponsa',
    x: 22,
    y: 55,
    description: 'Family-friendly coastal area',
    properties: 'Villas & family homes'
  },
  {
    name: 'Portals',
    x: 26,
    y: 48,
    description: 'Luxury marina and coastal properties',
    properties: 'Sea-view villas & apartments'
  },
  {
    name: 'Palma',
    x: 32,
    y: 52,
    description: 'Historic city center and modern districts',
    properties: 'Historic penthouses & modern apartments'
  },
  {
    name: 'Palma Beach',
    x: 34,
    y: 54,
    description: 'Beachfront properties and resorts',
    properties: 'Beachfront apartments & hotels'
  },
  {
    name: 'Son Vida',
    x: 30,
    y: 45,
    description: 'Prestigious golf and country club area',
    properties: 'Luxury estates & villas'
  },
  {
    name: 'Deià',
    x: 28,
    y: 35,
    description: 'Artistic mountain village',
    properties: 'Mountain villas & fincas'
  },
  {
    name: 'Sóller',
    x: 30,
    y: 32,
    description: 'Historic mountain town',
    properties: 'Traditional fincas & villas'
  },
  // Northern areas
  {
    name: 'Puerto Pollensa',
    x: 42,
    y: 25,
    description: 'Charming northern port',
    properties: 'Coastal properties & apartments'
  },
  {
    name: 'Pollensa',
    x: 40,
    y: 22,
    description: 'Historic mountain town',
    properties: 'Mountain villas & traditional homes'
  },
  {
    name: 'Puerto Alcúdia',
    x: 45,
    y: 28,
    description: 'Popular resort area',
    properties: 'Resort properties & apartments'
  },
  // Central areas (in red highlighted zone)
  {
    name: 'Alaró',
    x: 35,
    y: 42,
    description: 'Mountain town with historic castle',
    properties: 'Mountain properties & fincas'
  },
  {
    name: 'Inca',
    x: 38,
    y: 40,
    description: 'Central market town',
    properties: 'Traditional properties & townhouses'
  },
  {
    name: 'Santa Maria',
    x: 36,
    y: 44,
    description: 'Central Mallorca location',
    properties: 'Country properties & estates'
  },
  // Southern areas
  {
    name: 'Llucmajor',
    x: 35,
    y: 60,
    description: 'Southern coastal area',
    properties: 'Coastal properties & villas'
  },
  {
    name: 'Santanyí',
    x: 48,
    y: 65,
    description: 'Historic southern town',
    properties: 'Traditional properties & villas'
  },
  // Eastern areas
  {
    name: 'Artà',
    x: 52,
    y: 30,
    description: 'Eastern mountain town',
    properties: 'Mountain properties & fincas'
  }
];

export default function AreasWeCover({ locale }: AreasWeCoverProps) {
  const router = useRouter();
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const handleAreaClick = (areaName: string) => {
    setSelectedArea(areaName);
    // Navigate to properties page with area filter
    router.push(`/${locale}/properties?location=${encodeURIComponent(areaName)}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Where We Operate
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From the South-West's private sea-view villas to Palma's historic penthouses, we specialise in the island's most sought-after locations
          </p>
        </div>

        {/* Interactive Map */}
        <div className="relative bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-3xl border border-white/10 p-8 md:p-12 overflow-hidden">
          {/* Map Container */}
          <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl border border-white/10 overflow-hidden bg-white">
            {/* Real Map Image */}
            <div className="relative w-full h-full">
              <Image
                src="/images/maps2.jpg"
                alt="Mallorca Map"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            
            {/* Overlay for better marker visibility */}
            <div className="absolute inset-0 pointer-events-none" />
            {/* Clickable Area Markers */}
            {areas.map((area) => {
              const isHovered = hoveredArea === area.name;
              const isSelected = selectedArea === area.name;
              
              return (
                <div
                  key={area.name}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${area.x}%`,
                    top: `${area.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onMouseEnter={() => setHoveredArea(area.name)}
                  onMouseLeave={() => setHoveredArea(null)}
                  onClick={() => handleAreaClick(area.name)}
                >
                  {/* Marker Pin */}
                  <div className="relative">
                    {/* Outer white glow/shadow for visibility */}
                    <div className="absolute inset-0 flex items-center justify-center -z-10">
                      <div className="w-14 h-14 rounded-full bg-white/80 blur-md" />
                    </div>
                    
                    {/* Blue glow ring */}
                    <div className="absolute inset-0 flex items-center justify-center -z-10">
                      <div className="w-12 h-12 rounded-full bg-blue-500/50 blur-sm" />
                    </div>
                    
                    {/* Main pin */}
                    <div className="relative filter drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]">
                      <MapPin
                        className={cn(
                          "transition-all duration-300",
                          isHovered || isSelected
                            ? "w-10 h-10 text-blue-500 scale-150"
                            : "w-9 h-9 text-blue-600 scale-100"
                        )}
                        fill={isHovered || isSelected ? "#3b82f6" : "#2563eb"}
                      />
                    </div>
                    
                    {/* White center dot for extra visibility */}
                    <div className={cn(
                      "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg",
                      isHovered || isSelected ? "w-3 h-3" : "w-2.5 h-2.5"
                    )} />
                    
                    {/* Pulse Animation */}
                    {(isHovered || isSelected) && (
                      <div className="absolute inset-0 -z-20">
                        <div className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping" />
                        <div className="absolute inset-0 rounded-full bg-blue-500/30" />
                      </div>
                    )}

                    {/* Tooltip */}
                    {(isHovered || isSelected) && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-64 z-50">
                        <div className="bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-white/20">
                          <h3 className="font-bold text-gray-900 mb-1">{area.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{area.description}</p>
                          {area.properties && (
                            <p className="text-xs text-blue-600 font-medium">{area.properties}</p>
                          )}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/95" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Area Labels (visible on hover/click) */}
            {areas.map((area) => {
              const isHovered = hoveredArea === area.name;
              const isSelected = selectedArea === area.name;
              
              if (!isHovered && !isSelected) return null;
              
              return (
                <div
                  key={`label-${area.name}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${area.x}%`,
                    top: `${area.y + 3}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <span className="text-white text-sm font-semibold bg-blue-600/80 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-400/50">
                    {area.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend/Instructions */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Click on any area to view available properties
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

