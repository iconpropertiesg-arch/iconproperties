'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Filter, X, Search } from 'lucide-react';
import { createSearchParams, parseSearchParams } from '@/lib/utils';
import PriceSlider from '@/components/search/PriceSlider';
import PropertyTypeSelect from '@/components/search/PropertyTypeSelect';
import LocationAutocomplete from '@/components/search/LocationAutocomplete';

interface PropertiesFiltersProps {
  locale: string;
  searchParams: { [key: string]: string | string[] | undefined };
}

interface FilterState {
  purpose: 'buy' | 'rent';
  type: string[];
  location: string;
  priceMin: number;
  priceMax: number;
  beds: string;
  baths: string;
  sort: string;
}

export default function PropertiesFilters({ locale, searchParams }: PropertiesFiltersProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<FilterState>({
    purpose: (searchParams.purpose as 'buy' | 'rent') || 'buy',
    type: Array.isArray(searchParams.type) ? searchParams.type : searchParams.type ? [searchParams.type] : [],
    location: (searchParams.location as string) || '',
    priceMin: parseInt(searchParams.priceMin as string) || 0,
    priceMax: parseInt(searchParams.priceMax as string) || 5000000,
    beds: (searchParams.beds as string) || '',
    baths: (searchParams.baths as string) || '',
    sort: (searchParams.sort as string) || 'newest',
  });

  const updateURL = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    const params = createSearchParams(updatedFilters);
    router.push(`/${locale}/properties${params ? '?' + params : ''}`, { scroll: false });
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateURL({ [key]: value });
  };

  const clearAllFilters = () => {
    const defaultFilters: FilterState = {
      purpose: 'buy',
      type: [],
      location: '',
      priceMin: 0,
      priceMax: 5000000,
      beds: '',
      baths: '',
      sort: 'newest',
    };
    setFilters(defaultFilters);
    router.push(`/${locale}/properties`);
  };

  const hasActiveFilters = () => {
    return (
      filters.type.length > 0 ||
      filters.location !== '' ||
      filters.priceMin > 0 ||
      filters.priceMax < 5000000 ||
      filters.beds !== '' ||
      filters.baths !== ''
    );
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
          {hasActiveFilters() && (
            <span className="w-2 h-2 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <FiltersContent
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={clearAllFilters}
          hasActiveFilters={hasActiveFilters()}
          locale={locale}
          t={t}
        />
      </div>

      {/* Mobile Filters Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <FiltersContent
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearAll={clearAllFilters}
                hasActiveFilters={hasActiveFilters()}
                locale={locale}
                t={t}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface FiltersContentProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
  locale: string;
  t: any;
}

function FiltersContent({
  filters,
  onFilterChange,
  onClearAll,
  hasActiveFilters,
  locale,
  t
}: FiltersContentProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            {t('common.clearAll')}
          </button>
        )}
      </div>

      {/* Purpose */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Purpose
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onFilterChange('purpose', 'buy')}
            className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              filters.purpose === 'buy'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('purpose.buy')}
          </button>
          <button
            onClick={() => onFilterChange('purpose', 'rent')}
            className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              filters.purpose === 'rent'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('purpose.rent')}
          </button>
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Property Type
        </label>
        <PropertyTypeSelect
          value={filters.type}
          onChange={(type) => onFilterChange('type', type)}
          placeholder="Select types"
          locale={locale}
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Location
        </label>
        <LocationAutocomplete
          value={filters.location}
          onChange={(location) => onFilterChange('location', location)}
          placeholder="Enter area or city"
          locale={locale}
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Price Range
        </label>
        <PriceSlider
          min={filters.priceMin}
          max={filters.priceMax}
          onChange={(min, max) => {
            onFilterChange('priceMin', min);
            onFilterChange('priceMax', max);
          }}
          locale={locale}
        />
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Bedrooms
        </label>
        <div className="grid grid-cols-5 gap-2">
          {['', '1', '2', '3', '4', '5+'].map((bed) => (
            <button
              key={bed}
              onClick={() => onFilterChange('beds', bed)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                filters.beds === bed
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {bed || 'Any'}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Bathrooms
        </label>
        <div className="grid grid-cols-5 gap-2">
          {['', '1', '2', '3', '4', '5+'].map((bath) => (
            <button
              key={bath}
              onClick={() => onFilterChange('baths', bath)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                filters.baths === bath
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {bath || 'Any'}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('properties.filters.sort')}
        </label>
        <select
          value={filters.sort}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        >
          <option value="newest">{t('properties.filters.newest')}</option>
          <option value="price_asc">{t('properties.filters.priceAsc')}</option>
          <option value="price_desc">{t('properties.filters.priceDesc')}</option>
        </select>
      </div>
    </div>
  );
}
