'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface NavigationProps {
  locale: string;
  className?: string;
  onLinkClick?: () => void;
}

export default function Navigation({ locale, className, onLinkClick }: NavigationProps) {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'portfolio', href: `/${locale}/properties` },
    { key: 'sell', href: `/${locale}/sell` },
    { key: 'contact', href: `/${locale}/contact` },
    { key: 'team', href: `/${locale}/team` },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className={className}>
      <ul className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-8">
        {navItems.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(item.href) 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
              onClick={onLinkClick}
            >
              {item.key === 'team' ? 'Team' : t(item.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
