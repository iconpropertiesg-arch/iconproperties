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
  const tPurpose = useTranslations('purpose');
  const [purpose, setPurpose] = useState<'buy' | 'rent'>('buy');
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [area, setArea] = useState('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 20000, max: 35000000 });
  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const [filteredLocations, setFilteredLocations] = useState<string[]>(mockLocations.slice(0, 8));
  const areaInputRef = useRef<HTMLInputElement>(null);
  const typeButtonRef = useRef<HTMLButtonElement>(null);
  const borderContainerRef = useRef<HTMLDivElement>(null);

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
    // When no type is selected, show translated generic placeholder
    if (propertyType.length === 0) return t('searchPlaceholder.type');
    if (propertyType.length === 1) return tCommon(propertyType[0]);
    // For multiple selected types, fall back to count-based English label
    return `${propertyType.length} types selected`;
  };

  const minPrice = 20000;
  const maxPrice = 35000000;

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
    let minText = formatPrice(priceRange.min).toLowerCase();
    let maxText = formatPrice(priceRange.max).toLowerCase();
    // Replace "m" with "million" for better readability
    minText = minText.replace('m', 'million');
    maxText = maxText.replace('m', 'million');
    return `${minText} to ${maxText}`;
  };

  const getPercentage = (value: number) => {
    return ((value - minPrice) / (maxPrice - minPrice)) * 100;
  };

  const handleSliderMouseDown = (type: 'min' | 'max', e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(type);
  };

  const handleSliderMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const sliderContainer = document.querySelector('.price-slider-container');
    const slider = sliderContainer?.querySelector('.price-slider-track') as HTMLElement;
    if (!slider) return;
    
    const rect = slider.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const value = minPrice + (percent / 100) * (maxPrice - minPrice);
    
    if (isDragging === 'min') {
      setPriceRange(prev => ({ ...prev, min: Math.min(Math.round(value), prev.max - 10000) }));
    } else {
      setPriceRange(prev => ({ ...prev, max: Math.max(Math.round(value), prev.min + 10000) }));
    }
  }, [isDragging, minPrice, maxPrice]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleSliderMove);
      document.addEventListener('mouseup', () => setIsDragging(null));
      document.addEventListener('touchmove', handleSliderMove);
      document.addEventListener('touchend', () => setIsDragging(null));
      return () => {
        document.removeEventListener('mousemove', handleSliderMove);
        document.removeEventListener('mouseup', () => setIsDragging(null));
        document.removeEventListener('touchmove', handleSliderMove);
        document.removeEventListener('touchend', () => setIsDragging(null));
      };
    }
  }, [isDragging, handleSliderMove]);

  const handleSearch = () => {
    // Track search event for Meta Ads
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Search', {
        content_name: 'Property Search',
        content_category: 'Search',
        search_string: area || 'Mallorca',
        purpose: purpose,
        property_types: propertyType.join(','),
        price_range: `${priceRange.min}-${priceRange.max}`,
      });
    }

    // Build query parameters
    const params = new URLSearchParams();
    if (purpose) params.set('purpose', purpose);
    if (propertyType.length > 0) params.set('type', propertyType.join(','));
    if (area) params.set('location', area);
    if (priceRange.min !== minPrice) params.set('minPrice', priceRange.min.toString());
    if (priceRange.max !== maxPrice) params.set('maxPrice', priceRange.max.toString());
    
    // Redirect to properties page with filters
    router.push(`/${locale}/properties?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div 
      className={`relative z-10 mx-auto px-3 sm:px-4 md:px-6 lg:px-8 ${hideTitle ? 'my-0' : '-mt-8 sm:-mt-12 md:-mt-16 mb-8 sm:mb-12 md:mb-16'} lg:max-w-[750px]`}
    >
      {!hideTitle && (
        <div className="text-center mb-6 sm:mb-8 mt-8 sm:mt-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            {t('title')}
          </h2>
        </div>
      )}
      
      {/* Glassmorphic Search Bar */}
      <div className="glow-wrapper overflow-hidden lg:overflow-visible">
        <div 
          ref={borderContainerRef}
          className="relative bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-full border border-white/20 p-2 sm:p-3 lg:p-2 shadow-2xl revolving-border-line"
          style={{
            boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3), 0 0 60px rgba(59, 130, 246, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
          }}
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-1 sm:gap-1.5 p-1 sm:p-2 overflow-visible">
            {/* Buy / Rent Dropdown */}
            <div className="relative flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsPurposeOpen(!isPurposeOpen);
                  setIsTypeOpen(false);
                  setIsAreaOpen(false);
                }}
                className="w-full lg:w-auto lg:min-w-[100px] flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl lg:rounded-full px-3 sm:px-4 lg:px-3 py-2.5 sm:py-3 lg:py-3 text-white transition-all duration-200"
              >
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  {tPurpose(purpose)}
                </span>
                <ChevronDown className={cn("w-3.5 h-3.5 sm:w-4 ml-1.5 sm:ml-2 transition-transform flex-shrink-0", isPurposeOpen && "rotate-180")} />
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
                      className="w-full px-6 py-3 text-left text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                      {tPurpose('buy')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPurpose('rent');
                        setIsPurposeOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                      {tPurpose('rent')}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-white/20 mx-1" />

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
                className="w-full lg:w-auto lg:min-w-[60px] lg:max-w-[180px] flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl lg:rounded-full px-3 sm:px-4 py-2.5 sm:py-3 lg:py-3 text-white transition-all duration-200"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {propertyType.length === 0 && <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />}
                  {propertyType.length > 0 && (
                    <span className="text-xs sm:text-sm truncate">{getTypeDisplayText()}</span>
                  )}
                </div>
                <ChevronDown className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform flex-shrink-0", isTypeOpen && "rotate-180")} />
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
                            "w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors",
                            isSelected && "bg-gray-100 text-gray-900"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium text-gray-900">{type.label}</span>
                          {isSelected && <div className="ml-auto w-2 h-2 bg-gray-900 rounded-full" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-white/20 mx-1" />

            {/* Area Dropdown */}
            <div className="relative flex-1 min-w-0 lg:min-w-[140px]">
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
                  className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl lg:rounded-full px-3 sm:px-4 lg:px-3 py-2.5 sm:py-3 lg:py-3 pl-7 sm:pl-8 lg:pl-8 text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-200"
                />
                <MapPin className="absolute left-2 sm:left-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-3.5 text-white/60 flex-shrink-0" />
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
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors"
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
            <div className="hidden lg:block w-px h-8 bg-white/20 mx-1" />

            {/* Price Range Slider - Inline */}
            <div className="relative flex-[0.9] min-w-0 lg:min-w-[140px] price-slider-container">
              <div className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl lg:rounded-full px-2.5 sm:px-3 lg:px-2.5 py-2.5 sm:py-3 lg:py-2.5">
                  <div className="space-y-1 sm:space-y-1">
                  {/* Price Display */}
                  <div className="flex items-center gap-1 text-white">
                    <Euro className="w-2.5 h-2.5 sm:w-3 flex-shrink-0" />
                    <span className="text-xs font-medium truncate">{getPriceDisplayText()}</span>
                  </div>
                  
                  {/* Slider Track */}
                  <div className="relative w-full py-1">
                    <div 
                      className="price-slider-track relative w-full h-1 bg-white/20 rounded-full cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                        const value = minPrice + (percent / 100) * (maxPrice - minPrice);
                        const distanceToMin = Math.abs(value - priceRange.min);
                        const distanceToMax = Math.abs(value - priceRange.max);
                        
                        if (distanceToMin < distanceToMax) {
                          setPriceRange(prev => ({ ...prev, min: Math.min(Math.round(value), prev.max - 10000) }));
                        } else {
                          setPriceRange(prev => ({ ...prev, max: Math.max(Math.round(value), prev.min + 10000) }));
                        }
                      }}
                    >
                      {/* Active Range */}
                      <div 
                        className="absolute h-1 bg-gray-600 rounded-full"
                        style={{
                          left: `${getPercentage(priceRange.min)}%`,
                          width: `${getPercentage(priceRange.max) - getPercentage(priceRange.min)}%`,
                        }}
                      />
                      
                      {/* Min Handle */}
                      <div
                        className="absolute top-1/2 w-4 h-4 bg-gray-700 rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing hover:bg-gray-800 transition-colors z-20 touch-none"
                        style={{ 
                          left: `${getPercentage(priceRange.min)}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        onMouseDown={(e) => handleSliderMouseDown('min', e)}
                        onTouchStart={(e) => handleSliderMouseDown('min', e)}
                      />
                      
                      {/* Max Handle */}
                      <div
                        className="absolute top-1/2 w-4 h-4 bg-gray-700 rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing hover:bg-gray-800 transition-colors z-20 touch-none"
                        style={{ 
                          left: `${getPercentage(priceRange.max)}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        onMouseDown={(e) => handleSliderMouseDown('max', e)}
                        onTouchStart={(e) => handleSliderMouseDown('max', e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-white/20 mx-1" />

            {/* Search Button */}
            <button
              type="button"
              onClick={handleSearch}
              className="w-full lg:w-auto flex-shrink-0 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm font-semibold rounded-xl lg:rounded-full px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-2.5 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5 sm:w-3.5 flex-shrink-0" />
              <span>{t('searchButton')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

