'use client';

import { useTranslations } from 'next-intl';

interface PropertiesHeaderProps {
  locale: string;
}

export default function PropertiesHeader({ locale }: PropertiesHeaderProps) {
  const t = useTranslations('properties');

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
}
