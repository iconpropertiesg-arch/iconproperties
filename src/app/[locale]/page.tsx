import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import HeroSearchBar from '@/components/home/HeroSearchBar';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import WhyWorkWithUs from '@/components/home/WhyWorkWithUs';
import AreasWeCover from '@/components/home/AreasWeCover';
import HowWeWork from '@/components/home/HowWeWork';
import RequestPrivatePortfolio from '@/components/home/RequestPrivatePortfolio';
import Testimonials from '@/components/home/Testimonials';
import AboutSnippet from '@/components/home/AboutSnippet';
import CallToAction from '@/components/home/CallToAction';
import AreaHighlights from '@/components/home/AreaHighlights';
import Newsletter from '@/components/home/Newsletter';

interface HomePageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: HomePageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'de': '/de',
        'es': '/es',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      images: ['/og-home.jpg'],
    },
  };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  // Enable static rendering
  setRequestLocale(locale);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with Blue Gradient Background */}
      <HeroSection locale={locale} />

      {/* Search Bar Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-slate-950 via-black to-black py-8">
        {/* Subtle glowing effects overlay */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
        </div>
        <HeroSearchBar locale={locale} />
      </section>

      {/* Featured Properties */}
      <FeaturedProperties locale={locale} />

      {/* Why Work With Us */}
      <WhyWorkWithUs locale={locale} />

      {/* Areas We Cover */}
      <AreasWeCover locale={locale} />

      {/* How We Work */}
      <HowWeWork locale={locale} />

      {/* Request Private Portfolio */}
      <RequestPrivatePortfolio locale={locale} />

      {/* Testimonials */}
      <Testimonials locale={locale} />

      {/* About Company Snapshot */}
      {/* <AboutSnippet locale={locale} /> */}

      {/* Call to Action - Hiring or Sell/Rent */}
      {/* <CallToAction locale={locale} variant="sell" /> */}

      {/* Area Highlights */}
      {/* <AreaHighlights locale={locale} /> */}

      {/* Newsletter Signup */}
      {/* <Newsletter locale={locale} /> */}
    </div>
  );
}
