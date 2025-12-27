'use client';

import { Lock, Sparkles, Globe } from 'lucide-react';

interface ValuePropositionProps {
  locale: string;
}

export default function ValueProposition({ locale }: ValuePropositionProps) {
  const pillars = [
    {
      icon: Lock,
      title: 'Off-Market Access',
      description: 'Most luxury villas in Mallorca never appear online. We show you exclusive listings before they reach the market.'
    },
    {
      icon: Sparkles,
      title: 'Personalised Curation',
      description: 'Your private portfolio is hand-picked based on your budget, timeline and lifestyle preferences.'
    },
    {
      icon: Globe,
      title: 'International Expertise',
      description: 'We work with buyers from Germany, Switzerland, the UK and Scandinavia looking for premium homes in Mallorca.'
    }
  ];

  return (
    <section className="relative bg-black py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Buyers Choose ICON PROPERTIES
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
                  <div className="w-16 h-16 rounded-full bg-gray-700/20 flex items-center justify-center border border-gray-400/30 group-hover:border-gray-400/50 transition-colors">
                    <Icon className="w-8 h-8 text-gray-400 stroke-[1.5]" />
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

