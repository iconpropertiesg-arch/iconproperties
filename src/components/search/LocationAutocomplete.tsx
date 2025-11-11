'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  locale: string;
}

// Mock location data - in a real app, this would come from an API
const mockLocations = [
  'Portals Nous',
  'Puerto Portals',
  'Santa Ponsa',
  'Port Adriano',
  'Andratx',
  'Puerto de Andratx',
  'Camp de Mar',
  'Paguera',
  'Calvia',
  'Palma',
  'Son Vida',
  'Bendinat',
  'Costa de los Pinos',
  'Cala Ratjada',
  'Puerto Pollensa',
  'Alcudia',
  'Soller',
  'Deia',
  'Valldemossa',
  'Esporles',
  'Banyalbufar',
  'Estellencs',
  'Llucmajor',
  'Santanyi',
  'Ses Salines',
  'Colonia Sant Jordi',
  'Cala d\'Or',
  'Porto Cristo',
  'Manacor',
  'Arta',
  'Capdepera',
];

export default function LocationAutocomplete({ 
  value, 
  onChange, 
  placeholder, 
  locale 
}: LocationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = mockLocations.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered.slice(0, 8)); // Limit to 8 results
    } else {
      setFilteredLocations(mockLocations.slice(0, 8));
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(true);
  };

  const handleLocationSelect = (location: string) => {
    onChange(location);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Delay closing to allow clicking on options
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pl-10 text-white placeholder-white/60 focus-ring"
        />
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
      </div>

      {isOpen && filteredLocations.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border z-20 max-h-64 overflow-y-auto">
            {filteredLocations.map((location) => (
              <button
                key={location}
                type="button"
                onClick={() => handleLocationSelect(location)}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{location}</span>
              </button>
            ))}
            
            {value.length > 0 && !filteredLocations.some(loc => 
              loc.toLowerCase() === value.toLowerCase()
            ) && (
              <button
                type="button"
                onClick={() => handleLocationSelect(value)}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-t"
              >
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">Search for "{value}"</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
