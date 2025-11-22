'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Lock, Users, MapPin, ArrowRight } from 'lucide-react';

interface WhyWorkWithUsProps {
  locale: string;
}

export default function WhyWorkWithUs({ locale }: WhyWorkWithUsProps) {
  const router = useRouter();
  const t = useTranslations('whyWorkWithUs');

  const features = [
    {
      icon: Lock,
      title: 'Off-Market Access',
      description: "Most of Mallorca's finest properties never reach public portals. We give our clients privileged access to private listings, pre-market opportunities and exclusive mandates you cannot find online."
    },
    {
      icon: Users,
      title: 'Discreet, Boutique Service',
      description: 'We work with a limited number of clients at a time, offering confidential guidance, curated shortlists and a single point of contact throughout the entire buying or selling process.'
    },
    {
      icon: MapPin,
      title: 'Proven Expertise in Prime Locations',
      description: "From Son Vida to Port Andratx, we specialise exclusively in Mallorca's most desirable areas, combining local knowledge with international buyer intelligence."
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">#5</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Work With Us
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A private, advisory-style service built for discerning international buyers and sellers.
          </p>
        </div>

        {/* Three Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-400/30 group-hover:border-blue-400/50 transition-colors">
                    <Icon className="w-8 h-8 text-blue-400 stroke-[1.5]" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => router.push(`/${locale}/contact`)}
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50 inline-flex items-center gap-2"
          >
            <span>Request Private Portfolio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

