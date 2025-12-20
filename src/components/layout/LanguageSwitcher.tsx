'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
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
        className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white"
        aria-label="Select language"
      >
        <span className="text-sm font-medium">
          {currentLanguage.flag}
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
          <div className="absolute right-0 top-full mt-2 w-[50px] bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700 z-20">
            <div className="py-2">
              {languages.map((language) => (
                <Link
                  key={language.code}
                  href={getLocalizedPath(language.code)}
                  className={cn(
                    "flex items-center justify-center relative px-2 py-3 text-sm hover:bg-gray-800 transition-colors text-white",
                    language.code === locale && "bg-blue-600/20 text-blue-400"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg">{language.flag}</span>
                  {language.code === locale && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full" />
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
