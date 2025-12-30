'use client';

import { useTranslations } from 'next-intl';

interface IntroductionProps {
  locale: string;
}

export default function Introduction({ locale }: IntroductionProps) {
  const t = useTranslations('team.introduction');
  
  return (
    <section className="relative bg-black py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
        </div>

        <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
          <p>
            {t('paragraph1')}
          </p>
          <p>
            {t('paragraph2')}
          </p>
        </div>
      </div>
    </section>
  );
}










