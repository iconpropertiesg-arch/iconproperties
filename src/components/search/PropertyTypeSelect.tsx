'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, Home, Building, Store, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyTypeSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  locale: string;
}

const propertyTypes = [
  { key: 'apartment', icon: Building },
  { key: 'house', icon: Home },
  { key: 'villa', icon: Crown },
  { key: 'commercial', icon: Store },
];

export default function PropertyTypeSelect({ 
  value, 
  onChange, 
  placeholder, 
  locale 
}: PropertyTypeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('propertyTypes');

  const handleToggle = (type: string) => {
    if (value.includes(type)) {
      onChange(value.filter(t => t !== type));
    } else {
      onChange([...value, type]);
    }
  };

  const getDisplayText = () => {
    if (value.length === 0) return placeholder;
    if (value.length === 1) return t(value[0]);
    return `${value.length} types selected`;
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus-ring"
      >
        <span className="text-sm">{getDisplayText()}</span>
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border z-20 overflow-hidden">
            {propertyTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = value.includes(type.key);
              
              return (
                <button
                  key={type.key}
                  type="button"
                  onClick={() => handleToggle(type.key)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors",
                    isSelected && "bg-primary/10 text-primary"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{t(type.key)}</span>
                  {isSelected && (
                    <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
