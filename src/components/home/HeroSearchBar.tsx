'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown, Search, MapPin, Home, Building, Store, Euro } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSearchBarProps {
  locale: string;
  hideTitle?: boolean;
}

const propertyTypes = [
  { key: 'apartment', icon: Building, label: 'Apartment' },
  { key: 'house', icon: Home, label: 'House' },
  { key: 'commercial', icon: Store, label: 'Commercial' },
];

const mockLocations = [
  'Portals Nous', 'Puerto Portals', 'Santa Ponsa', 'Port Adriano', 'Andratx',
  'Puerto de Andratx', 'Camp de Mar', 'Paguera', 'Calvia', 'Palma',
  'Son Vida', 'Bendinat', 'Costa de los Pinos', 'Cala Ratjada', 'Puerto Pollensa',
];

export default function HeroSearchBar({ locale, hideTitle = false }: HeroSearchBarProps) {
  const router = useRouter();
  const t = useTranslations('hero');
  const tCommon = useTranslations('propertyTypes');
  const [purpose, setPurpose] = useState<'buy' | 'rent'>('buy');
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [area, setArea] = useState('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 20000, max: 70000000 });
  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const [filteredLocations, setFilteredLocations] = useState<string[]>(mockLocations.slice(0, 8));
  const areaInputRef = useRef<HTMLInputElement>(null);
  const typeButtonRef = useRef<HTMLButtonElement>(null);

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
    if (propertyType.length === 0) return 'Home';
    if (propertyType.length === 1) return tCommon(propertyType[0]);
    return `${propertyType.length} types selected`;
  };

  const minPrice = 20000;
  const maxPrice = 70000000;

  const formatPrice = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
    }
    return value.toLocaleString('en-US');
  };

  const getPriceDisplayText = () => {
    const minText = formatPrice(priceRange.min);
    const maxText = formatPrice(priceRange.max);
    return `${minText} - ${maxText}`;
  };

  const getPercentage = (value: number) => {
    return ((value - minPrice) / (maxPrice - minPrice)) * 100;
  };

  const handleSliderMouseDown = (type: 'min' | 'max', e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleSliderMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const sliderContainer = document.querySelector('.price-slider-container');
    const slider = sliderContainer?.querySelector('.price-slider-track') as HTMLElement;
    if (!slider) return;
    
    const rect = slider.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const value = minPrice + (percent / 100) * (maxPrice - minPrice);
    
    if (isDragging === 'min') {
      setPriceRange(prev => ({ ...prev, min: Math.min(Math.round(value), prev.max - 1000) }));
    } else {
      setPriceRange(prev => ({ ...prev, max: Math.max(Math.round(value), prev.min + 1000) }));
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleSliderMove);
      document.addEventListener('mouseup', () => setIsDragging(null));
      return () => {
        document.removeEventListener('mousemove', handleSliderMove);
        document.removeEventListener('mouseup', () => setIsDragging(null));
      };
    }
  }, [isDragging, priceRange]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (purpose) params.set('purpose', purpose);
    if (propertyType.length > 0) params.set('type', propertyType.join(','));
    if (area) params.set('location', area);
    if (priceRange.min !== minPrice) params.set('minPrice', priceRange.min.toString());
    if (priceRange.max !== maxPrice) params.set('maxPrice', priceRange.max.toString());
    router.push(`/${locale}/properties?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className={`relative z-10 container mx-auto px-4 ${hideTitle ? 'my-0' : '-mt-16 mb-16'}`}>
      {!hideTitle && (
        <div className="text-center mb-8 mt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Find Your Ideal Property in Mallorca
          </h2>
        </div>
      )}
      
      {/* Glassmorphic Search Bar */}
      <div className="relative">
        <div 
          className="relative bg-white/10 backdrop-blur-xl rounded-full border border-white/20 p-2 shadow-2xl search-bar-animated-border overflow-visible"
          style={{
            boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3), 0 0 60px rgba(59, 130, 246, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
          }}
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 p-2 overflow-visible">
            {/* Buy / Rent Dropdown */}
            <div className="relative flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsPurposeOpen(!isPurposeOpen);
                  setIsTypeOpen(false);
                  setIsAreaOpen(false);
                }}
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
                  <div className="fixed inset-0 z-[100]" onClick={() => setIsPurposeOpen(false)} />
                  <div className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden z-[110]">
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
            <div className="relative flex-shrink-0" style={{ zIndex: isTypeOpen ? 200 : 'auto' }}>
              <button
                ref={typeButtonRef}
                type="button"
                onClick={() => {
                  setIsTypeOpen(!isTypeOpen);
                  setIsPurposeOpen(false);
                  setIsAreaOpen(false);
                }}
                className="w-full lg:w-auto min-w-[120px] max-w-[180px] flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-6 py-4 text-white transition-all duration-200"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {propertyType.length === 0 && <Home className="w-4 h-4 flex-shrink-0" />}
                  <span className="text-sm truncate">{getTypeDisplayText()}</span>
                </div>
                <ChevronDown className={cn("w-4 h-4 transition-transform flex-shrink-0", isTypeOpen && "rotate-180")} />
              </button>
              {isTypeOpen && (
                <>
                  <div className="fixed inset-0 z-[190]" onClick={() => setIsTypeOpen(false)} />
                  <div className="absolute top-full left-0 w-full lg:w-auto lg:min-w-[200px] mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden z-[200]">
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
                onFocus={() => {
                  setIsAreaOpen(true);
                  setIsPurposeOpen(false);
                  setIsTypeOpen(false);
                }}
                onBlur={() => setTimeout(() => setIsAreaOpen(false), 200)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('searchPlaceholder.location')}
                  className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-6 py-4 pl-10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              </div>
              {isAreaOpen && filteredLocations.length > 0 && (
                <>
                  <div className="fixed inset-0 z-[100]" onClick={() => setIsAreaOpen(false)} />
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden z-[110] max-h-64 overflow-y-auto">
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

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-white/20 mx-2" />

            {/* Price Range Slider - Inline */}
            <div className="relative flex-1 min-w-0 price-slider-container">
              <div className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-6 py-4">
                <div className="space-y-3">
                  {/* Price Display */}
                  <div className="flex items-center gap-2 text-white">
                    <Euro className="w-4 h-4" />
                    <span className="text-sm font-medium">{getPriceDisplayText()}</span>
                  </div>
                  
                  {/* Slider Track */}
                  <div className="relative">
                    <div className="price-slider-track relative h-2 bg-white/20 rounded-full">
                      {/* Active Range */}
                      <div 
                        className="absolute h-2 bg-blue-500 rounded-full"
                        style={{
                          left: `${getPercentage(priceRange.min)}%`,
                          width: `${getPercentage(priceRange.max) - getPercentage(priceRange.min)}%`,
                        }}
                      />
                      
                      {/* Min Handle */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing hover:bg-blue-700 transition-colors z-10"
                        style={{ left: `calc(${getPercentage(priceRange.min)}% - 8px)` }}
                        onMouseDown={(e) => handleSliderMouseDown('min', e)}
                      />
                      
                      {/* Max Handle */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing hover:bg-blue-700 transition-colors z-10"
                        style={{ left: `calc(${getPercentage(priceRange.max)}% - 8px)` }}
                        onMouseDown={(e) => handleSliderMouseDown('max', e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-white/20 mx-2" />

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

