'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  locale: string;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const getLocalizedPath = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathSegments = pathname.split('/').filter(Boolean);
    if (languages.some(lang => lang.code === pathSegments[0])) {
      pathSegments.shift();
    }
    
    // Add the new locale
    return `/${newLocale}${pathSegments.length > 0 ? '/' + pathSegments.join('/') : ''}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors focus-ring"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">
          {currentLanguage.name}
        </span>
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
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border z-20 glass-effect">
            <div className="py-1">
              {languages.map((language) => (
                <Link
                  key={language.code}
                  href={getLocalizedPath(language.code)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors",
                    language.code === locale && "bg-primary/10 text-primary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                  {language.code === locale && (
                    <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
