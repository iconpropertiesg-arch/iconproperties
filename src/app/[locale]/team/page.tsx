import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import TeamHero from '@/components/team/TeamHero';
import Introduction from '@/components/team/Introduction';
import TeamProfiles from '@/components/team/TeamProfiles';
import WhyChooseTeam from '@/components/team/WhyChooseTeam';
import TeamTestimonials from '@/components/team/TeamTestimonials';
import JoinTeam from '@/components/team/JoinTeam';
import TeamFinalCTA from '@/components/team/TeamFinalCTA';

interface TeamPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: TeamPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'team' });

  return {
    title: 'Meet the ICON PROPERTIES Team - Boutique Real Estate Advisory',
    description: 'A boutique real estate advisory built on trust, discretion and deep local expertise.',
    alternates: {
      canonical: `/${locale}/team`,
      languages: {
        en: '/en/team',
        de: '/de/team',
        es: '/es/team',
      },
    },
  };
}

export default function TeamPage({ params: { locale } }: TeamPageProps) {
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <TeamHero locale={locale} />

      {/* Introduction Section */}
      <Introduction locale={locale} />

      {/* Team Profiles */}
      <TeamProfiles locale={locale} />

      {/* Why Choose Our Team */}
      <WhyChooseTeam locale={locale} />

      {/* Client Testimonials */}
      <TeamTestimonials locale={locale} />

      {/* Join the Team */}
      <JoinTeam locale={locale} />

      {/* Final CTA */}
      <TeamFinalCTA locale={locale} />
    </div>
  );
}







