'use client';

import { useTranslations } from 'next-intl';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface OffMarketVsOnMarketProps {
  locale: string;
}

export default function OffMarketVsOnMarket({ locale }: OffMarketVsOnMarketProps) {
  const t = useTranslations('sell.offMarket');

  return (
    <section className="py-20 bg-white px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Off-Market Sale */}
          <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-blue-900 rounded-2xl p-8 shadow-lg border-2 border-blue-600/30">
            <h3 className="text-2xl font-bold text-white mb-6">
              {t('offMarketTitle')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200 leading-relaxed">{t('offMarketPoint1')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200 leading-relaxed">{t('offMarketPoint2')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200 leading-relaxed">{t('offMarketPoint3')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200 leading-relaxed">{t('offMarketPoint4')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200 leading-relaxed">{t('offMarketPoint5')}</span>
              </li>
            </ul>
          </div>

          {/* On-Market Sale */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t('onMarketTitle')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 leading-relaxed">{t('onMarketPoint1')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 leading-relaxed">{t('onMarketPoint2')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 leading-relaxed">{t('onMarketPoint3')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="#valuation-form"
            className="group inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50"
          >
            {t('cta')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
