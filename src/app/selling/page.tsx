import { Metadata } from 'next';
import SellHero from '@/components/sell/SellHero';
import WhySellersTrustUs from '@/components/sell/WhySellersTrustUs';
import OffMarketVsOnMarket from '@/components/sell/OffMarketVsOnMarket';
import HowWeSell from '@/components/sell/HowWeSell';
import SellingValuationForm from '@/components/sell/SellingValuationForm';
import SellerTestimonials from '@/components/sell/SellerTestimonials';
import SellFinalCTA from '@/components/sell/SellFinalCTA';
import MinimalFooter from '@/components/layout/MinimalFooter';

export const metadata: Metadata = {
  title: 'Sell Your Mallorca Property — Discreetly & Efficiently - ICON PROPERTIES',
  description: 'A boutique service for property owners seeking a discreet, premium and efficient sales process with qualified international buyers.',
  openGraph: {
    title: 'Sell Your Mallorca Property — Discreetly & Efficiently',
    description: 'A boutique service for property owners seeking a discreet, premium and efficient sales process with qualified international buyers.',
    images: ['/og-sell.jpg'],
  },
};

export default function SellingPage() {
  const locale = 'en'; // Default locale for the selling page
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <SellHero locale={locale} />

      {/* Why Sellers Trust Us (3 Pillars) */}
      <WhySellersTrustUs locale={locale} />

      {/* Off-Market vs On-Market Explanation */}
      <OffMarketVsOnMarket locale={locale} />

      {/* Our Sales Process (4 Steps) */}
      <HowWeSell locale={locale} />

      {/* Main Form - Request Valuation */}
      <SellingValuationForm locale={locale} />

      {/* Seller-Focused Testimonials */}
      <SellerTestimonials locale={locale} />

      {/* Final CTA Section */}
      <SellFinalCTA locale={locale} />

      {/* Minimal Footer */}
      <MinimalFooter locale={locale} />
    </div>
  );
}




