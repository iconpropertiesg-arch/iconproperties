'use client';

import { useTranslations } from 'next-intl';

interface SellProcessProps {
  locale: string;
}

export default function SellProcess({ locale }: SellProcessProps) {
  const t = useTranslations('sell.process');

  const steps = [
    {
      image: '/images/1.jpg',
      title: t('step1.title'),
      description: t('step1.description'),
      number: 1,
    },
    {
      image: '/images/2.jpg',
      title: t('step2.title'),
      description: t('step2.description'),
      number: 2,
    },
    {
      image: '/images/3.jpg',
      title: t('step3.title'),
      description: t('step3.description'),
      number: 3,
    },
    {
      image: '/images/4.jpg',
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
                      {/* <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-gray-400/30">
                        <img
                          src={step.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div> */}
                      {/* <div className="text-4xl font-bold text-gray-400">
                        {step.number}
                      </div> */}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Visual - step image */}
                  <div className={isEven ? 'lg:col-start-1' : ''}>
                    <div className="relative">
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-600/10 to-gray-700/5">
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover"
                          />
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
