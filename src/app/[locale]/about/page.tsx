import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Clock, Award, Users, ArrowRight, CheckCircle } from 'lucide-react';

interface AboutPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: AboutPageProps): Promise<Metadata> {
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

export default async function AboutPage({ params: { locale } }: AboutPageProps) {
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'about' });

  const values = [
    {
      icon: Shield,
      title: t('values.discretion'),
      description: 'Complete confidentiality and privacy in every transaction, respecting our clients\' need for discretion.'
    },
    {
      icon: Award,
      title: t('values.design'),
      description: 'Curating only the finest properties that meet our exacting standards for design and quality.'
    },
    {
      icon: Clock,
      title: t('values.speed'),
      description: '48-hour response guarantee with streamlined processes for swift, efficient service.'
    },
    {
      icon: Users,
      title: t('values.service'),
      description: 'Personalized, white-glove service tailored to each client\'s unique requirements and preferences.'
    }
  ];

  const team = [
    {
      name: 'Daniel Rodriguez',
      role: 'Founder & Managing Director',
      image: '/team/daniel.jpg',
      description: 'With over 15 years in luxury real estate, Daniel brings unparalleled market knowledge and a passion for exceptional service.',
      languages: ['English', 'Spanish', 'German'],
      certifications: ['Licensed Real Estate Agent', 'Luxury Property Specialist']
    },
    {
      name: 'Marina Hoffmann',
      role: 'Senior Sales Director',
      image: '/team/marina.jpg',
      description: 'Marina specializes in high-end residential properties and has facilitated over €200M in luxury sales.',
      languages: ['German', 'English', 'Spanish'],
      certifications: ['Certified International Property Specialist', 'Luxury Home Marketing Specialist']
    },
    {
      name: 'Carlos Mendez',
      role: 'Commercial Properties Director',
      image: '/team/carlos.jpg',
      description: 'Carlos leads our commercial division with expertise in investment properties and commercial real estate.',
      languages: ['Spanish', 'English', 'Catalan'],
      certifications: ['Commercial Real Estate License', 'Investment Property Advisor']
    }
  ];

  const achievements = [
    { number: '€2.5B+', label: 'Total Sales Volume' },
    { number: '500+', label: 'Properties Sold' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '15+', label: 'Years Experience' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-blue-900">
      {/* Hero Section with animated gradient */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated blob shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 animate-fade-in-up">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up animation-delay-200">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed animate-fade-in-up animation-delay-400">
              {t('subtitle')} We specialize in luxury properties across Mallorca's most desirable locations, 
              offering unparalleled expertise and personalized service to discerning clients worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gradient-to-br from-gray-800/50 to-blue-900/30 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Founded with a vision to redefine luxury real estate in Mallorca, Lion Capital Real Estate 
                  has grown from a boutique agency to one of the island's most trusted names in premium property services.
                </p>
                <p>
                  Our journey began with a simple belief: that exceptional properties deserve exceptional service. 
                  This philosophy has guided us through every transaction, every client relationship, and every 
                  milestone in our company's evolution.
                </p>
                <p>
                  Today, we continue to set new standards in the industry, combining traditional values of trust 
                  and discretion with innovative marketing strategies and cutting-edge technology.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-gray-700">
              <Image
                src="/about/company-story.jpg"
                alt="Lion Capital Real Estate office"
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
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              These core principles guide every aspect of our business and define our commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-gray-800/50 to-blue-900/30 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all hover:transform hover:scale-105 duration-300">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-blue-400" />
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
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our experienced professionals bring deep local knowledge and international expertise to every client interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-blue-900/30 rounded-2xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-all hover:transform hover:scale-105 duration-300">
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
                  <p className="text-blue-400 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{member.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Languages:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.languages.map((lang) => (
                          <span key={lang} className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs border border-blue-500/30">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Certifications:</h4>
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
      <section className="py-20 border-t border-gray-800 bg-gradient-to-br from-blue-600/10 to-purple-600/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-blue-900/30 rounded-2xl border border-gray-700">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
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
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Work with Us?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're buying, selling, or simply exploring the Mallorca luxury market, 
              our team is here to provide expert guidance and exceptional service.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-600/50 transform hover:scale-105"
            >
              {t('cta')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
