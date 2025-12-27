'use client';

import { useTranslations } from 'next-intl';
import { Calculator, Camera, Users, Key } from 'lucide-react';

interface SellProcessProps {
  locale: string;
}

export default function SellProcess({ locale }: SellProcessProps) {
  const t = useTranslations('sell.process');

  const steps = [
    {
      icon: Calculator,
      title: t('step1.title'),
      description: t('step1.description'),
      number: 1,
    },
    {
      icon: Camera,
      title: t('step2.title'),
      description: t('step2.description'),
      number: 2,
    },
    {
      icon: Users,
      title: t('step3.title'),
      description: t('step3.description'),
      number: 3,
    },
    {
      icon: Key,
      title: t('step4.title'),
      description: t('step4.description'),
      number: 4,
    },
  ];

  return (
    <section className="relative bg-black py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 1;

              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    isEven ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={isEven ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-600/20 to-gray-700/20 flex items-center justify-center border border-gray-400/30">
                        <Icon className="w-8 h-8 text-gray-400 stroke-[1.5]" />
                      </div>
                      <div className="text-4xl font-bold text-gray-400">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Visual */}
                  <div className={isEven ? 'lg:col-start-1' : ''}>
                    <div className="relative">
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <div className="aspect-square bg-gradient-to-br from-gray-600/10 to-gray-700/5 rounded-xl flex items-center justify-center">
                          <Icon className="w-20 h-20 text-gray-400" />
                        </div>
                      </div>
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                        {step.number}
                      </div>
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
