'use client';

import Link from 'next/link';

interface MinimalFooterProps {
  locale: string;
}

export default function MinimalFooter({ locale }: MinimalFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-black via-blue-950 to-blue-900 text-white border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} ICON PROPERTIES. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link 
              href={`/${locale}/legal/privacy`}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>
            <Link 
              href={`/${locale}/legal/notice`}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Legal Notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}



