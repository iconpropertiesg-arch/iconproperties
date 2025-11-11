'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Search, ChevronDown, MapPin, Home, Building, Euro } from 'lucide-react';
import { cn } from '@/lib/utils';
import PriceSlider from './PriceSlider';
import PropertyTypeSelect from './PropertyTypeSelect';
import LocationAutocomplete from './LocationAutocomplete';

interface SearchBarProps {
  locale: string;
  onSearch: (filters: SearchFilters) => void;
  className?: string;
  defaultValues?: Partial<SearchFilters>;
}

interface SearchFilters {
  purpose: 'buy' | 'rent';
  type: string[];
  location: string;
  priceMin: number;
  priceMax: number;
}

export default function SearchBar({ 
  locale, 
  onSearch, 
  className,
  defaultValues 
}: SearchBarProps) {
  const t = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    purpose: 'buy',
    type: [],
    location: '',
    priceMin: 0,
    priceMax: 5000000,
    ...defaultValues
  });
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSearch(filters);
    }
  };

  return (
    <div className={cn(
      "relative rounded-2xl p-1 transition-all duration-300",
      isFocused && "scale-105 shadow-2xl",
      className
    )}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          {/* Main Search Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            {/* Purpose Toggle */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-white/80 mb-2">
                {t('hero.searchPlaceholder.purpose')}
              </label>
              <div className="relative">
                <div className="flex bg-white/10 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, purpose: 'buy' }))}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                      filters.purpose === 'buy'
                        ? "bg-white text-gray-900 shadow-md"
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    {t('purpose.buy')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, purpose: 'rent' }))}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                      filters.purpose === 'rent'
                        ? "bg-white text-gray-900 shadow-md"
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    {t('purpose.rent')}
                  </button>
                </div>
              </div>
            </div>

            {/* Property Type */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Property Type
              </label>
              <PropertyTypeSelect
                value={filters.type}
                onChange={(type) => setFilters(prev => ({ ...prev, type }))}
                placeholder={t('hero.searchPlaceholder.type')}
                locale={locale}
              />
            </div>

            {/* Location */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Location
              </label>
              <LocationAutocomplete
                value={filters.location}
                onChange={(location) => setFilters(prev => ({ ...prev, location }))}
                placeholder={t('hero.searchPlaceholder.location')}
                locale={locale}
              />
            </div>

            {/* Price */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-white/80 mb-2">
                {t('hero.searchPlaceholder.price')}
              </label>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus-ring"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              >
                <div className="flex items-center space-x-2">
                  <Euro className="w-4 h-4" />
                  <span className="text-sm">
                    {filters.priceMax === 5000000 ? 'Any budget' : `Up to €${(filters.priceMax / 1000).toFixed(0)}k`}
                  </span>
                </div>
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  isExpanded && "rotate-180"
                )} />
              </button>
            </div>
          </div>

          {/* Expanded Price Slider */}
          {isExpanded && (
            <div className="mb-4 p-4 bg-white/5 rounded-lg">
              <PriceSlider
                min={filters.priceMin}
                max={filters.priceMax}
                onChange={(min, max) => setFilters(prev => ({ ...prev, priceMin: min, priceMax: max }))}
                locale={locale}
              />
            </div>
          )}

          {/* Search Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold flex items-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ai-glow"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              <Search className="w-5 h-5" />
              <span>{t('hero.searchButton')}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
