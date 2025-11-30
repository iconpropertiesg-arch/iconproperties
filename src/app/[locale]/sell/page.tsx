import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import SellHero from '@/components/sell/SellHero';
import WhySellWithUs from '@/components/sell/WhySellWithUs';
import OffMarketVsOnMarket from '@/components/sell/OffMarketVsOnMarket';
import SellProcess from '@/components/sell/SellProcess';
import TestimonialsSection from '@/components/sell/TestimonialsSection';
import ValuationForm from '@/components/sell/ValuationForm';
import MarketingSection from '@/components/sell/MarketingSection';
import FinalCTA from '@/components/sell/FinalCTA';
import SEOBlock from '@/components/sell/SEOBlock';

interface SellPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: SellPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'sell' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/sell`,
    },
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      images: ['/og-sell.jpg'],
    },
  };
}

export default async function SellPage({ params: { locale } }: SellPageProps) {
  // Enable static rendering
  setRequestLocale(locale);
  
  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <SellHero locale={locale} />

      {/* 2. Why Sell With ICON PROPERTIES */}
      <WhySellWithUs locale={locale} />

      {/* 3. Off-Market vs. On-Market */}
      <OffMarketVsOnMarket locale={locale} />

      {/* 4. Our Sales Process */}
      <SellProcess locale={locale} />

      {/* 5. Success & Testimonials */}
      <TestimonialsSection locale={locale} />

      {/* 6. Your Property Valuation (Main Lead Capture) */}
      <ValuationForm locale={locale} />

      {/* 7. How We Market Your Property */}
      <MarketingSection locale={locale} />

      {/* 8. Off-Market CTA (Final Push) */}
      <FinalCTA locale={locale} />

      {/* 9. SEO Block */}
      <SEOBlock locale={locale} />
    </div>
  );
}
