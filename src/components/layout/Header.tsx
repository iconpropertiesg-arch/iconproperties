'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const t = useTranslations('navigation');

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          setIsScrolled(currentScroll > 20);
          
          // Hide navbar when scrolling down, show when scrolling up
          if (currentScroll < 10) {
            // At the top, always show
            setIsVisible(true);
          } else if (currentScroll > lastScrollY && currentScroll > 30) {
            // Scrolling down and past 30px - hide navbar (slide up)
            setIsVisible(false);
          } else if (currentScroll < lastScrollY) {
            // Scrolling up - show navbar (slide down from top)
            setIsVisible(true);
          }
          
          setLastScrollY(currentScroll);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-1000 ease-out',
          isVisible
            ? 'translate-y-0 opacity-100 visible'
            : '-translate-y-full opacity-0 invisible pointer-events-none',
          // Glass effect when scrolled and visible
          isScrolled && isVisible
            ? 'py-2 sm:py-2 border-b border-white/20 shadow-2xl'
            : isScrolled
            ? 'navbar-gradient py-2 sm:py-2 shadow-lg border-b border-white/10'
            : 'navbar-gradient py-2 sm:py-3'
        )}
        style={
          isScrolled && isVisible
            ? {
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }
            : undefined
        }
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 lg:ml-0 xl:ml-16">
              {/* Logo at the front */}
              <Link href={`/${locale}`} className="flex items-center gap-2 group">
                <Image
                  src="/images/logo3.png"
                  alt="Property Icon Logo"
                  width={320}
                  height={107}
                  className="h-16 xl:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </Link>

              {/* Navigation Links */}
              <nav className="flex items-center space-x-4 xl:space-x-8">
                <Link
                  href={`/${locale}/about`}
                  className={cn(
                    "text-xs xl:text-sm font-medium transition-colors whitespace-nowrap",
                    isScrolled 
                      ? "text-gray-300 hover:text-gray-400"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {t('about')}
                </Link>
                <Link
                  href={`/${locale}/properties`}
                  className={cn(
                    "text-xs xl:text-sm font-medium transition-colors whitespace-nowrap",
                    isScrolled 
                      ? "text-gray-300 hover:text-gray-400"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {t('portfolio')}
                </Link>
                <Link
                  href={`/${locale}/sell`}
                  className={cn(
                    "text-xs xl:text-sm font-medium transition-colors whitespace-nowrap",
                    isScrolled 
                      ? "text-gray-300 hover:text-gray-400"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {t('sell')}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className={cn(
                    "text-xs xl:text-sm font-medium transition-colors whitespace-nowrap",
                    isScrolled 
                      ? "text-gray-300 hover:text-gray-400"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {t('contact')}
                </Link>
                <Link
                  href={`/${locale}/team`}
                  className={cn(
                    "text-xs xl:text-sm font-medium transition-colors whitespace-nowrap",
                    isScrolled 
                      ? "text-gray-300 hover:text-gray-400"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {t('team')}
                </Link>
              </nav>
            </div>

            {/* Logo for mobile */}
            <Link href={`/${locale}`} className="flex lg:hidden items-center gap-2 group">
              <Image
                src="/images/logo3.png"
                alt="Property Icon Logo"
                width={240}
                height={80}
                className="h-10 sm:h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>

            {/* Right side actions */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:mr-0 xl:mr-16">
              <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
                <LanguageSwitcher locale={locale} />
                <Link 
                  href={`/${locale}/contact`}
                  className="px-4 xl:px-6 py-2 xl:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs xl:text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:/40 whitespace-nowrap"
                >
                  Request Private portfolio
                </Link>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "lg:hidden p-2 rounded-md transition-colors",
                  isScrolled 
                    ? "hover:bg-gray-800 text-white"
                    : "hover:bg-white/10 text-white"
                )}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-[85%] sm:w-80 max-w-sm bg-gray-900 shadow-xl overflow-y-auto">
            <div className="p-4 sm:p-6 pt-16 sm:pt-20">
              <nav className="space-y-4 sm:space-y-6">
                <Link
                  href={`/${locale}/about`}
                  className="block text-base sm:text-lg font-medium text-gray-300 hover:text-gray-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('about')}
                </Link>
                <Link
                  href={`/${locale}/properties`}
                  className="block text-base sm:text-lg font-medium text-gray-300 hover:text-gray-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('portfolio')}
                </Link>
                <Link
                  href={`/${locale}/sell`}
                  className="block text-base sm:text-lg font-medium text-gray-300 hover:text-gray-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('sell')}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="block text-base sm:text-lg font-medium text-gray-300 hover:text-gray-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('contact')}
                </Link>
                <Link
                  href={`/${locale}/team`}
                  className="block text-base sm:text-lg font-medium text-gray-300 hover:text-gray-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('team')}
                </Link>
                <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                  <Link 
                    href={`/${locale}/contact`}
                    className="block w-full text-center px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-full transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Request Private Portfolio
                  </Link>
                  <div className="flex justify-center">
                    <LanguageSwitcher locale={locale} />
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}