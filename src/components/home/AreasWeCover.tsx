'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBlurReveal } from '@/hooks/useBlurReveal';

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
    name: 'Palma',
    x: 32,
    y: 52,
    description: 'Historic city center and modern districts',
    properties: 'Historic penthouses & modern apartments'
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
    x: 55,
    y: 28,
    description: 'Popular resort area',
    properties: 'Resort properties & apartments'
  },
  // Central areas (in red highlighted zone)
  {
    name: 'Inca',
    x: 38,
    y: 40,
    description: 'Central market town',
    properties: 'Traditional properties & townhouses'
  },
  // Southern areas
  {
    name: 'Santanyí',
    x: 65,
    y: 65,
    description: 'Historic southern town',
    properties: 'Traditional properties & villas'
  },
  // Eastern areas
  {
    name: 'Artà',
    x: 62,
    y: 30,
    description: 'Eastern mountain town',
    properties: 'Mountain properties & fincas'
  },
  {
    name: 'Manacor',
    x: 58,
    y: 48,
    description: 'Eastern market town',
    properties: 'Traditional properties & apartments'
  },
  {
    name: 'Felanitx',
    x: 60,
    y: 58,
    description: 'Historic eastern town',
    properties: 'Traditional villas & fincas'
  }
];

export default function AreasWeCover({ locale }: AreasWeCoverProps) {
  const router = useRouter();
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  
  // Line-by-line reveal states
  const [titleLinesVisible, setTitleLinesVisible] = useState<number[]>([]);
  const [subtitleLinesVisible, setSubtitleLinesVisible] = useState<number[]>([]);
  
  // Blur reveal effects (these refs will be used for both blur and line reveal)
  const { elementRef: titleRef, style: titleBlurStyle } = useBlurReveal<HTMLHeadingElement>({ maxBlur: 8, minBlur: 0 });
  const { elementRef: subtitleRef, style: subtitleBlurStyle } = useBlurReveal<HTMLParagraphElement>({ maxBlur: 8, minBlur: 0 });
  
  // Line-by-line reveal effect
  useEffect(() => {
    const titleText = "Where We Operate";
    const subtitleText = "From the South-West's private sea-view villas to Palma's historic penthouses, we specialise in the island's most sought-after locations";
    
    const titleLines = titleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const subtitleLines = subtitleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    const finalTitleLines = titleLines.length > 0 ? titleLines : [titleText.trim()];
    const finalSubtitleLines = subtitleLines.length > 0 ? subtitleLines : [subtitleText.trim()];
    
    finalTitleLines.forEach((_, index) => {
      setTimeout(() => {
        setTitleLinesVisible(prev => [...prev, index]);
      }, 600 + (index * 500));
    });
    
    const subtitleStartDelay = 600 + (finalTitleLines.length * 500) + 400;
    finalSubtitleLines.forEach((_, index) => {
      setTimeout(() => {
        setSubtitleLinesVisible(prev => [...prev, index]);
      }, subtitleStartDelay + (index * 500));
    });
  }, []);

  const handleAreaClick = (areaName: string) => {
    setSelectedArea(areaName);
    // Navigate to properties page with area filter
    router.push(`/${locale}/properties?location=${encodeURIComponent(areaName)}`);
  };

  return (
    <section className="relative bg-black py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} style={titleBlurStyle} className="text-4xl md:text-5xl font-bold text-white mb-6">
            {(() => {
              const titleText = "Where We Operate";
              const titleLines = titleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
              const finalTitleLines = titleLines.length > 0 ? titleLines : [titleText.trim()];
              
              return finalTitleLines.map((line, index) => {
                const isVisible = titleLinesVisible.includes(index);
                return (
                  <span
                    key={index}
                    className={cn(
                      "block transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    )}
                  >
                    {line}
                  </span>
                );
              });
            })()}
          </h2>
          <p ref={subtitleRef} style={subtitleBlurStyle} className="text-xl text-gray-300 max-w-3xl mx-auto">
            {(() => {
              const subtitleText = "From the South-West's private sea-view villas to Palma's historic penthouses, we specialise in the island's most sought-after locations";
              const subtitleLines = subtitleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
              const finalSubtitleLines = subtitleLines.length > 0 ? subtitleLines : [subtitleText.trim()];
              
              return finalSubtitleLines.map((line, index) => {
                const isVisible = subtitleLinesVisible.includes(index);
                return (
                  <span
                    key={index}
                    className={cn(
                      "block transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    )}
                  >
                    {line}
                  </span>
                );
              });
            })()}
          </p>
        </div>

        {/* Interactive Map */}
        <div className="relative bg-gradient-to-br from-gray-900/30 to-gray-800/20 rounded-3xl border border-white/10 p-8 md:p-12 overflow-hidden">
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
                      <div className="w-12 h-12 rounded-full bg-gray-600/50 blur-sm" />
                    </div>
                    
                    {/* Main pin */}
                    <div className="relative filter drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]">
                      <MapPin
                        className={cn(
                          "transition-all duration-300",
                          isHovered || isSelected
                            ? "w-10 h-10 text-gray-500 scale-150"
                            : "w-9 h-9 text-gray-600 scale-100"
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
                        <div className="absolute inset-0 rounded-full bg-gray-600/40 animate-ping" />
                        <div className="absolute inset-0 rounded-full bg-gray-600/30" />
                      </div>
                    )}

                    {/* Location name label - Always visible below the point */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
                      <span className="text-white text-xs font-semibold bg-gray-700/80 backdrop-blur-sm px-2 py-1 rounded-full border border-gray-400/50 whitespace-nowrap">
                        {area.name}
                      </span>
                    </div>

                    {/* Tooltip with details - Only show on hover */}
                    {isHovered && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-64 z-50">
                        <div className="bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-white/20">
                          <h3 className="font-bold text-gray-900 mb-1">{area.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{area.description}</p>
                          {area.properties && (
                            <p className="text-xs text-gray-600 font-medium">{area.properties}</p>
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

