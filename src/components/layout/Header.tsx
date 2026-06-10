'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import RequestPrivatePortfolioModal from './RequestPrivatePortfolioModal';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const lastScrollDirection = useRef<'up' | 'down' | null>(null);
  const ticking = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // iOS Safari: track touch velocity to detect scroll-up intent
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);

  const t = useTranslations('navigation');

  useEffect(() => {
    // iOS Safari can return negative scroll values during bounce — clamp to 0
    const getScrollY = (): number => {
      const y = window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
      return Math.max(0, y);
    };

    lastScrollY.current = getScrollY();

    const updateHeader = () => {
      const currentScrollY = getScrollY();

      // Always show near the top
      if (currentScrollY < 80) {
        setIsScrolled(false);
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        ticking.current = false;
        return;
      }

      setIsScrolled(true);

      const diff = currentScrollY - lastScrollY.current;

      // Ignore tiny jitter (iOS can fire many near-zero deltas)
      if (Math.abs(diff) < 3) {
        ticking.current = false;
        return;
      }

      if (diff < 0) {
        // Scrolling UP — always show
        lastScrollDirection.current = 'up';
        setIsVisible(true);
      } else if (diff > 6) {
        // Scrolling DOWN — hide
        lastScrollDirection.current = 'down';
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const scheduleUpdate = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateHeader);
      }
    };

    const onScroll = () => {
      scheduleUpdate();

      // iOS momentum scroll: keep checking after scroll events stop
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        ticking.current = false;
        updateHeader();
      }, 150);
    };

    // --- iOS Touch handling ---
    // We track swipe direction independently because iOS scroll events can lag
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.touches[0].clientY; // positive = scroll down
      const currentScrollY = getScrollY();

      if (currentScrollY < 80) {
        setIsVisible(true);
        return;
      }

      // Use swipe velocity: if finger is moving up (negative deltaY), show header immediately
      if (deltaY < -8) {
        setIsVisible(true);
        lastScrollDirection.current = 'up';
      } else if (deltaY > 12) {
        setIsVisible(false);
        lastScrollDirection.current = 'down';
      }
    };

    const handleTouchEnd = () => {
      // Re-evaluate after iOS finishes its momentum scroll (debounced)
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        ticking.current = false;
        updateHeader();
      }, 300);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // scrollend — supported in newer browsers, nice bonus
    window.addEventListener('scrollend', updateHeader as EventListener, { passive: true });

    updateHeader();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scrollend', updateHeader as EventListener);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

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
          'fixed top-0 left-0 right-0 w-full',
          // Smoother slide on phones; slightly snappier on large screens
          'transition-[transform,opacity] duration-300 ease-out',
          'max-lg:duration-500 max-lg:ease-[cubic-bezier(0.4,0,0.2,1)]',
          // Mobile menu open: stay above dropdown overlay so Menu ↔ X stays clickable
          isMobileMenuOpen ? 'z-[70]' : 'z-50',
          isVisible
            ? 'translate-y-0 opacity-100 visible'
            : '-translate-y-full opacity-0 pointer-events-none invisible'
        )}
      >
        {/* Mobile / tablet: hero-style black + cobalt + purple (matches home hero) */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 z-0 lg:hidden transition-opacity duration-500 ease-out',
            (isScrolled || isMobileMenuOpen) && isVisible ? 'opacity-100' : 'opacity-0'
          )}
          aria-hidden
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent" />
          <div
            className="absolute -top-12 -left-12 h-44 w-44 sm:h-52 sm:w-52 animate-cobalt-glow-pulse"
            style={{
              background:
                'radial-gradient(circle, rgba(19, 56, 190, 0.72) 0%, rgba(19, 56, 190, 0.35) 35%, rgba(19, 56, 190, 0.12) 55%, transparent 72%)',
              boxShadow: '0 0 64px rgba(19, 56, 190, 0.35), 0 0 96px rgba(19, 56, 190, 0.2)',
            }}
          />
          <div className="absolute -right-4 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[40px] animate-pulse-slow animation-delay-2000 sm:h-40 sm:w-40 sm:blur-[52px]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400/45 to-transparent" />
        </div>

        {/* Desktop: existing glass header when scrolled */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 z-0 hidden transition-opacity duration-500 ease-out lg:block',
            isScrolled && isVisible ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          }}
          aria-hidden
        />

        <div
          className={cn(
            'relative z-10 transition-[padding] duration-500 ease-out max-lg:duration-500',
            isScrolled ? 'py-1.5 sm:py-1.5' : 'py-1.5 sm:py-2'
          )}
        >
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16">
            <div className="flex items-center justify-between gap-2 sm:gap-4 min-w-0">
              {/* Left side - Logo and Navigation */}
              <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8 lg:ml-0 xl:ml-8 2xl:ml-16">
                <Link href={`/${locale}`} className="flex items-center gap-2 group flex-shrink-0">
                  <Image
                    src="/images/logo3.png"
                    alt="Property Icon Logo"
                    width={420}
                    height={207}
                    className="h-20 lg:h-24 xl:h-28 2xl:h-32 w-auto transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </Link>

                <nav className="flex items-center space-x-3 xl:space-x-4 2xl:space-x-8 flex-wrap">
                  <Link
                    href={`/${locale}/about`}
                    className={cn(
                      'text-xs lg:text-xs xl:text-sm font-medium transition-colors whitespace-nowrap',
                      isScrolled
                        ? 'text-gray-300 hover:text-gray-400'
                        : 'text-white/90 hover:text-white'
                    )}
                  >
                    {t('about')}
                  </Link>
                  <Link
                    href={`/${locale}/properties`}
                    className={cn(
                      'text-xs lg:text-xs xl:text-sm font-medium transition-colors whitespace-nowrap',
                      isScrolled
                        ? 'text-gray-300 hover:text-gray-400'
                        : 'text-white/90 hover:text-white'
                    )}
                  >
                    {t('portfolio')}
                  </Link>
                  <Link
                    href={`/${locale}/sell`}
                    className={cn(
                      'text-xs lg:text-xs xl:text-sm font-medium transition-colors whitespace-nowrap',
                      isScrolled
                        ? 'text-gray-300 hover:text-gray-400'
                        : 'text-white/90 hover:text-white'
                    )}
                  >
                    {t('sell')}
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    className={cn(
                      'text-xs lg:text-xs xl:text-sm font-medium transition-colors whitespace-nowrap',
                      isScrolled
                        ? 'text-gray-300 hover:text-gray-400'
                        : 'text-white/90 hover:text-white'
                    )}
                  >
                    {t('contact')}
                  </Link>
                  <Link
                    href={`/${locale}/team`}
                    className={cn(
                      'text-xs lg:text-xs xl:text-sm font-medium transition-colors whitespace-nowrap',
                      isScrolled
                        ? 'text-gray-300 hover:text-gray-400'
                        : 'text-white/90 hover:text-white'
                    )}
                  >
                    {t('team')}
                  </Link>
                </nav>
              </div>

              {/* Logo for mobile */}
              <Link
                href={`/${locale}`}
                className="flex lg:hidden items-center gap-2 group min-w-0 flex-1 overflow-hidden"
              >
                <Image
                  src="/images/logo3.png"
                  alt="Property Icon Logo"
                  width={280}
                  height={117}
                  className="h-9 xs:h-10 sm:h-12 md:h-14 w-auto max-w-full transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </Link>

              {/* Right side actions */}
              <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 lg:space-x-3 xl:space-x-4 lg:mr-0 xl:mr-8 2xl:mr-16 flex-shrink-0">
                <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 2xl:space-x-4">
                  <LanguageSwitcher locale={locale} />
                  <button
                    type="button"
                    onClick={() => setIsPortfolioModalOpen(true)}
                    className="px-3 lg:px-4 xl:px-5 2xl:px-6 py-1.5 lg:py-2 xl:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs lg:text-xs xl:text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap"
                  >
                    Request Private portfolio
                  </button>
                </div>

                {/* Mobile Menu Button — smooth Menu ↔ X */}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={cn(
                    'lg:hidden relative p-1.5 sm:p-2 rounded-md flex-shrink-0 transition-colors duration-300',
                    isScrolled
                      ? 'hover:bg-gray-800 text-white'
                      : 'hover:bg-white/10 text-white'
                  )}
                  aria-expanded={isMobileMenuOpen}
                  aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  <span className="relative block w-5 h-5 sm:w-6 sm:h-6">
                    <Menu
                      className={cn(
                        'absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ease-out',
                        isMobileMenuOpen
                          ? 'opacity-0 scale-75 rotate-90'
                          : 'opacity-100 scale-100 rotate-0'
                      )}
                      aria-hidden
                    />
                    <X
                      className={cn(
                        'absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ease-out',
                        isMobileMenuOpen
                          ? 'opacity-100 scale-100 rotate-0'
                          : 'opacity-0 scale-75 -rotate-90'
                      )}
                      aria-hidden
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu: top sheet (slides down), header stays above dimmed backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ease-out',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop — below header so bar + toggle stay usable */}
        <div
          className="absolute left-0 right-0 top-14 sm:top-16 bottom-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        {/* Panel slides from top — same black + cobalt + purple as HeroSection */}
        <div
          className={cn(
            'absolute left-0 right-0 top-14 sm:top-16',
            'shadow-2xl rounded-b-2xl border border-white/15 border-t-0 backdrop-blur-xl',
            'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform',
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          )}
        >
          <div className="relative max-h-[min(85vh,calc(100dvh-3.5rem))] overflow-y-auto">
            <div className="pointer-events-none absolute inset-0 z-0 min-h-full overflow-hidden rounded-b-2xl" aria-hidden>
              <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent" />
              <div className="absolute inset-0 opacity-30">
                <div className="absolute bottom-0 left-1/3 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full bg-purple-500/15 blur-[60px] sm:blur-[80px] animate-pulse-slow animation-delay-2000" />
              </div>
              <div
                className="absolute -top-10 -left-10 h-44 w-44 sm:h-56 sm:w-56 rounded-full animate-cobalt-glow-pulse"
                style={{
                  background:
                    'radial-gradient(circle, rgba(19, 56, 190, 0.8) 0%, rgba(19, 56, 190, 0.45) 35%, rgba(19, 56, 190, 0.15) 55%, transparent 72%)',
                  boxShadow:
                    '0 0 72px rgba(19, 56, 190, 0.45), 0 0 110px rgba(19, 56, 190, 0.28)',
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/35 to-transparent" />
            </div>
            <div className="relative z-10 p-4 sm:p-5 md:p-6 pb-8">
            <nav className="space-y-3 sm:space-y-4 md:space-y-6">
              <Link
                href={`/${locale}/about`}
                className="block text-sm sm:text-base md:text-lg font-medium text-white/80 hover:text-white transition-colors py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('about')}
              </Link>
              <Link
                href={`/${locale}/properties`}
                className="block text-sm sm:text-base md:text-lg font-medium text-white/80 hover:text-white transition-colors py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('portfolio')}
              </Link>
              <Link
                href={`/${locale}/sell`}
                className="block text-sm sm:text-base md:text-lg font-medium text-white/80 hover:text-white transition-colors py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('sell')}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="block text-sm sm:text-base md:text-lg font-medium text-white/80 hover:text-white transition-colors py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('contact')}
              </Link>
              <Link
                href={`/${locale}/team`}
                className="block text-sm sm:text-base md:text-lg font-medium text-white/80 hover:text-white transition-colors py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('team')}
              </Link>
              <div className="pt-3 sm:pt-4 md:pt-6 space-y-2 sm:space-y-3 md:space-y-4 border-t border-white/15 mt-3 sm:mt-4 md:mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsPortfolioModalOpen(true);
                  }}
                  className="block w-full text-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm md:text-base font-medium rounded-full transition-all duration-300"
                >
                  Request Private Portfolio
                </button>
                <div className="flex justify-center pt-1 sm:pt-2">
                  <LanguageSwitcher locale={locale} />
                </div>
              </div>
            </nav>
            </div>
          </div>
        </div>
      </div>

      <RequestPrivatePortfolioModal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
        locale={locale}
      />
    </>
  );
}