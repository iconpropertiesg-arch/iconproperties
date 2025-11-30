'use client';

import { useTranslations } from 'next-intl';
import { Globe, Lock, Camera, User } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface WhySellWithUsProps {
  locale: string;
}

export default function WhySellWithUs({ locale }: WhySellWithUsProps) {
  const t = useTranslations('sell.whySell');

  const points = [
    {
      icon: Globe,
      title: t('point1.title'),
      description: t('point1.description'),
    },
    {
      icon: Lock,
      title: t('point2.title'),
      description: t('point2.description'),
    },
    {
      icon: Camera,
      title: t('point3.title'),
      description: t('point3.description'),
    },
    {
      icon: User,
      title: t('point4.title'),
      description: t('point4.description'),
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-400/30 group-hover:border-blue-400/50 transition-colors">
                    <Icon className="w-8 h-8 text-blue-400 stroke-[1.5]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {point.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="#valuation-form"
            className="group inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            {t('cta')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
