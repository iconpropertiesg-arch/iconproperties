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
    <section className="py-24 bg-black relative overflow-hidden border-t border-gray-800">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gray-700 rounded-full mix-blend-screen filter blur-[150px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[150px]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block bg-gray-700/20 text-gray-400 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-gray-500/30">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('about.title')}
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {t('about.subtitle')} We specialize in luxury properties across Mallorca's most desirable locations, 
              offering unparalleled expertise in the island's real estate market.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div 
                    key={value.title} 
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-xl p-4 border border-gray-700 hover:border-gray-500 transition-all hover:transform hover:scale-105 duration-300"
                  >
                    <div className="w-10 h-10 bg-gray-700/20 rounded-lg flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-gray-400" />
                    </div>
                    <h4 className="font-semibold text-white mb-1 text-sm">{value.title}</h4>
                    <p className="text-xs text-gray-400">{value.description}</p>
                  </div>
                );
              })}
            </div>

            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center bg-gray-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg  transform hover:scale-105 group"
            >
              {t('about.cta')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden border border-gray-700">
              <Image
                src="/daniel-founder.jpg"
                alt="Daniel - Founder of Lion Capital Real Estate"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              {/* Founder Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Daniel Rodriguez</h3>
                <p className="text-white/90 text-sm">Founder & Managing Director</p>
                <p className="text-xs text-white/80 mt-2">
                  15+ years experience in luxury real estate
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="absolute -bottom-8 -left-8 right-8 grid grid-cols-3 gap-4 hidden lg:grid">
              <div className="bg-gradient-to-br from-gray-700/90 to-gray-700/90 backdrop-blur-md rounded-xl shadow-2xl p-4 text-center border border-gray-500/50">
                <div className="text-2xl font-bold text-white mb-1">500+</div>
                <div className="text-xs text-gray-100">Properties Sold</div>
              </div>
              <div className="bg-gradient-to-br from-gray-700/90 to-gray-700/90 backdrop-blur-md rounded-xl shadow-2xl p-4 text-center border border-gray-500/50">
                <div className="text-2xl font-bold text-white mb-1">€2.5B</div>
                <div className="text-xs text-gray-100">Sales Volume</div>
              </div>
              <div className="bg-gradient-to-br from-gray-700/90 to-gray-700/90 backdrop-blur-md rounded-xl shadow-2xl p-4 text-center border border-gray-500/50">
                <div className="text-2xl font-bold text-white mb-1">98%</div>
                <div className="text-xs text-gray-100">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
