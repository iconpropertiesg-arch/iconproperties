'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FinalCTAProps {
  locale: string;
}

export default function FinalCTA({ locale }: FinalCTAProps) {
  const t = useTranslations('sell.finalCta');

  return (
    <section className="relative bg-black py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            {t('description')}
          </p>
          <Link
            href="#valuation-form"
            className="group inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl "
          >
            {t('cta')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
