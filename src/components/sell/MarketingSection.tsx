'use client';

import { useTranslations } from 'next-intl';
import { Camera, Globe, FileText, MapPin } from 'lucide-react';

interface MarketingSectionProps {
  locale: string;
}

export default function MarketingSection({ locale }: MarketingSectionProps) {
  const t = useTranslations('sell.marketing');

  const features = [
    {
      icon: Camera,
      emoji: '📸',
      title: t('photography.title'),
      description: t('photography.description'),
    },
    {
      icon: Globe,
      emoji: '🎥',
      title: t('online.title'),
      description: t('online.description'),
    },
    {
      icon: FileText,
      emoji: '🗞',
      title: t('brochures.title'),
      description: t('brochures.description'),
    },
    {
      icon: MapPin,
      emoji: '🌍',
      title: t('international.title'),
      description: t('international.description'),
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="text-5xl mb-4">{feature.emoji}</div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-6 border border-blue-400/30 group-hover:border-blue-400/50 transition-colors">
                  <Icon className="w-8 h-8 text-blue-400 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
