'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown, Search, MapPin, Home, Building, Store, Euro } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBlurReveal } from '@/hooks/useBlurReveal';

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
  const [purpose, setPurpose] = useState<'buy' | 'rent' | null>(null);
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [area, setArea] = useState('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 39500000 });
  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const [filteredLocations, setFilteredLocations] = useState<string[]>(mockLocations.slice(0, 8));
  const areaInputRef = useRef<HTMLInputElement>(null);
  const typeButtonRef = useRef<HTMLButtonElement>(null);
  const purposeButtonRef = useRef<HTMLButtonElement>(null);
  const borderContainerRef = useRef<HTMLDivElement>(null);
  const segRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);
  const [dropdownPositions, setDropdownPositions] = useState<{
    purpose?: { top: number; left: number; width: number };
    type?: { top: number; left: number; width: number };
    area?: { top: number; left: number; width: number };
  }>({});
  
  useEffect(() => {
    setMounted(true);
  }, []);
useEffect(() => {
  const box = borderContainerRef.current;
  const seg = segRef.current;
  if (!box || !seg) return;

  let raf = 0;
  let last = performance.now();
  let t = 0;

  const clamp = (v: number, a: number, b: number) =>
    Math.max(a, Math.min(b, v));

  const tick = (now: number) => {
    const dt = (now - last) / 1000;
    last = now;

    const rect = box.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const cs = getComputedStyle(box);
    const br = parseFloat(cs.borderTopLeftRadius || "0") || 24;

    const segW = seg.offsetWidth;
    const segH = seg.offsetHeight;

    const inset = Math.max(segH, 2);
    const r = clamp(br, 0, Math.min(w, h) / 2) - inset;

    const innerW = w - 2 * inset;
    const innerH = h - 2 * inset;

    const straightTop = Math.max(0, innerW - 2 * r);
    const straightRight = Math.max(0, innerH - 2 * r);
    const arc = (Math.PI / 2) * r;
    const P = 2 * (straightTop + straightRight) + 4 * arc;

    const speed = 220; // tune
    t = (t + speed * dt) % P;

    const snapDeg = (deg: number) => {
      const step = 1; // 1 degree snap (stable)
      return Math.round(deg / step) * step;
    };

    const boostScaleY = (deg: number) => {
      
      let base = 1.08;

     
      const a = ((deg % 360) + 360) % 360;

      const bottomBoost = a >= 135 && a <= 225 ? 0.14 : 0;

      const verticalPenalty =
        (a >= 75 && a <= 105) || (a >= 255 && a <= 285) ? -0.04 : 0;

      return base + bottomBoost + verticalPenalty;
    };

    const set = (x: number, y: number, deg: number) => {
      const rdeg = snapDeg(deg);

      const tx = Math.round(x - segW / 2);
      const ty = Math.round(y - segH / 2);

      const sy = boostScaleY(rdeg);

      seg.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rdeg}deg) scaleY(${sy})`;
    };


    let d = t;

    if (d <= straightTop) {
      set(inset + r + d, inset, 0);
      raf = requestAnimationFrame(tick);
      return;
    }
    d -= straightTop;

    if (d <= arc) {
      const a = d / r;
      const cx = inset + r + straightTop;
      const cy = inset + r;
      set(cx + Math.sin(a) * r, cy - Math.cos(a) * r, (a * 180) / Math.PI);
      raf = requestAnimationFrame(tick);
      return;
    }
    d -= arc;

    if (d <= straightRight) {
      set(inset + r + straightTop + r, inset + r + d, 90);
      raf = requestAnimationFrame(tick);
      return;
    }
    d -= straightRight;

    if (d <= arc) {
      const a = d / r;
      const cx = inset + r + straightTop;
      const cy = inset + r + straightRight;
      set(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 90 + (a * 180) / Math.PI);
      raf = requestAnimationFrame(tick);
      return;
    }
    d -= arc;

    if (d <= straightTop) {
      set(inset + r + straightTop - d, inset + r + straightRight + r, 180);
      raf = requestAnimationFrame(tick);
      return;
    }
    d -= straightTop;

    if (d <= arc) {
      const a = d / r;
      const cx = inset + r;
      const cy = inset + r + straightRight;
      set(
        cx - Math.sin(a) * r,
        cy + Math.cos(a) * r,
        180 + (a * 180) / Math.PI
      );
      raf = requestAnimationFrame(tick);
      return;
    }
    d -= arc;

    if (d <= straightRight) {
      set(inset, inset + r + straightRight - d, 270);
      raf = requestAnimationFrame(tick);
      return;
    }
    d -= straightRight;

    const a = d / r;
    const cx = inset + r;
    const cy = inset + r;
    set(cx - Math.cos(a) * r, cy - Math.sin(a) * r, 270 + (a * 180) / Math.PI);
    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}, []);

  // Line-by-line reveal states
  const [titleLinesVisible, setTitleLinesVisible] = useState<number[]>([]);
  
  // Blur reveal effect for title
  const { elementRef: titleRef, style: titleBlurStyle } = useBlurReveal<HTMLHeadingElement>({ maxBlur: 8, minBlur: 0 });

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

  // Calculate dropdown positions for fixed positioning
  const calculateDropdownPosition = (element: HTMLElement | null) => {
    if (!element) return null;
    const rect = element.getBoundingClientRect();
    return {
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
    };
  };

  // Update positions when dropdowns open - use setTimeout to ensure DOM is ready
  useEffect(() => {
    if (isPurposeOpen && purposeButtonRef.current) {
      const timer = setTimeout(() => {
        if (purposeButtonRef.current) {
          const pos = calculateDropdownPosition(purposeButtonRef.current);
          if (pos) {
            setDropdownPositions(prev => ({ ...prev, purpose: pos }));
          }
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isPurposeOpen]);

  useEffect(() => {
    if (isTypeOpen && typeButtonRef.current) {
      const timer = setTimeout(() => {
        if (typeButtonRef.current) {
          const pos = calculateDropdownPosition(typeButtonRef.current);
          if (pos) {
            setDropdownPositions(prev => ({ ...prev, type: pos }));
          }
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isTypeOpen]);

  useEffect(() => {
    if (isAreaOpen && areaInputRef.current) {
      const timer = setTimeout(() => {
        if (areaInputRef.current) {
          const pos = calculateDropdownPosition(areaInputRef.current);
          if (pos) {
            setDropdownPositions(prev => ({ ...prev, area: pos }));
          }
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isAreaOpen]);
  
  // Line-by-line reveal effect
  useEffect(() => {
    if (hideTitle) return;
    
    const titleText = t('title');
    const titleLines = titleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const finalTitleLines = titleLines.length > 0 ? titleLines : [titleText.trim()];
    
    finalTitleLines.forEach((_, index) => {
      setTimeout(() => {
        setTitleLinesVisible(prev => [...prev, index]);
      }, 600 + (index * 500));
    });
  }, [t, hideTitle]);


  const handleTypeToggle = (type: string) => {
    if (propertyType.includes(type)) {
      setPropertyType(propertyType.filter(t => t !== type));
    } else {
      setPropertyType([...propertyType, type]);
    }
  };

  // Abbreviated display names for property types
  const getTypeAbbreviation = (type: string): string => {
    const abbreviations: Record<string, string> = {
      'apartment': 'Apar',
      'house': 'House',
      'commercial': 'Comm',
    };
    return abbreviations[type] || type;
  };

  const getTypeDisplayText = () => {
    // When no type is selected, show translated generic placeholder
    if (propertyType.length === 0) return t('searchPlaceholder.type');
    if (propertyType.length === 1) return getTypeAbbreviation(propertyType[0]);
    // For multiple selected types, show just count with icon
    return `${propertyType.length}`;
  };

  const minPrice = 0;
  const maxPrice = 39500000;

  const formatPrice = (value: number): string => {
    // Format with dots (European format: 39.500.000)
    return value.toLocaleString('de-DE'); // German locale uses dots for thousands separator
  };

  const getPriceDisplayText = () => {
    const minText = formatPrice(priceRange.min);
    const maxText = formatPrice(priceRange.max);
    return `${minText} - ${maxText}`;
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
      className={`relative z-10 mx-auto px-3 sm:px-4 md:px-6 lg:px-8 ${
        hideTitle ? "my-0" : "-mt-8 sm:-mt-12 md:-mt-16 mb-8 sm:mb-12 md:mb-16"
      } lg:max-w-[900px] xl:max-w-[1050px]`}
    >
      {!hideTitle && (
        <div className="text-center mb-6 sm:mb-8 mt-8 sm:mt-12">
          <h2
            ref={titleRef}
            style={titleBlurStyle}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2"
          >
            {(() => {
              const titleText = t("title");
              const titleLines = titleText
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => line.length > 0);
              const finalTitleLines =
                titleLines.length > 0 ? titleLines : [titleText.trim()];

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
        </div>
      )}

      {/* Glassmorphic Search Bar */}
      <div className="glow-wrapper overflow-visible">
        <div
          ref={borderContainerRef}
          className="relative bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-full border border-white/20 p-2 sm:p-3 lg:p-2 shadow-2xl revolving-border-line"
          style={{
            boxShadow:
              "0 8px 32px rgba(240, 47, 194, 0.3), 0 0 60px rgba(255, 192, 128, 0.2), 0 0 90px rgba(255, 69, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
          }}
        >
          <span ref={segRef} className="rb-seg" aria-hidden="true"></span>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-1 sm:gap-1.5 p-1 sm:p-2 overflow-visible">
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
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  {purpose
                    ? tPurpose(purpose)
                    : `${tPurpose("buy")} / ${tPurpose("rent")}`}
                </span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 sm:w-4 ml-1.5 sm:ml-2 transition-transform flex-shrink-0",
                    isPurposeOpen && "rotate-180"
                  )}
                />
              </button>
              {/* Purpose dropdown - rendered via portal */}
              {isPurposeOpen &&
                mounted &&
                createPortal(
                  <>
                    <div
                      className="fixed inset-0 z-[9998] bg-transparent"
                      onClick={() => setIsPurposeOpen(false)}
                    />
                    <div
                      className="fixed bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden z-[9999]"
                      style={(() => {
                        if (purposeButtonRef.current) {
                          const rect =
                            purposeButtonRef.current.getBoundingClientRect();
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

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-white/20 mx-1" />

            {/* Property Type Dropdown */}
            <div
              className="relative flex-shrink-0"
              style={{ zIndex: isTypeOpen ? 200 : "auto" }}
            >
              <button
                ref={typeButtonRef}
                type="button"
                onClick={() => {
                  const willOpen = !isTypeOpen;
                  setIsTypeOpen(willOpen);
                  setIsPurposeOpen(false);
                  setIsAreaOpen(false);
                }}
                className="w-full lg:w-auto lg:min-w-[60px] lg:max-w-[80px] flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl lg:rounded-full px-3 sm:px-3 lg:px-3 py-2.5 sm:py-3 lg:py-3 text-white transition-all duration-200"
              >
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  {propertyType.length === 0 && (
                    <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  )}
                  {propertyType.length > 0 && (
                    <>
                      {propertyType.length === 1 ? (
                        <span className="text-xs sm:text-sm truncate">
                          {getTypeDisplayText()}
                        </span>
                      ) : (
                        <>
                          <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-medium">
                            {getTypeDisplayText()}
                          </span>
                        </>
                      )}
                    </>
                  )}
                </div>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ml-1",
                    isTypeOpen && "rotate-180"
                  )}
                />
              </button>
              {isTypeOpen &&
                mounted &&
                createPortal(
                  <>
                    <div
                      className="fixed inset-0 z-[9998] bg-transparent"
                      onClick={() => setIsTypeOpen(false)}
                    />
                    <div
                      className="fixed bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden z-[9999]"
                      style={(() => {
                        if (typeButtonRef.current) {
                          const rect =
                            typeButtonRef.current.getBoundingClientRect();
                          return {
                            top: `${rect.bottom + 8}px`,
                            left: `${rect.left}px`,
                            width:
                              window.innerWidth >= 1024
                                ? "auto"
                                : `${rect.width}px`,
                            minWidth:
                              window.innerWidth >= 1024 ? "200px" : "auto",
                          };
                        }
                        return {
                          top: "100px",
                          left: "100px",
                          width: "200px",
                          minWidth: "200px",
                        };
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
                  placeholder={t("searchPlaceholder.location")}
                  className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl lg:rounded-full px-3 sm:px-4 lg:px-3 py-2.5 sm:py-3 lg:py-3 pl-7 sm:pl-8 lg:pl-8 text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-200"
                />
                <MapPin className="absolute left-2 sm:left-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-3.5 text-white/60 flex-shrink-0" />
              </div>
              {isAreaOpen &&
                filteredLocations.length > 0 &&
                mounted &&
                createPortal(
                  <>
                    <div
                      className="fixed inset-0 z-[9998] bg-transparent"
                      onClick={() => setIsAreaOpen(false)}
                    />
                    <div
                      className="fixed bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden z-[9999] max-h-64 overflow-y-auto"
                      style={(() => {
                        if (areaInputRef.current) {
                          const rect =
                            areaInputRef.current.getBoundingClientRect();
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
                  </>,
                  document.body
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
                    <span className="text-xs font-medium truncate">
                      {getPriceDisplayText()}
                    </span>
                  </div>

                  {/* Slider Track */}
                  <div className="relative w-full py-1">
                    <div
                      className="price-slider-track relative w-full h-1 bg-white/20 rounded-full cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = Math.max(
                          0,
                          Math.min(
                            100,
                            ((e.clientX - rect.left) / rect.width) * 100
                          )
                        );
                        const value =
                          minPrice + (percent / 100) * (maxPrice - minPrice);
                        const distanceToMin = Math.abs(value - priceRange.min);
                        const distanceToMax = Math.abs(value - priceRange.max);

                        if (distanceToMin < distanceToMax) {
                          setPriceRange((prev) => ({
                            ...prev,
                            min: Math.max(
                              0,
                              Math.min(Math.round(value), prev.max - 100000)
                            ),
                          }));
                        } else {
                          setPriceRange((prev) => ({
                            ...prev,
                            max: Math.min(
                              maxPrice,
                              Math.max(Math.round(value), prev.min + 100000)
                            ),
                          }));
                        }
                      }}
                    >
                      {/* Active Range */}
                      <div
                        className="absolute h-1 bg-gray-600 rounded-full"
                        style={{
                          left: `${getPercentage(priceRange.min)}%`,
                          width: `${
                            getPercentage(priceRange.max) -
                            getPercentage(priceRange.min)
                          }%`,
                        }}
                      />

                      {/* Min Handle */}
                      <div
                        className="absolute top-1/2 w-4 h-4 bg-gray-700 rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing hover:bg-gray-800 transition-colors z-20 touch-none"
                        style={{
                          left: `${getPercentage(priceRange.min)}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        onMouseDown={(e) => handleSliderMouseDown("min", e)}
                        onTouchStart={(e) => handleSliderMouseDown("min", e)}
                      />

                      {/* Max Handle */}
                      <div
                        className="absolute top-1/2 w-4 h-4 bg-gray-700 rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing hover:bg-gray-800 transition-colors z-20 touch-none"
                        style={{
                          left: `${getPercentage(priceRange.max)}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        onMouseDown={(e) => handleSliderMouseDown("max", e)}
                        onTouchStart={(e) => handleSliderMouseDown("max", e)}
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
              className="w-full lg:w-auto min-w-0 lg:min-w-[140px] bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm font-semibold rounded-xl lg:rounded-full px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-2.5 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5 sm:w-3.5 flex-shrink-0" />
              <span className="truncate max-w-[140px]">
                {t("searchButton")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}