'use client';

import { Check } from 'lucide-react';

interface WhyChooseTeamProps {
  locale: string;
}

const points = [
  'Personal, one-to-one service',
  'Boutique approach — no mass-market noise',
  'Expert knowledge of Mallorca\'s prime areas',
  'International clientele focus',
  'Full advisory from search to closing',
  'Off-market access through private network'
];

export default function WhyChooseTeam({ locale }: WhyChooseTeamProps) {
  return (
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Clients Choose Our Team
          </h2>
        </div>

        {/* Points Grid - 2 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {points.map((point, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-400/30">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
              </div>
              <p className="text-gray-200 leading-relaxed text-lg">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

