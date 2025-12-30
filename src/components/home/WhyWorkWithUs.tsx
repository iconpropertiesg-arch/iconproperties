'use client';

import { useRouter } from 'next/navigation';
import { Lock, Users, MapPin, ArrowRight } from 'lucide-react';
import { useBlurReveal } from '@/hooks/useBlurReveal';

interface WhyWorkWithUsProps {
  locale: string;
}

export default function WhyWorkWithUs({ locale }: WhyWorkWithUsProps) {
  const router = useRouter();
  
  // Blur reveal effects
  const { elementRef: titleRef, style: titleStyle } = useBlurReveal({ maxBlur: 8, minBlur: 0 });
  const { elementRef: subtitleRef, style: subtitleStyle } = useBlurReveal({ maxBlur: 8, minBlur: 0 });
  const { elementRef: featuresRef, style: featuresStyle } = useBlurReveal({ maxBlur: 8, minBlur: 0 });

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
    <section className="relative bg-black py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* <div className="inline-block mb-4">
            <span className="text-gray-400 text-sm font-semibold tracking-wider uppercase">#5</span>
          </div> */}
          <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} style={titleStyle} className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Work With Us
          </h2>
          <p ref={subtitleRef as React.RefObject<HTMLParagraphElement>} style={subtitleStyle} className="text-xl text-gray-300 max-w-3xl mx-auto">
            A private, advisory-style service built for discerning international buyers and sellers.
          </p>
        </div>

        {/* Three Feature Cards */}
        <div ref={featuresRef as React.RefObject<HTMLDivElement>} style={featuresStyle} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-gray-700/20 flex items-center justify-center border border-gray-400/30 group-hover:border-gray-400/50 transition-colors">
                    <Icon className="w-8 h-8 text-gray-400 stroke-[1.5]" />
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
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center gap-2"
          >
            <span>Request Private Portfolio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

