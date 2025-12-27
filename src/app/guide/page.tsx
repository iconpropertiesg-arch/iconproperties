import { Metadata } from 'next';
import GuideHero from '@/components/guide/GuideHero';
import WhatsInside from '@/components/guide/WhatsInside';
import GuidePreview from '@/components/guide/GuidePreview';
import DownloadForm from '@/components/guide/DownloadForm';
import WhyGuideHelps from '@/components/guide/WhyGuideHelps';
import GuideFinalCTA from '@/components/guide/GuideFinalCTA';
import MinimalFooter from '@/components/layout/MinimalFooter';

export const metadata: Metadata = {
  title: 'Download the Mallorca Luxury Property Buyer Guide - ICON PROPERTIES',
  description: 'Free guide: Learn everything you need before buying a luxury property in Mallorca — legal steps, taxes, areas, budgets, negotiation tips and access to off-market listings.',
  openGraph: {
    title: 'Download the Mallorca Luxury Property Buyer Guide',
    description: 'Free guide: Learn everything you need before buying a luxury property in Mallorca.',
    images: ['/og-guide.jpg'],
  },
};

export default function GuidePage() {
  const locale = 'en'; // Default locale for the guide page
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <GuideHero locale={locale} />

      {/* What's Inside the Guide */}
      <WhatsInside locale={locale} />

      {/* Preview Section */}
      <GuidePreview locale={locale} />

      {/* Download Form (Main Conversion) */}
      <DownloadForm locale={locale} />

      {/* Why This Guide Helps */}
      <WhyGuideHelps locale={locale} />

      {/* Final CTA Section */}
      <GuideFinalCTA locale={locale} />

      {/* Minimal Footer */}
      <MinimalFooter locale={locale} />
    </div>
  );
}










