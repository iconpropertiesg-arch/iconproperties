'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, Shield, Clock, Award, Users } from 'lucide-react';

interface AboutSnippetProps {
  locale: string;
}

export default function AboutSnippet({ locale }: AboutSnippetProps) {
  const t = useTranslations();

  const values = [
    {
      icon: Shield,
      title: 'Discretion',
      description: 'Complete confidentiality in every transaction'
    },
    {
      icon: Clock,
      title: 'Speed',
      description: '48-hour response time guaranteed'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Premium service standards'
    },
    {
      icon: Users,
      title: 'Personal',
      description: 'Dedicated client relationships'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('about.subtitle')} We specialize in luxury properties across Mallorca's most desirable locations, 
              offering unparalleled expertise in the island's real estate market.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{value.title}</h4>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors group"
            >
              {t('about.cta')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/daniel-founder.jpg"
                alt="Daniel - Founder of Lion Capital Real Estate"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Founder Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Daniel Rodriguez</h3>
                <p className="text-white/90">Founder & Managing Director</p>
                <p className="text-sm text-white/80 mt-2">
                  15+ years experience in luxury real estate
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="absolute -bottom-8 -left-8 right-8 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">500+</div>
                <div className="text-xs text-gray-600">Properties Sold</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">€2.5B</div>
                <div className="text-xs text-gray-600">Sales Volume</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">98%</div>
                <div className="text-xs text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
