'use client';

import { useTranslations } from 'next-intl';

interface SEOBlockProps {
  locale: string;
}

export default function SEOBlock({ locale }: SEOBlockProps) {
  const t = useTranslations('sell.seo');

  return (
    <section className="relative bg-black py-12 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 className="text-2xl font-bold text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-gray-300 leading-relaxed">
          {t('description')}
        </p>
      </div>
    </section>
  );
}
