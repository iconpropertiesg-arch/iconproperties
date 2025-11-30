'use client';

import { useTranslations } from 'next-intl';

interface SEOBlockProps {
  locale: string;
}

export default function SEOBlock({ locale }: SEOBlockProps) {
  const t = useTranslations('sell.seo');

  return (
    <section className="py-12 bg-white px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t('title')}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {t('description')}
        </p>
      </div>
    </section>
  );
}
