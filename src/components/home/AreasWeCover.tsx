'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBlurReveal } from '@/hooks/useBlurReveal';

interface AreasWeCoverProps {
  locale: string;
}

interface Area {
  name: string;
  x: number;
  y: number;
  description: string;
  properties?: string;
  region: RegionKey;
}

type RegionKey =
  | 'central'
  | 'palma'
  | 'north'
  | 'northEast'
  | 'palmaSurroundings'
  | 'south'
  | 'southEast'
  | 'southWest'
  | 'west';

const areas: Area[] = [
  { name: 'Puerto Pollensa', x: 65, y: 12, description: 'Charming northern port', properties: 'Coastal properties & apartments', region: 'north' },
  { name: 'Pollensa', x: 60, y: 20, description: 'Historic mountain town', properties: 'Mountain villas & traditional homes', region: 'north' },
  { name: 'Puerto Alcúdia', x: 68, y: 22, description: 'Popular resort area', properties: 'Resort properties & apartments', region: 'northEast' },

  { name: 'Sóller', x: 35, y: 30, description: 'Historic northwestern port town', properties: 'Historic properties & coastal villas', region: 'west' },
  { name: 'Deià', x: 32, y: 35, description: 'Artistic coastal village', properties: 'Luxury villas & artistic retreats', region: 'west' },

  { name: 'Artà', x: 80, y: 37, description: 'Eastern mountain town', properties: 'Mountain properties & fincas', region: 'northEast' },

  { name: 'Alaró', x: 47, y: 37, description: 'Central mountain town', properties: 'Mountain properties & traditional homes', region: 'central' },
  { name: 'Inca', x: 54, y: 37, description: 'Central market town', properties: 'Traditional properties & townhouses', region: 'central' },
  { name: 'Santa Maria', x: 46, y: 50, description: 'Central town', properties: 'Traditional properties & fincas', region: 'central' },

  { name: 'Son Vida', x: 33, y: 45, description: 'Exclusive residential area', properties: 'Luxury estates & penthouses', region: 'palmaSurroundings' },
  { name: 'Port Andratx', x: 21, y: 50, description: 'Exclusive southwestern port', properties: 'Luxury waterfront properties', region: 'southWest' },
  { name: 'Palma', x: 33, y: 55, description: 'Historic city center and modern districts', properties: 'Historic penthouses & modern apartments', region: 'palma' },
  { name: 'Portals', x: 27, y: 55, description: 'Exclusive southwestern area', properties: 'Luxury properties & villas', region: 'palmaSurroundings' },
  { name: 'Palma Beach', x: 40, y: 58, description: 'Coastal beach area', properties: 'Beachfront properties & apartments', region: 'palmaSurroundings' },
  { name: 'Santa Ponsa', x: 22, y: 60, description: 'Southwestern coastal resort', properties: 'Resort properties & apartments', region: 'southWest' },

  { name: 'Llucmajor', x: 50, y: 68, description: 'South-central town', properties: 'Traditional properties & villas', region: 'south' },
  { name: 'Santanyí', x: 72, y: 80, description: 'Historic southern town', properties: 'Traditional properties & villas', region: 'southEast' }
];

