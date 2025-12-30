'use client';

import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface WhyChooseTeamProps {
  locale: string;
}

export default function WhyChooseTeam({ locale }: WhyChooseTeamProps) {
  const t = useTranslations('team.whyChoose');
  
  const points = [
    t('point1'),
    t('point2'),
    t('point3'),
    t('point4'),
    t('point5'),
    t('point6')
  ];
  
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
        </div>

        {/* Points Grid - 2 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {points.map((point, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-400/30">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
              </div>
              <p className="text-gray-200 leading-relaxed text-lg">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

