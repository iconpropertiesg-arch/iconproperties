'use client';

import { useTranslations } from 'next-intl';
import { TrendingUp, Clock, Star } from 'lucide-react';

interface SellHeroProps {
  locale: string;
}

export default function SellHero({ locale }: SellHeroProps) {
  const t = useTranslations('sell');

  const stats = [
    {
      icon: TrendingUp,
      value: '€3.2M',
      label: 'Average Sale Price',
      description: 'Our properties sell for premium prices'
    },
    {
      icon: Clock,
      value: '45 days',
      label: 'Average Time to Sell',
      description: 'Faster than market average'
    },
    {
      icon: Star,
      value: '98%',
      label: 'Of Asking Price',
      description: 'Achieved for our sellers'
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t('title')}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">24h</div>
                <div className="text-white/80 text-sm">Free Valuation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">0€</div>
                <div className="text-white/80 text-sm">Marketing Costs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">100%</div>
                <div className="text-white/80 text-sm">Confidential</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#valuation-form"
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center smooth-elevation"
              >
                Get Free Valuation
              </a>
              <a
                href="#process"
                className="bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-colors text-center"
              >
                Learn Our Process
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="font-medium mb-1">{stat.label}</div>
                      <div className="text-white/80 text-sm">{stat.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
