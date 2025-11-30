'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface SellHeroProps {
  locale: string;
}

export default function SellHero({ locale }: SellHeroProps) {
  const t = useTranslations('sell');

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background - Dark gradient matching website theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-blue-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[150px]"></div>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10 py-20 ml-16 mr-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#valuation-form"
              className="group inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50"
            >
              {t('hero.primaryCta')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
            >
              {t('hero.secondaryCta')}
              <MessageCircle className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
