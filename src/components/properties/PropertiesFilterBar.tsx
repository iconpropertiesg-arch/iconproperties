'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown, Search, MapPin, Home, Building, Store, Bell, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertiesFilterBarProps {
  locale: string;
  searchParams: { [key: string]: string | string[] | undefined };
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

export default function PropertiesFilterBar({ locale, searchParams }: PropertiesFilterBarProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const t = useTranslations('hero');
  const tCommon = useTranslations('propertyTypes');
  const tPurpose = useTranslations('purpose');
  
  // Initialize from URL params
  const initialPurpose = (searchParams.purpose as 'buy' | 'rent') || null;
  const initialType = Array.isArray(searchParams.type) 
    ? searchParams.type 
    : searchParams.type 
      ? [searchParams.type as string] 
      : [];
  const initialLocation = (searchParams.location as string) || '';
  const initialMinPrice = parseInt(searchParams.minPrice as string) || 0;
  const initialMaxPrice = parseInt(searchParams.maxPrice as string) || 39500000;
  
  const [purpose, setPurpose] = useState<'buy' | 'rent' | null>(initialPurpose);
  const [propertyType, setPropertyType] = useState<string[]>(initialType);
  const [area, setArea] = useState(initialLocation);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ 
    min: initialMinPrice, 
    max: initialMaxPrice 
  });
  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const [filteredLocations, setFilteredLocations] = useState<string[]>(mockLocations.slice(0, 8));
  const areaInputRef = useRef<HTMLInputElement>(null);
  const typeButtonRef = useRef<HTMLButtonElement>(null);
  const purposeButtonRef = useRef<HTMLButtonElement>(null);
  const priceButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update filters when URL params change
  useEffect(() => {
    const purposeParam = searchParams.purpose as 'buy' | 'rent' | undefined;
    const typeParam = searchParams.type;
    const locationParam = searchParams.location as string | undefined;
    const minPriceParam = searchParams.minPrice;
    const maxPriceParam = searchParams.maxPrice;
    
    if (purposeParam !== undefined) {
      setPurpose(purposeParam || null);
    }
    if (typeParam !== undefined) {
      const types = Array.isArray(typeParam) ? typeParam : [typeParam as string];
      setPropertyType(types);
    }
    if (locationParam !== undefined) {
      setArea(locationParam);
    }
    if (minPriceParam !== undefined) {
      setPriceRange(prev => ({ ...prev, min: parseInt(minPriceParam as string) || 0 }));
    }
    if (maxPriceParam !== undefined) {
      setPriceRange(prev => ({ ...prev, max: parseInt(maxPriceParam as string) || 39500000 }));
    }
  }, [searchParams]);

  const handleTypeToggle = (type: string) => {
    setPropertyType(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleAreaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setArea(value);
    
    if (value.trim() === '') {
      setFilteredLocations(mockLocations.slice(0, 8));
      setIsAreaOpen(false);
    } else {
      const filtered = mockLocations.filter(loc =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered.slice(0, 8));
      setIsAreaOpen(filtered.length > 0);
    }
  };

  const handleLocationSelect = (location: string) => {
    setArea(location);
    setIsAreaOpen(false);
    if (areaInputRef.current) {
      areaInputRef.current.blur();
    }
  };

  const getTypeDisplayText = () => {
    if (propertyType.length === 0) return 'Object type';
    if (propertyType.length === 1) {
      const type = propertyTypes.find(t => t.key === propertyType[0]);
      return type ? type.label : propertyType[0];
    }
    return `${propertyType.length} selected`;
  };

  const minPrice = 0;
  const maxPrice = 39500000;

  const formatPrice = (value: number): string => {
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`;
    }
    return `€${value.toLocaleString()}`;
  };

  const getPriceDisplayText = () => {
    if (priceRange.min === minPrice && priceRange.max === maxPrice) {
      return 'Price';
    }
    return `${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}`;
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
      setPriceRange(prev => ({ ...prev, min: Math.max(0, Math.min(Math.round(value), prev.max - 100000)) }));
    } else {
      setPriceRange(prev => ({ ...prev, max: Math.min(maxPrice, Math.max(Math.round(value), prev.min + 100000)) }));
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

  const updateURL = () => {
    const params = new URLSearchParams();
    if (purpose) params.set('purpose', purpose);
    if (propertyType.length > 0) params.set('type', propertyType.join(','));
    if (area) params.set('location', area);
    if (priceRange.min !== minPrice) params.set('minPrice', priceRange.min.toString());
    if (priceRange.max !== maxPrice) params.set('maxPrice', priceRange.max.toString());
    
    router.push(`/${locale}/properties${params.toString() ? '?' + params.toString() : ''}`, { scroll: false });
  };

  const handleSaveSearch = () => {
    // TODO: Implement save search functionality
    console.log('Save search:', { purpose, propertyType, area, priceRange });
    // You can add logic here to save the search to user's account
  };

  // Update URL when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL();
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purpose, propertyType, area, priceRange.min, priceRange.max]);

  return (
    <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 lg:max-w-[900px] xl:max-w-[1050px]">
      <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 sm:p-3 shadow-2xl" style={{
        boxShadow: "0 8px 32px rgba(37, 99, 235, 0.3), 0 0 60px rgba(59, 130, 246, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
      }}>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-1 sm:gap-1.5">
        {/* Buy / Rent Dropdown */}
        <div className="relative flex-shrink-0">
          <button
            ref={purposeButtonRef}
            type="button"
            onClick={() => {
              const willOpen = !isPurposeOpen;
              setIsPurposeOpen(willOpen);
              setIsTypeOpen(false);
              setIsAreaOpen(false);
            }}
            className="w-full lg:w-auto lg:min-w-[100px] flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl lg:rounded-full px-3 sm:px-4 lg:px-3 py-2.5 sm:py-3 lg:py-3 text-white transition-all duration-200"
          >
            <span className="text-sm font-medium whitespace-nowrap">
              {purpose
                ? tPurpose(purpose)
                : `${tPurpose("buy")} / ${tPurpose("rent")}`}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 ml-2 transition-transform flex-shrink-0",
                isPurposeOpen && "rotate-180"
              )}
            />
          </button>
          {/* Purpose dropdown - rendered via portal */}
          {isPurposeOpen && mounted && createPortal(
            <>
              <div
                className="fixed inset-0 z-[9998] bg-transparent"
                onClick={() => setIsPurposeOpen(false)}
              />
              <div
                className="fixed bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden z-[9999]"
                style={(() => {
                  if (purposeButtonRef.current) {
                    const rect = purposeButtonRef.current.getBoundingClientRect();
                    return {
                      top: `${rect.bottom + 8}px`,
                      left: `${rect.left}px`,
                      width: `${rect.width}px`,
                    };
                  }
                  return { top: "100px", left: "100px", width: "200px" };
                })()}
              >
                <button
                  type="button"
                  onClick={() => {
                    setPurpose(purpose === "buy" ? null : "buy");
                    setIsPurposeOpen(false);
                  }}
                  className={cn(
                    "w-full px-6 py-3 text-left text-gray-900 hover:bg-gray-100 transition-colors",
                    purpose === "buy" && "bg-gray-100 font-semibold"
                  )}
                >
                  {tPurpose("buy")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPurpose(purpose === "rent" ? null : "rent");
                    setIsPurposeOpen(false);
                  }}
                  className={cn(
                    "w-full px-6 py-3 text-left text-gray-900 hover:bg-gray-100 transition-colors",
                    purpose === "rent" && "bg-gray-100 font-semibold"
                  )}
                >
                  {tPurpose("rent")}
                </button>
              </div>
            </>,
            document.body
          )}
        </div>

        {/* Property Type Dropdown */}
        <div className="relative flex-shrink-0">
          <button
            ref={typeButtonRef}
            type="button"
            onClick={() => {
              const willOpen = !isTypeOpen;
              setIsTypeOpen(willOpen);
              setIsPurposeOpen(false);
              setIsAreaOpen(false);
            }}
            className="w-full lg:w-auto lg:min-w-[120px] flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl lg:rounded-full px-3 sm:px-4 lg:px-3 py-2.5 sm:py-3 lg:py-3 text-white transition-all duration-200"
          >
            <span className="text-xs sm:text-sm font-medium">
              {getTypeDisplayText()}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 ml-2 transition-transform flex-shrink-0",
                isTypeOpen && "rotate-180"
              )}
            />
          </button>
          {isTypeOpen && mounted && createPortal(
            <>
              <div
                className="fixed inset-0 z-[9998] bg-transparent"
                onClick={() => setIsTypeOpen(false)}
              />
              <div
                className="fixed bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden z-[9999]"
                style={(() => {
                  if (typeButtonRef.current) {
                    const rect = typeButtonRef.current.getBoundingClientRect();
                    return {
                      top: `${rect.bottom + 8}px`,
                      left: `${rect.left}px`,
                      width: window.innerWidth >= 1024 ? "auto" : `${rect.width}px`,
                      minWidth: window.innerWidth >= 1024 ? "200px" : "auto",
                    };
                  }
                  return { top: "100px", left: "100px", width: "200px", minWidth: "200px" };
                })()}
              >
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
                      <span className="font-medium text-gray-900">
                        {type.label}
                      </span>
                      {isSelected && (
                        <div className="ml-auto w-2 h-2 bg-gray-900 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </>,
            document.body
          )}
        </div>

        {/* Area Search */}
        <div className="relative flex-1 min-w-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60" />
            <input
              ref={areaInputRef}
              type="text"
              value={area}
              onChange={handleAreaInputChange}
              onFocus={() => {
                if (area.trim() === '') {
                  setFilteredLocations(mockLocations.slice(0, 8));
                }
                setIsAreaOpen(true);
              }}
              placeholder="Mallorca"
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 lg:py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl lg:rounded-full text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-transparent transition-all duration-200"
            />
            {area && (
              <button
                type="button"
                onClick={() => {
                  setArea('');
                  setIsAreaOpen(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80"
              >
                ×
              </button>
            )}
          </div>
          
          {/* Area dropdown */}
          {isAreaOpen && filteredLocations.length > 0 && mounted && createPortal(
            <>
              <div
                className="fixed inset-0 z-[9998] bg-transparent"
                onClick={() => setIsAreaOpen(false)}
              />
              <div
                className="fixed bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden z-[9999] max-h-64 overflow-y-auto"
                style={(() => {
                  if (areaInputRef.current) {
                    const rect = areaInputRef.current.getBoundingClientRect();
                    return {
                      top: `${rect.bottom + 8}px`,
                      left: `${rect.left}px`,
                      width: `${rect.width}px`,
                    };
                  }
                  return { top: "100px", left: "100px", width: "300px" };
                })()}
              >
                {filteredLocations.map((location) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => handleLocationSelect(location)}
                    className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{location}</span>
                  </button>
                ))}
              </div>
            </>,
            document.body
          )}
        </div>

        {/* Price Range Dropdown */}
        <div className="relative flex-shrink-0">
          <button
            ref={priceButtonRef}
            type="button"
            onClick={() => {
              const willOpen = !isPriceOpen;
              setIsPriceOpen(willOpen);
              setIsPurposeOpen(false);
              setIsTypeOpen(false);
              setIsAreaOpen(false);
            }}
            className="w-full lg:w-auto lg:min-w-[150px] flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl lg:rounded-full px-3 sm:px-4 lg:px-3 py-2.5 sm:py-3 lg:py-3 text-white transition-all duration-200"
          >
            <span className="text-xs sm:text-sm font-medium">
              {getPriceDisplayText()}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 ml-2 transition-transform flex-shrink-0",
                isPriceOpen && "rotate-180"
              )}
            />
          </button>
          {/* Price slider dropdown */}
          {isPriceOpen && mounted && createPortal(
            <>
              <div
                className="fixed inset-0 z-[9998] bg-transparent"
                onClick={() => setIsPriceOpen(false)}
              />
              <div
                className="fixed bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden z-[9999] p-6"
                style={(() => {
                  if (priceButtonRef.current) {
                    const rect = priceButtonRef.current.getBoundingClientRect();
                    return {
                      top: `${rect.bottom + 8}px`,
                      left: `${rect.left}px`,
                      width: `${Math.max(rect.width, 320)}px`,
                    };
                  }
                  return { top: "100px", left: "100px", width: "320px" };
                })()}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">Price Range</span>
                    <span className="text-gray-500">
                      {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
                    </span>
                  </div>
                  
                  {/* Slider Track */}
                  <div className="relative w-full py-4 price-slider-container">
                    <div
                      className="price-slider-track relative w-full h-2 bg-gray-200 rounded-full cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                        const value = minPrice + (percent / 100) * (maxPrice - minPrice);
                        const midPoint = (priceRange.min + priceRange.max) / 2;
                        if (value < midPoint) {
                          setPriceRange(prev => ({ ...prev, min: Math.max(0, Math.min(Math.round(value), prev.max - 100000)) }));
                        } else {
                          setPriceRange(prev => ({ ...prev, max: Math.min(maxPrice, Math.max(Math.round(value), prev.min + 100000)) }));
                        }
                      }}
                    >
                      {/* Active Range */}
                      <div
                        className="absolute h-2 bg-blue-600 rounded-full"
                        style={{
                          left: `${getPercentage(priceRange.min)}%`,
                          width: `${getPercentage(priceRange.max) - getPercentage(priceRange.min)}%`,
                        }}
                      />
                      
                      {/* Min Handle */}
                      <div
                        className="absolute w-4 h-4 bg-blue-600 rounded-full shadow-md cursor-grab active:cursor-grabbing transform -translate-y-1 -translate-x-1/2 top-1/2"
                        style={{ left: `${getPercentage(priceRange.min)}%` }}
                        onMouseDown={(e) => handleSliderMouseDown('min', e)}
                        onTouchStart={(e) => handleSliderMouseDown('min', e)}
                      />
                      
                      {/* Max Handle */}
                      <div
                        className="absolute w-4 h-4 bg-blue-600 rounded-full shadow-md cursor-grab active:cursor-grabbing transform -translate-y-1 -translate-x-1/2 top-1/2"
                        style={{ left: `${getPercentage(priceRange.max)}%` }}
                        onMouseDown={(e) => handleSliderMouseDown('max', e)}
                        onTouchStart={(e) => handleSliderMouseDown('max', e)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatPrice(minPrice)}</span>
                    <span>{formatPrice(maxPrice)}</span>
                  </div>
                </div>
              </div>
            </>,
            document.body
          )}
        </div>

        {/* Save Search Button */}
        <button
          type="button"
          onClick={handleSaveSearch}
          className="w-full lg:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl lg:rounded-full px-4 sm:px-6 lg:px-4 py-2.5 sm:py-3 lg:py-3 transition-colors shadow-lg"
        >
          <div className="relative">
            <Bell className="w-4 h-4" />
            <Plus className="w-2.5 h-2.5 absolute -top-1 -right-1 bg-white text-red-600 rounded-full" />
          </div>
          <span className="text-sm">Save search</span>
        </button>
        </div>
      </div>
    </div>
  );
}

