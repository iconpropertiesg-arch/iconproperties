'use client';

import { Users, Lock, UserCheck } from 'lucide-react';

interface WhySellersTrustUsProps {
  locale: string;
}

export default function WhySellersTrustUs({ locale }: WhySellersTrustUsProps) {
  const pillars = [
    {
      icon: Users,
      title: 'Access to Qualified International Buyers',
      description: 'We work with serious clients from Germany, Switzerland, Scandinavia and the UK — all actively looking for premium homes.'
    },
    {
      icon: Lock,
      title: 'Discreet Off-Market Sales',
      description: 'Sell your property privately, without public exposure, photos online or mass marketing.'
    },
    {
      icon: UserCheck,
      title: 'Personal, Advisor-Led Service',
      description: 'Each client works directly with Daniel — no large teams, no churn, no noise.'
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Sellers Trust Us
          </h2>
        </div>

        {/* Three Pillars - 3-column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
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
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-lg">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}







