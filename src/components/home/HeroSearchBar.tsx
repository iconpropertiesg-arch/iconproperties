'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown, Search, MapPin, Home, Building, Store, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSearchBarProps {
  locale: string;
}

const propertyTypes = [
  { key: 'apartment', icon: Building, label: 'Apartment' },
  { key: 'house', icon: Home, label: 'House' },
  { key: 'villa', icon: Crown, label: 'Villa' },
  { key: 'commercial', icon: Store, label: 'Commercial' },
];

const mockLocations = [
  'Portals Nous', 'Puerto Portals', 'Santa Ponsa', 'Port Adriano', 'Andratx',
  'Puerto de Andratx', 'Camp de Mar', 'Paguera', 'Calvia', 'Palma',
  'Son Vida', 'Bendinat', 'Costa de los Pinos', 'Cala Ratjada', 'Puerto Pollensa',
];

export default function HeroSearchBar({ locale }: HeroSearchBarProps) {
  const router = useRouter();
  const t = useTranslations('hero');
  const tCommon = useTranslations('propertyTypes');
  const [purpose, setPurpose] = useState<'buy' | 'rent'>('buy');
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [area, setArea] = useState('');
  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>(mockLocations.slice(0, 8));
  const areaInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (area.length > 0) {
      const filtered = mockLocations.filter(location =>
        location.toLowerCase().includes(area.toLowerCase())
      );
      setFilteredLocations(filtered.slice(0, 8));
    } else {
      setFilteredLocations(mockLocations.slice(0, 8));
    }
  }, [area]);

  const handleTypeToggle = (type: string) => {
    if (propertyType.includes(type)) {
      setPropertyType(propertyType.filter(t => t !== type));
    } else {
      setPropertyType([...propertyType, type]);
    }
  };

  const getTypeDisplayText = () => {
    if (propertyType.length === 0) return t('searchPlaceholder.type');
    if (propertyType.length === 1) return tCommon(propertyType[0]);
    return `${propertyType.length} types selected`;
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (purpose) params.set('purpose', purpose);
    if (propertyType.length > 0) params.set('type', propertyType.join(','));
    if (area) params.set('location', area);
    router.push(`/${locale}/properties?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative z-10 container mx-auto px-4 -mt-16 mb-16">
      <div className="text-center mb-8 mt-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Find Your Ideal Property in Mallorca
        </h2>
      </div>
      
      {/* Glassmorphic Search Bar */}
      <div className="relative">
        <div 
          className="relative bg-white/10 backdrop-blur-xl rounded-full border border-white/20 p-2 shadow-2xl search-bar-animated-border"
          style={{
            boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3), 0 0 60px rgba(59, 130, 246, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
          }}
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 p-2">
            {/* Buy / Rent Dropdown */}
            <div className="relative flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsPurposeOpen(!isPurposeOpen)}
                className="w-full lg:w-auto min-w-[140px] flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-6 py-4 text-white transition-all duration-200"
              >
                <span className="text-sm font-medium">
                  {purpose === 'buy' ? 'Buy / Rent' : 'Rent / Buy'}
                </span>
                <ChevronDown className={cn("w-4 h-4 ml-2 transition-transform", isPurposeOpen && "rotate-180")} />
              </button>
              {/* Purpose dropdown */}
              {isPurposeOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsPurposeOpen(false)} />
                  <div className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden z-50">
                    <button
                      type="button"
                      onClick={() => {
                        setPurpose('buy');
                        setIsPurposeOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-gray-900 hover:bg-blue-50 transition-colors"
                    >
                      Buy
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPurpose('rent');
                        setIsPurposeOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-gray-900 hover:bg-blue-50 transition-colors"
                    >
                      Rent
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-white/20 mx-2" />

            {/* Property Type Dropdown */}
            <div className="relative flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setIsTypeOpen(!isTypeOpen)}
                className="w-full flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-6 py-4 text-white transition-all duration-200"
              >
                <span className="text-sm">{getTypeDisplayText()}</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", isTypeOpen && "rotate-180")} />
              </button>
              {isTypeOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsTypeOpen(false)} />
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden z-50">
                    {propertyTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = propertyType.includes(type.key);
                      return (
                        <button
                          key={type.key}
                          type="button"
                          onClick={() => handleTypeToggle(type.key)}
                          className={cn(
                            "w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-blue-50 transition-colors",
                            isSelected && "bg-blue-50 text-blue-600"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium text-gray-900">{type.label}</span>
                          {isSelected && <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-white/20 mx-2" />

            {/* Area Dropdown */}
            <div className="relative flex-1 min-w-0">
              <div className="relative">
                <input
                  ref={areaInputRef}
                  type="text"
                  value={area}
                  onChange={(e) => {
                    setArea(e.target.value);
                    setIsAreaOpen(true);
                  }}
                  onFocus={() => setIsAreaOpen(true)}
                  onBlur={() => setTimeout(() => setIsAreaOpen(false), 200)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('searchPlaceholder.location')}
                  className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-6 py-4 pl-10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              </div>
              {isAreaOpen && filteredLocations.length > 0 && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsAreaOpen(false)} />
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden z-50 max-h-64 overflow-y-auto">
                    {filteredLocations.map((location) => (
                      <button
                        key={location}
                        type="button"
                        onClick={() => {
                          setArea(location);
                          setIsAreaOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-blue-50 transition-colors"
                      >
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{location}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Search Button */}
            <button
              type="button"
              onClick={handleSearch}
              className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-full px-8 py-4 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

