'use client';

import { Check, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface OffMarketVsOnMarketProps {
  locale: string;
}

export default function OffMarketVsOnMarket({ locale }: OffMarketVsOnMarketProps) {
  const t = useTranslations('sell.offMarket');
  
  const scrollToForm = () => {
    const form = document.getElementById('valuation-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-black py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Off-Market Sale (Left) */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-gray-700/20 text-gray-400 text-sm font-semibold rounded-full border border-gray-400/30">
                {t('offMarketBadge')}
              </span>
            </div>
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

          {/* On-Market Sale (Right) */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6">
              {t('onMarketTitle')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200 leading-relaxed">{t('onMarketPoint1')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200 leading-relaxed">{t('onMarketPoint2')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200 leading-relaxed">{t('onMarketPoint3')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={scrollToForm}
            className="group inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl "
          >
            {t('cta')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
