'use client';

import { useState, useEffect, useRef } from 'react';
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
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<'up' | 'down' | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const momentumScrollRef = useRef(false);
  const t = useTranslations('navigation');

  // Detect Safari browser
  const isSafari = useRef(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      isSafari.current = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    let lastScrollTime = Date.now();
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const currentTime = Date.now();
          const timeDelta = currentTime - lastScrollTime;
          lastScrollTime = currentTime;
          
          setIsScrolled(currentScroll > 20);
          
          // Safari momentum scrolling detection
          // If scroll events are firing very rapidly (< 16ms), it's likely momentum scrolling
          if (isSafari.current && timeDelta < 16) {
            momentumScrollRef.current = true;
            // Clear momentum flag after a delay
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = setTimeout(() => {
              momentumScrollRef.current = false;
            }, 150);
          }
          
          // Threshold for scroll direction change (minimum 5px difference)
          const scrollThreshold = 5;
          const scrollDifference = Math.abs(currentScroll - lastScrollY.current);
          
          // Hide navbar when scrolling down, show when scrolling up
          if (currentScroll < 10) {
            // At the top, always show
            setIsVisible(true);
            scrollDirection.current = null;
          } else if (scrollDifference >= scrollThreshold) {
            // Only update if scroll difference is significant
            if (currentScroll > lastScrollY.current) {
              // Scrolling down
              scrollDirection.current = 'down';
              if (currentScroll > 30) {
                // Hide navbar when scrolling down and past 30px
                // Allow hiding during momentum scrolling too (user intent was to scroll down)
                setIsVisible(false);
              }
            } else if (currentScroll < lastScrollY.current) {
              // Scrolling up
              scrollDirection.current = 'up';
              setIsVisible(true);
            }
            // Update lastScrollY only when there's a significant change
            lastScrollY.current = currentScroll;
          } else if (currentScroll === lastScrollY.current) {
            // Handle case where scroll position hasn't changed
            // During momentum scrolling, maintain state based on last known direction
            // This prevents unwanted toggling when Safari fires events with same scrollY
            if (momentumScrollRef.current) {
              if (scrollDirection.current === 'down' && currentScroll > 30) {
                // Keep hidden during momentum scroll down
                setIsVisible(false);
              } else if (scrollDirection.current === 'up') {
                // Keep visible during momentum scroll up
                setIsVisible(true);
              }
            }
            // If not momentum scrolling and scroll hasn't changed, maintain current state
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []); // Empty dependency array - no re-registration needed

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
          'fixed top-0 left-0 right-0 z-50 w-full',
          'transition-all duration-1000 ease-out',
          isVisible
            ? 'translate-y-0 opacity-100 visible'
            : '-translate-y-full opacity-0 invisible pointer-events-none',
          // Glass effect when scrolled and visible
          isScrolled && isVisible
            ? 'py-2 sm:py-2 border-b border-white/20 shadow-2xl'
            : isScrolled
            ? 'py-2 sm:py-2 shadow-lg border-b border-white/10'
            : 'py-2 sm:py-3'
        )}
        style={
          isScrolled && isVisible
            ? {
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                willChange: 'transform, opacity',
              }
            : {
                willChange: 'transform, opacity',
              }
        }
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16">
          <div className="flex items-center justify-between gap-2 sm:gap-4 min-w-0">
            {/* Left side - Logo and Navigation */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8 lg:ml-0 xl:ml-8 2xl:ml-16">
              {/* Logo at the front */}
              <Link href={`/${locale}`} className="flex items-center gap-2 group flex-shrink-0">
                <Image
                  src="/images/logo3.png"
                  alt="Property Icon Logo"
                  width={320}
                  height={107}
                  className="h-12 lg:h-14 xl:h-16 2xl:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </Link>

              {/* Navigation Links */}
              <nav className="flex items-center space-x-3 xl:space-x-4 2xl:space-x-8 flex-wrap">
                <Link
                  href={`/${locale}/about`}
                  className={cn(
                    "text-xs lg:text-xs xl:text-sm font-medium transition-colors whitespace-nowrap",
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
                    "text-xs lg:text-xs xl:text-sm font-medium transition-colors whitespace-nowrap",
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
                    "text-xs lg:text-xs xl:text-sm font-medium transition-colors whitespace-nowrap",
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
                    "text-xs lg:text-xs xl:text-sm font-medium transition-colors whitespace-nowrap",
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
                    "text-xs lg:text-xs xl:text-sm font-medium transition-colors whitespace-nowrap",
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
            <Link href={`/${locale}`} className="flex lg:hidden items-center gap-2 group min-w-0 flex-1 overflow-hidden">
              <Image
                src="/images/logo3.png"
                alt="Property Icon Logo"
                width={240}
                height={80}
                className="h-7 xs:h-8 sm:h-10 md:h-12 w-auto max-w-full transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>

            {/* Right side actions */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 lg:space-x-3 xl:space-x-4 lg:mr-0 xl:mr-8 2xl:mr-16 flex-shrink-0">
              <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 2xl:space-x-4">
                <LanguageSwitcher locale={locale} />
                <Link 
                  href={`/${locale}/contact`}
                  className="px-3 lg:px-4 xl:px-5 2xl:px-6 py-1.5 lg:py-2 xl:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs lg:text-xs xl:text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap"
                >
                  Request Private portfolio
                </Link>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "lg:hidden p-1.5 sm:p-2 rounded-md transition-colors flex-shrink-0",
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
        <div className="fixed inset-0 z-[60] lg:hidden m-0 p-0">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm m-0"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-[85%] xs:w-[75%] sm:w-80 md:w-96 max-w-sm bg-gray-900 shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-out m-0 p-0">
            <div className="p-4 sm:p-5 md:p-6 pt-16 sm:pt-20 md:pt-24 m-0">
              <nav className="space-y-3 sm:space-y-4 md:space-y-6">
                <Link
                  href={`/${locale}/about`}
                  className="block text-sm sm:text-base md:text-lg font-medium text-gray-300 hover:text-white transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('about')}
                </Link>
                <Link
                  href={`/${locale}/properties`}
                  className="block text-sm sm:text-base md:text-lg font-medium text-gray-300 hover:text-white transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('portfolio')}
                </Link>
                <Link
                  href={`/${locale}/sell`}
                  className="block text-sm sm:text-base md:text-lg font-medium text-gray-300 hover:text-white transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('sell')}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="block text-sm sm:text-base md:text-lg font-medium text-gray-300 hover:text-white transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('contact')}
                </Link>
                <Link
                  href={`/${locale}/team`}
                  className="block text-sm sm:text-base md:text-lg font-medium text-gray-300 hover:text-white transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('team')}
                </Link>
                <div className="pt-3 sm:pt-4 md:pt-6 space-y-2 sm:space-y-3 md:space-y-4 border-t border-gray-700 mt-3 sm:mt-4 md:mt-6">
                  <Link 
                    href={`/${locale}/contact`}
                    className="block w-full text-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm md:text-base font-medium rounded-full transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Request Private Portfolio
                  </Link>
                  <div className="flex justify-center pt-1 sm:pt-2">
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