import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ValueProposition from '@/components/home/ValueProposition';
import LifestyleGallery from '@/components/home/LifestyleGallery';
import HowItWorks from '@/components/home/HowItWorks';
import RequestPrivatePortfolioSection from '@/components/home/RequestPrivatePortfolioSection';
import Testimonials from '@/components/home/Testimonials';
import FinalCTA from '@/components/home/FinalCTA';
import MinimalFooter from '@/components/layout/MinimalFooter';

export const metadata: Metadata = {
  title: 'Buying Properties - Lion Capital Real Estate',
  description: 'Explore luxury properties for buying in Mallorca. Curated villas, apartments, and commercial spaces.',
  openGraph: {
    title: 'Buying Properties - Lion Capital Real Estate',
    description: 'Explore luxury properties for buying in Mallorca. Curated villas, apartments, and commercial spaces.',
    images: ['/og-home.jpg'],
  },
};

export default function BuyingPage() {
  const locale = 'en'; // Default locale for the buying page
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with Blue Gradient Background */}
      <HeroSection locale={locale} />

      {/* Value Proposition Section */}
      <ValueProposition locale={locale} />

      {/* Lifestyle Gallery Section */}
      <LifestyleGallery locale={locale} />

      {/* How It Works Section */}
      <HowItWorks locale={locale} />

      {/* Request Private Portfolio Section */}
      <RequestPrivatePortfolioSection locale={locale} />

      {/* Testimonials */}
      <Testimonials locale={locale} />

      {/* Final CTA Section */}
      <FinalCTA locale={locale} />

      {/* Minimal Footer */}
      <MinimalFooter locale={locale} />
    </div>
  );
}

