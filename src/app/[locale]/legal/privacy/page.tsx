import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Shield } from 'lucide-react';
import BackLink from '@/components/layout/BackLink';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/legal/privacy`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  };
}

const SECTION_KEYS = [
  'dataWeCollect',
  'howWeUse',
  'discretion',
  'cookies',
  'retention',
  'rights',
  'contact',
] as const;

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-28">
      <section className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            <BackLink
              locale={locale}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
            >
              ← Back
            </BackLink>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-blue-500" aria-hidden />
              <h1 className="text-3xl sm:text-4xl font-bold">{t('title')}</h1>
            </div>
            <p className="text-gray-400 text-sm mb-2">
              {t('lastUpdated')}: February 2026
            </p>
            <p className="text-gray-300 leading-relaxed">{t('intro')}</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="max-w-3xl mx-auto space-y-10">
            {SECTION_KEYS.map((key) => (
              <article key={key}>
                <h2 className="text-xl font-semibold text-white mb-3">
                  {t(`sections.${key}.title`)}
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {t(`sections.${key}.content`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <BackLink
            locale={locale}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            ← Return to home
          </BackLink>
        </div>
      </section>
    </div>
  );
}
