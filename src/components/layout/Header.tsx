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
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const t = useTranslations('navigation');

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 20);

      // Hide header while scrolling down and show it again on scroll up
      if (isMobileMenuOpen) {
        setIsHidden(false);
        lastScrollY.current = currentScroll;
        return;
      }

      const isScrollingDown = currentScroll > lastScrollY.current;
      if (isScrollingDown && currentScroll > 120) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform',
          isHidden ? '-translate-y-full' : 'translate-y-0',
          isScrolled
            ? 'bg-blue-950/20 backdrop-blur-xl py-2 shadow-lg border-b border-white/10'
            : 'bg-transparent py-3'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and Navigation */}
            <div className="hidden lg:flex items-center space-x-8 ml-16">
              {/* Logo at the front */}
              <Link href={`/${locale}`} className="flex items-center gap-2 group">
                <Image
                  src="/images/logo3.png"
                  alt="Property Icon Logo"
                  width={320}
                  height={107}
                  className="h-20 w-auto transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </Link>

              {/* Navigation Links */}
              <nav className="flex items-center space-x-8">
                <Link
                  href={`/${locale}/about`}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isScrolled 
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {t('about')}
                </Link>
                <Link
                  href={`/${locale}/properties`}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isScrolled 
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {t('portfolio')}
                </Link>
                <Link
                  href={`/${locale}/sell`}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isScrolled 
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {t('sell')}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isScrolled 
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {t('contact')}
                </Link>
                <Link
                  href={`/${locale}/faq`}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isScrolled 
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {t('faq')}
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
                className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>

            {/* Right side actions */}
            <div className="flex items-center space-x-4 mr-16">
              <div className="hidden lg:flex items-center space-x-4">
                <LanguageSwitcher locale={locale} />
                <Link 
                  href={`/${locale}/contact`}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/40"
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
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
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
          <div className="absolute top-0 right-0 h-full w-80 max-w-full bg-gray-900 shadow-xl">
            <div className="p-6 pt-20">
              <nav className="space-y-6">
                <Link
                  href={`/${locale}/about`}
                  className="block text-lg font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('about')}
                </Link>
                <Link
                  href={`/${locale}/properties`}
                  className="block text-lg font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('portfolio')}
                </Link>
                <Link
                  href={`/${locale}/sell`}
                  className="block text-lg font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('sell')}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="block text-lg font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('contact')}
                </Link>
                <Link
                  href={`/${locale}/faq`}
                  className="block text-lg font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('faq')}
                </Link>
                <div className="pt-6 space-y-4">
                  <Link 
                    href={`/${locale}/contact`}
                    className="block w-full text-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get In Touch
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