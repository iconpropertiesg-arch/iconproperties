  import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Clock, Award, Users, ArrowRight, CheckCircle } from 'lucide-react';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/about`,
    },
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      images: ['/og-about.jpg'],
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'about' });

  const values = [
    {
      icon: Shield,
      title: t('values.discretion'),
      description: t('values.discretionDesc')
    },
    {
      icon: Award,
      title: t('values.design'),
      description: t('values.designDesc')
    },
    {
      icon: Clock,
      title: t('values.speed'),
      description: t('values.speedDesc')
    },
    {
      icon: Users,
      title: t('values.service'),
      description: t('values.serviceDesc')
    }
  ];

  const team = [
    {
      name: t('team.members.daniel.name'),
      role: t('team.members.daniel.role'),
      image: '/images/member1.png',
      description: t('team.members.daniel.description'),
      languages: ['English', 'Spanish', 'German'],
      certifications: ['Licensed Real Estate Agent', 'Luxury Property Specialist']
    },
    {
      name: t('team.members.marina.name'),
      role: t('team.members.marina.role'),
      image: '/images/member2.png',
      description: t('team.members.marina.description'),
      languages: ['German', 'English', 'Spanish'],
      certifications: ['Certified International Property Specialist', 'Luxury Home Marketing Specialist']
    },
    {
      name: t('team.members.carlos.name'),
      role: t('team.members.carlos.role'),
      image: '/images/member3.png',
      description: t('team.members.carlos.description'),
      languages: ['Spanish', 'English', 'Catalan'],
      certifications: ['Commercial Real Estate License', 'Investment Property Advisor']
    }
  ];

  const achievements = [
    { number: '€2.5B+', label: t('achievements.totalSales') },
    { number: '500+', label: t('achievements.propertiesSold') },
    { number: '98%', label: t('achievements.clientSatisfaction') },
    { number: '15+', label: t('achievements.yearsExperience') }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with animated gradient */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated blob shapes */}
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 animate-fade-in-up">
              {t('badge')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up animation-delay-200">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed animate-fade-in-up animation-delay-400">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">{t('story.title')}</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  {t('story.paragraph1')}
                </p>
                <p>
                  {t('story.paragraph2')}
                </p>
                <p>
                  {t('story.paragraph3')}
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-gray-700">
              <Image
                src="/images/about_page.jpg"
                alt={t('story.imageAlt')}
                width={600}
                height={400}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">{t('values.title')}</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t('values.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-xl p-8 border border-gray-700 hover:border-gray-500 transition-all hover:transform hover:scale-105 duration-300">
                  <div className="w-16 h-16 bg-gray-700/20 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">{t('team.title')}</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t('team.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-2xl border border-gray-700 overflow-hidden hover:border-gray-500 transition-all hover:transform hover:scale-105 duration-300">
                <div className="relative h-80">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-gray-400 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{member.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">{t('team.languages')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.languages.map((lang) => (
                          <span key={lang} className="bg-gray-700/20 text-gray-300 px-3 py-1 rounded-full text-xs border border-gray-500/30">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">{t('team.certifications')}</h4>
                      <ul className="space-y-2">
                        {member.certifications.map((cert, certIndex) => (
                          <li key={certIndex} className="flex items-start text-xs text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 border-t border-gray-800 bg-gray-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">{t('achievements.title')}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('achievements.description')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-2xl border border-gray-700">
                <div className="text-4xl md:text-5xl font-bold text-gray-400 mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-300 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900/20 border border-gray-500/30 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center bg-gray-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-600 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              {t('cta.button')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
