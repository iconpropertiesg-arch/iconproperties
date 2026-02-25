'use client';

import Link from 'next/link';

interface BackLinkProps {
  locale: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Back link that navigates to the home page. Uses Next.js Link for reliable
 * client-side navigation in all browsers.
 */
export default function BackLink({ locale, children, className = '' }: BackLinkProps) {
  return (
    <Link href={`/${locale}`} className={className}>
      {children}
    </Link>
  );
}
