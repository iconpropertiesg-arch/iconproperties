'use client';

import Image from 'next/image';
import { Shield, Eye, Target, Award } from 'lucide-react';

interface TeamProfilesProps {
  locale: string;
}

const keyValues = [
  {
    icon: Shield,
    label: 'Discretion'
  },
  {
    icon: Eye,
    label: 'Transparency'
  },
  {
    icon: Target,
    label: 'Precision'
  },
  {
    icon: Award,
    label: 'Premium client experience'
  }
];

export default function TeamProfiles({ locale }: TeamProfilesProps) {
  return (
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Founder Profile */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Image */}
              <div className="md:col-span-1">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800">
                  {/* Placeholder for Daniel's portrait - replace with actual image */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-gray-800/30 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Daniel's Portrait</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-2">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-sm font-semibold rounded-full border border-blue-400/30">
                    Founder & Lead Advisor
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Daniel — Founder & Private Client Advisor
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Daniel specialises in helping international buyers and luxury property owners navigate Mallorca's premium real estate market. With a strong background in high-end marketing, negotiations and client relations, he provides a modern, data-driven approach combined with a deeply personal advisory experience.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  He works primarily with clients from Germany, Switzerland, the UK and Scandinavia and focuses on:
                </p>
                <ul className="space-y-2 mb-8 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Luxury villa acquisitions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Off-market sales</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Investment guidance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Area advisory</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>End-to-end buying support</span>
                  </li>
                </ul>

                {/* Key Values */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Key Values:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {keyValues.map((value, index) => {
                      const Icon = value.icon;
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center text-center p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <Icon className="w-6 h-6 text-blue-400 mb-2" />
                          <span className="text-sm text-gray-300">{value.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future Team Members Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white mb-6">
              Expanding Our Private Advisory Network
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              As ICON PROPERTIES grows, we partner with trusted professionals in:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span className="text-gray-300">Legal & tax advisory</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span className="text-gray-300">Architecture & construction</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span className="text-gray-300">Interior design</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span className="text-gray-300">Property management</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span className="text-gray-300">Mortgage & financing services</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mt-6">
              Every partner is hand-selected to ensure clients receive reliable, high-quality, end-to-end support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}