export default function AreasWeCover({ locale }: AreasWeCoverProps) {
  const router = useRouter();

  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<RegionKey | null>(null);

  const [titleLinesVisible, setTitleLinesVisible] = useState<number[]>([]);
  const [subtitleLinesVisible, setSubtitleLinesVisible] = useState<number[]>([]);

  const { elementRef: titleRef, style: titleBlurStyle } = useBlurReveal<HTMLHeadingElement>({ maxBlur: 8, minBlur: 0 });
  const { elementRef: subtitleRef, style: subtitleBlurStyle } = useBlurReveal<HTMLParagraphElement>({ maxBlur: 8, minBlur: 0 });

  useEffect(() => {
    setTimeout(() => setTitleLinesVisible([0]), 600);
    setTimeout(() => setSubtitleLinesVisible([0]), 1600);
  }, []);

  const handleAreaClick = (areaName: string) => {
    setSelectedArea(areaName);
    router.push(`/${locale}/properties?location=${encodeURIComponent(areaName)}`);
  };

  const regionClass = (region: RegionKey) =>
    cn(
      'transition-all duration-200',
      hoveredRegion === region ? 'fill-red-500' : 'fill-gray-200',
      'stroke-white stroke-1'
    );

  return (
    <section className="relative bg-black py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 ref={titleRef} style={titleBlurStyle} className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span
              className={cn(
                'block transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
                titleLinesVisible.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              Where We Operate
            </span>
          </h2>

          <p ref={subtitleRef} style={subtitleBlurStyle} className="text-xl text-gray-300 max-w-3xl mx-auto">
            <span
              className={cn(
                'block transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
                subtitleLinesVisible.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              From the South-West&apos;s private sea-view villas to Palma&apos;s historic penthouses, we specialise in the island&apos;s most sought-after locations
            </span>
          </p>
        </div>

        <div className="relative bg-gradient-to-br from-gray-900/30 to-gray-800/20 rounded-3xl border border-white/10 p-8 md:p-12 overflow-hidden">
          <div className="relative w-full rounded-2xl border border-white/10 overflow-hidden bg-white aspect-video">
           
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 841.9 595.3"
              className="absolute inset-0 w-full h-full z-10"
              style={{ pointerEvents: 'auto' }}
            >
              {/* CENTRAL */}
              <path
                className={regionClass('central')}
                d="M634.3,228.5l-4.9,0.4l-5.7,5.4l-3.9,2.7l-0.3,0l-0.4,0.4L602,235l-49.6,7.7l-36.2-17.2h-10.5l-26.6-36l-8.4-4.3l-6.1-12.5l-12-6.6l3.3-6.5l-5.6-5.7l-95.3,23.6l-9.3,6.3l-7.7,1L338,186l-6.6,5.5c0,0-11.5,2.8-18.7,5.5c-7.3,2.8-5.4,6.7-5.4,8.6s-0.9,17.5-0.9,17.5l-4.8,1.5c0,0-9.4,19.6-9.4,23.6s2.1,8.3,2.1,8.3l-1.6,0.1l-7,27.4l-6,27.4l10.1,11.3c0,0,7.3,13.1,9.6,15.6c2.3,2.5,6.4,2.7,8.6,4.3c2.3,1.6,4.8,8.6,4.3,10c-0.5,1.4,0.9,1.8,0.9,1.8l21.2,10.4l17.3,17.7l2.4-2.3l1.5-2.2l5.3-9.6l17.4-15.1l13.5-8L429,370l5.7,1.1l3.9-0.9l4.1,1.4l4.6,2.1l5-4.4l5.7-5.5h7.8l4.6,1.6l8.2,6.7l68.8-29.9l6.1,2.3l9,1.2l6.5-2.8l0.9-5.1l-4-8l-0.9,0l1.5-9.4l8.2-21.9l2.4-8l9.6-7l2.7-7.2l2.3-0.1l7.8-0.5l1.4-2.1l20.1-30.4l0.4,0.3l0.1-0.1l5.5,3.2l5.1-2.7l4.5-5.2l1.1-5.2L634.3,228.5z"
                onMouseEnter={() => setHoveredRegion('central')}
                onMouseLeave={() => setHoveredRegion(null)}
              />

              {/* PALMA */}
              <path
                className={regionClass('palma')}
                d="M334.8,364.9l-12-7c0,0-6.3-2.5-8.6-3.2c-2.3-0.7-0.7-2-0.7-2s-2.7-7.7-5.7-10c-2.9-2.3-8.2-2.7-10-6.8c-1.8-4.1-6.8-12-7.2-13.1c-0.5-1.1-11.1-10.4-11.1-10.4s-27.2,20.6-28.3,20.8c-0.9,0.2-6.9,1.8-9.8,2.5l1.2,0l0.2,8.4l5,5l0.4,2l3.6-2.2l4.1,1.4c0,0,2.7,2.5,2.9,3.4c0.2,0.9,6.3,0.9,6.3,0.9l6.6-1.4l2-2.9l-5.2-5.9c0,0,2-2.9,3.2-4.5c1.1-1.6,8.4,0,8.4,0l11.6,3.6l8.2,2.7l1.6,2.9l0.2,4.1l6.3,3.4c0,0,3.9,6.1,4.5,7.7c0.7,1.6,8.6,1.1,8.6,1.1s5.7,3.6,8.4,5.7c2.7,2,9.3,12.7,9.3,12.7l0.5,0.1c0.2-0.9,0.3-1.4,0.3-1.4l9.4,2.5l2.6-2.5L334.8,364.9z"
                onMouseEnter={() => setHoveredRegion('palma')}
                onMouseLeave={() => setHoveredRegion(null)}
              />

              {/* NORTH */}
              <path
                className={regionClass('north')}
                d="M637.7,209.7c-3.7-4.6-13.8-11.5-27.1-18.9c-13.3-7.4-25.3-16.6-32.2-24.4s-12.9-19.3-11.5-28.5c1.4-9.2,6.9-14.3,8.3-12c1.4,2.3,0,7.8,3.2,5.5c3.2-2.3,1.8-7.4,9.2-6c7.4,1.4,4.6,6,10.1,2.8c5.5-3.2,16.6-22.5,16.6-24.8c0-2.3-4.1-0.9-5.1-3.7c-0.9-2.8,3.2-8.7,3.2-8.7l-3.2-3.2l11-5.1c0,0,0.5-4.6-4.6-5.5c-5.1-0.9-10.1,3.7-10.1,3.7l-8.7,7.8c0,0-11.5,8.3-15.2,8.7c-3.7,0.5-7.8-2.3-7.8-2.3l-4.6,4.6l-6.9,1.4l-1.8,4.6c0,0,1.4,4.1-1.8,0.9c-3.2-3.2-7.4-0.9-10.6-8.7c-3.2-7.8-5.5-17.9-4.6-21.2c0.9-3.2,2.3-8.7,6.4-8.3c4.1,0.5,8.3,8.3,8.3,8.3l2.8,2.8c0,0,3.7-0.5,4.1-1.8c0.5-1.4,0.5-6,0.5-6s-0.5-1.8-0.9-3.2c-0.5-1.4,2.3-3.2,2.3-3.2l8.3-3.7V52c0,0,1.8-0.9,4.1,1.8c2.3,2.8,2.8,5.5,2.8,5.5s5.1-0.9,6.4-0.9c1.4,0,6.4-7.8,10.6-9.2c4.1-1.4,10.1-0.9,13.3-5.5c3.2-4.6,12-8.3,12.4-12c0.5-3.7-0.5-8.7-0.5-8.7h-8.3l-5.5,2.3l-7.4,3.2V23l-9.2,0.9l-8.7,2.3L577,29l-3.7,7.4c0,0-4.6,6-8.3,6h-7.4c-5.5,0-10.1,0.9-10.1,0.9s-3.2,6.9-6.9,7.4c-3.7,0.5-4.1,0.9-5.5,0.9c-1.4,0-5.5-6.4-5.5-6.4l-6.4-1.4c0,0-3.2-2.3-5.5-2.8c-2.3-0.5-6.4,0-6.4,0l-7.4,4.6l-16.1,7.8c0,0-1.4,6.4-2.8,7.8c-1.4,1.4,0.5,3.7-5.1,2.8c-5.5-0.9-9.7-5.5-13.8-6.9c-4.1-1.4-6-0.9-9.2,2.8c-3.2,3.7-4.6,8.7-4.6,8.7l-10.1,0.9l-4.6,6.4l-8.7-1.4l-9.7,8.7l-6.9,6h-12.9l-0.9,4.1l-15.2,8.7l-15.6-1.8l-0.9,5.5c0,0-2.3-2.8-9.7,0c-7.4,2.8-8.3,17.5-11,22.1c-2.8,4.6,1.4,8.7-5.1,6.9c-6.4-1.8-6-9.7-6-9.7s0.5-2.8-4.6,1.4c-3.4,2.8-7.9,7.7-10.4,10.6c0,0,0.1,0,0.1,0l22.1,30l-3.3,6.7l-0.8,11l7.7-1l9.3-6.3l95.3-23.6l5.6,5.7l-3.3,6.5l12,6.6l6.1,12.5l8.4,4.3l26.6,36h10.5l36.2,17.2L602,235l3.9,0.5c1.6-2.4,4.1-5.7,6.1-6.5c3.2-1.4,17.9-10.6,19.8-12C633.6,215.7,641.4,214.3,637.7,209.7z"
                onMouseEnter={() => setHoveredRegion('north')}
                onMouseLeave={() => setHoveredRegion(null)}
              />

              {/* NORTH EAST */}
              <path
                className={regionClass('northEast')}
                d="M781.8,213.1h-13.9l1.8-5.1l3-6.6l-0.3-9.7l-12.4,2.7l-7.2-2.4l-2.7-4.2l-3.3,0.9l-4.8-5.4l-6-5.1l-12.7,0.6l-10-12.1l-6.9-6.6l-3-2.4l-11.2,9.4l1.5,8.8l-6,6.9l-17.8,12.1l-9.1,3.3l-13.3,6.6l-13,0.6c0,0,1.5,1.5,2.3,3.2c0.4,0.4,0.8,0.9,1.1,1.3c3.7,4.6-4.1,6-6,7.4c-1.8,1.4-16.6,10.6-19.8,12c-1.9,0.8-4.3,3.9-5.9,6.3l7.7,0.8l6,0.9l3.9-2.7l5.7-5.4l5.7-0.6l3.3,5.1l-1.2,5.1l-4.5,5.4l-5.4,2.7l-5.7-3.3l-22.1,32.3l-9.4,0.6l-3.3,7.6l-9.1,6.6l-11.2,29.9l-1.5,9.4l40.6-0.2l5.4-4.1l11.6-4.3l3.2,7.3l5.9,8.2l10.2,5.9l8.7,9.8l4,8.9l11,6.3l15.4-2.1l3.4,3.4l1.7,3l4.8-2.1l4.8-4.2l2.4-6l0.9-3.3l7.2-1.2l5.4-2.1l9.1-9.7l1.8-11.8l6.9,0.3l6.6-2.4l1.8-3.9l-4.2-2.4c0,0-5.1-6.3-5.1-7.6c0-1.2,2.1-16.3,2.1-16.3s5.7-12.4,5.7-13.6c0-1.2,3.6-3.6,3.6-3.6l4.8,3.9l9.1,0.9l3.9-0.9l3-12.1l0.3-6l8.8,2.4v-28.7c0-1.8,0.3-10,0.3-10l1.8-4.2l1.8-4.2l5.1,1.2l4.5,1.2l1.8-6.9L781.8,213.1z"
                onMouseEnter={() => setHoveredRegion('northEast')}
                onMouseLeave={() => setHoveredRegion(null)}
              />

              {/* PALMA SURROUNDINGS */}
              <path
                className={regionClass('palmaSurroundings')}
                d="M279.4,311.4l6-27.4l7-27.4l1.6-0.1l-6.9,0.6l-7.3-3.7l-0.3,10.1l-4.5,2.1l-2.1-8.3l-7.6-3.1l-2.7-5.5l-8.8,1.8c0,0-6.3-5.8-13.9-8.3c-7.6-2.4-8.5,6.7-8.5,6.7l-13.9,0.3c0,0-1.8,8-5.1,12.9c-3.3,4.9-11.8,0.6-11.8,0.6l-24.6,33.8l3.7,4.5c0,0-8.8,16.1-10,18.1c-1.1,2,10.6,2,10.6,2l42.1-5l6.6,10.6l-2.3,3.9l1.8,5.2l13.8-0.5l9.3-2.3l28-21.3L279.4,311.4z"
                onMouseEnter={() => setHoveredRegion('palmaSurroundings')}
                onMouseLeave={() => setHoveredRegion(null)}
              />

              {/* SOUTH */}
              <path
                className={regionClass('south')}
                d="M349.1,384.9l-9.4-2.5c0,0-1.6,8-3.4,8.3c-1.8,0.2-5.7,2.3-6.2,3.2c-0.5,0.9-3.9,6.4-4.8,7.3c-0.9,0.9-4.6,1.6-4.1,4.4c0.5,2.8,2.5,8.3,4.4,10.6c1.8,2.3,9.6,11.2,10.1,16.5c0.5,5.3,1.6,2.8-0.5,10.1c-2.1,7.3-7.6,10.3-4.1,15.6c3.4,5.3,12.4,18.1,13.3,18.8c0.9,0.7,14.5,18.6,17.7,19c3.2,0.5,9.9-0.5,12.2-1.4c2.3-0.9,2.5,3.7,6.2,5.5c3.7,1.8,3.7,2.3,5.7,2.3s3.7-1.4,7.1-3c3.4-1.6,1.1-4.1,5.3-4.1c4.1,0,6.2,1.4,7.6,1.8c1.4,0.5,14.2-0.2,14.9-0.2c0.7,0,2.8-0.9,3.9-0.5c1.1,0.5,13.1,8,13.1,8l5.3-3c0,0,3.4-4.8,4.1-5.3c0.7-0.5,3.2-2.5,3.2-2.5l-0.7-14.9c0,0,5.5-9.6,6.7-10.6c1.1-0.9,1.8-10.3,1.8-10.3s5.5-8.5,6.2-8.5c0.7,0,8.3-7.6,8.3-7.6l-1.6-8.3l-4.4-5.3v-10.8l3.2-1.6l-1.6-13.3l5.7-3.2l3.7-5l-2.8-3.9l-3.4-3.9l1.8-7.3l5.7-6.9l-8.7-7.1l-4.6-1.6h-7.8l-5.7,5.5l-5,4.4l-4.6-2.1l-4.1-1.4l-3.9,0.9L429,370l-37.4-24.8l-13.5,8l-17.4,15.1l-5.3,9.6l-2.1,3L349.1,384.9z"
                onMouseEnter={() => setHoveredRegion('south')}
                onMouseLeave={() => setHoveredRegion(null)}
              />

              {/* SOUTH EAST */}
              <path
                className={regionClass('southEast')}
                d="M686,371.7l-1.7-3l-3.4-3.4l0,0l-15.4,2.1l-11-6.3l-4-8.9l-8.7-9.8l0,0l-3.7-2.1l-6.5-3.8l0,0l0,0l-3.2-4.5l-2.7-3.7l-1.3-2.9l-1.9-4.4l-11.6,4.3l-5.4,4.1l-24,0.1l-16.6,0.1l0,0h0l3.9,7.9l-0.5,4.3l-3.6,1.8l-4.1,0.7h-6.6l-6.3-2.3l-70.9,31v1.8l-3.9,4.8l-2.5,8.4l6.1,7.7l-3.6,5l-5.7,3.2l1.6,13.1l-3.2,1.6v10.6l4.3,5.2l1.6,8.2l-8.2,7.5l-6.1,8.4l-1.8,10.2l-6.6,10.4l0.7,14.7l4.5,2.5c0,0,4.5,1.4,6.1,1.8c1.6,0.5,6.6-0.2,6.6-0.2l0.7-0.9l7.9,7.7l7.2,7.5l1.1,5.4l-0.5,5.7l-2.9,8.4c0,0,0,3.6,1.4,5.2l1.4,1.6l5.2,1.1l2,5.9c0,0,1.6,0.7,4.5,3.2c2.9,2.5,2.5,3.6,4.8,4.1c2.3,0.5,4.5,6.1,4.5,6.1s3.2,1.6,4.1,2c0.9,0.5,2.9,0.7,3.4,1.6c0.5,0.9,0.2,2,2.7,5c2.5,2.9,5.2,7.5,5.2,7.5s5.9,1.8,8.4,2c2.5,0.2,5.2,0,6.3-0.9c1.1-0.9,3.6-5.7,4.5-5.9c0.9-0.2,29.5-35.1,29.5-35.1s4.5,1.8,5.2,1.8c0.7,0,3.6-0.9,3.6-0.9l1.8-2l0.7-3.9c0,0,1.1-4.5,1.8-4.5c0.7,0,2.9-0.2,2.9-0.2s2.3,1.1,3.2,1.4c0.9,0.2,4.1,1.1,5.2,0.9c1.1-0.2,17-10.4,17.4-11.1c0.5-0.7,0-5.4,0-5.4s-1.8-5-0.9-5c0.9,0,4.8,0.7,5.7,0.7c0.9,0,6.1-1.8,6.1-1.8l1.8-7.7l1.8,3.2l3.9,1.6c0,0,5.4-3.9,6.3-4.8c0.9-0.9,15-25.8,15-25.8l2-7.9l4.3-7l-2.7-3.4l0.7-2.3l1.1-0.2l3.2,4.3l2.5,0.9l0.9-3.6c0,0,2.9-27.4,6.3-37.6c3.4-10.2,18.6-41.5,18.6-41.5l-0.9-1.6L686,371.7z"
                onMouseEnter={() => setHoveredRegion('southEast')}
                onMouseLeave={() => setHoveredRegion(null)}
              />

              {/* SOUTH WEST */}
              <path
                className={regionClass('southWest')}
                d="M242.9,344l-0.2-8.4l-13.8,0.5l-1.8-5.2l2.3-3.9l-6.6-10.6l-42.1,5c0,0-11.8,0-10.6-2c1-1.8,7.7-14,9.5-17.3c0.2-0.3,0.3-0.6,0.5-0.9l-3.7-4.5l-0.8,1.1l-24.6-21.7l-1.6-1.3c0,0-6.4,1.1-10.3,4.8c-3.9,3.7-13.2,9.4-13.2,9.4s-25.4,10.6-28.6,11.4c-3.3,0.8-20.1,3.6-7.9,24.4c-1.8,6.9-6.3,11.4-2.6,17.2c2.4,3.6,19.4,5.5,19.4,5.5l1.6,8.5c0,0-3.9-1.1-4.3,2.7c-0.5,3.9-3.7,5.7,1.6,6.2c5.3,0.5,10.1-1.8,11.2-1.1c1.1,0.7,1.1,6.6,1.4,7.8c0.2,1.1,1.6,2.5,3.7,1.8c2.1-0.7,8.7-5.3,9.1-5.9c0.5-0.7,2.1-10.5,5.3-7.1s2.7,11,2.7,11s1.6,0.2,4.1-0.5c2.5-0.7,7.5-3.4,9.1-3.9c1.6-0.5,7.3-5.5,8.9-4.6c1.6,0.9,5.9,9.1,5.9,9.1s-1.4,6.2-2.1,6.6c-0.7,0.5-8.5,11.4-8.2,12.6c0.2,1.1,5.3,0.9,6.4,0.7c1.1-0.2,2.5,2.1,2.5,2.1s3.2,3.7,4.1,3.9c0.9,0.2,3.9,3,3.9,3L175,411l-5.9,8.2l1.8,1.8l5-5c0,0,4.3-4.3,5-4.1c0.7,0.2,5.5,2.3,5.5,3.4c0,1.1,1.6,5.9,1.6,5.9l12.6,5.3c0,0,2.5-0.5,3.4-1.4c0.9-0.9,3.2-5,3.2-6.6s-1.1-6.9,1.1-8.2c2.3-1.4,9.1-15.1,9.1-15.1l-1.8-4.8l2.1-3l3.2-3l-0.2-3.2l-3.7-4.6l-1.4-2.3c0,0-0.2-1.6,1.1-2.5c1.4-0.9,3.7-2.3,4.3-2.3c0.7,0,7.1-1.6,7.8-1.6c0.7,0,11.2,0.2,13.7-0.5c2.5-0.7,4.8-3.2,4.8-4.8c0-1.6,1.4-9.6,1.4-9.6l-0.9-4.1L242.9,344z"
                onMouseEnter={() => setHoveredRegion('southWest')}
                onMouseLeave={() => setHoveredRegion(null)}
              />

              {/* WEST */}
              <path
                className={regionClass('west')}
                d="M320.1,137c0,0-6,1.2-6.6,2.1c-0.6,0.9-3.9,1.2-5.4,3.1s-3.9,3.4-4.2,5.8c-0.3,2.4,0.9,4.9-1.8,4.9s-4.8-3.7-7.6-0.3c-2.7,3.4-2.4,5.5-5.1,10.7c-2.7,5.2-2.4,8.6-5.1,9.5c-2.7,0.9-4.8,2.1-6.3,2.4c-1.5,0.3-4.2,0.6-6.6,1.2c-2.4,0.6-6,0.6-6.9,2.8c-0.9,2.1-1.5,1.8-1.8,4.6c-0.3,2.8-1.2,6.7-2.4,8.3c-1.2,1.5-13,11.6-13.9,14.1c-0.9,2.4-13.3,19.6-23.3,20.5c-10,0.9-19.9,1.5-19.9,1.5l-5.1,8.3c0,0-6.9,2.4-7.6,1.2c-0.6-1.2-8.2,10.4-8.2,10.4s3.3,5.2,0,5.2c-3.3,0-5.7-1.8-6.3-0.6c-0.6,1.2-8.8,10.7-9.7,12.2c-0.9,1.5-12.4,7.3-12.4,7.3l-3.6,3l25.3,22.4l25.4-34.9c0,0,8.5,4.3,11.8-0.6c3.3-4.9,5.1-12.9,5.1-12.9l13.9-0.3c0,0,0.9-9.2,8.5-6.7c7.6,2.5,13.9,8.3,13.9,8.3l8.8-1.8l2.7,5.5l7.6,3.1l2.1,8.3l4.5-2.1l0.3-10.1l7.3,3.7l6.9-0.6c0,0-2.1-4.3-2.1-8.3s9.4-23.6,9.4-23.6l4.8-1.5c0,0,0.9-15.6,0.9-17.5s-1.8-5.8,5.4-8.6c7.2-2.8,18.7-5.5,18.7-5.5l6.6-5.5l0.9-12.2l3.3-6.7L320.1,137z"
                onMouseEnter={() => setHoveredRegion('west')}
                onMouseLeave={() => setHoveredRegion(null)}
              />
            </svg>

            <div className="absolute inset-0 z-20 pointer-events-none">
              {areas.map((area) => (
                <div
                  key={area.name}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${area.x}%`,
                    top: `${area.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <button
                    type="button"
                    className="pointer-events-auto relative"
                    onClick={() => handleAreaClick(area.name)}
                    aria-label={`View properties in ${area.name}`}
                  >
                    <div className="relative filter drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]">
                      <MapPin className="w-9 h-9 text-gray-600 transition-all duration-300" fill="#2563eb" />
                    </div>
                    <div
                      className={cn(
                        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg',
                        selectedArea === area.name ? 'w-3 h-3' : 'w-2.5 h-2.5'
                      )}
                    />
                  </button>

                  <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                    <span className="text-white text-xs font-semibold bg-gray-700/80 backdrop-blur-sm px-2 py-1 rounded-full border border-gray-400/50">
                      {area.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">Click on any area to view available properties.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
