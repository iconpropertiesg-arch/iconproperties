'use client';

import Image from 'next/image';
import { Shield, Eye, Target, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface TeamProfilesProps {
  locale: string;
}

export default function TeamProfiles({ locale }: TeamProfilesProps) {
  const t = useTranslations('team.profiles');
  
  const keyValues = [
    {
      icon: Shield,
      label: t('discretion')
    },
    {
      icon: Eye,
      label: t('transparency')
    },
    {
      icon: Target,
      label: t('precision')
    },
    {
      icon: Award,
      label: t('premiumExperience')
    }
  ];
  
  return (
    <section className="relative bg-black py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        
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
                  <div className="w-full h-full bg-gradient-to-br from-gray-900/30 to-gray-800/30 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Daniel's Portrait</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-2">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-gray-700/20 text-gray-400 text-sm font-semibold rounded-full border border-gray-400/30">
                    {t('founderBadge')}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {t('founderTitle')}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {t('founderDescription1')}
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {t('founderDescription2')}
                </p>
                <ul className="space-y-2 mb-8 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>{t('focus1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>{t('focus2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>{t('focus3')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>{t('focus4')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>{t('focus5')}</span>
                  </li>
                </ul>

                {/* Key Values */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">{t('keyValues')}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {keyValues.map((value, index) => {
                      const Icon = value.icon;
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center text-center p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <Icon className="w-6 h-6 text-gray-400 mb-2" />
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
              {t('expandingTitle')}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t('expandingDescription')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span className="text-gray-300">{t('partner1')}</span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span className="text-gray-300">{t('partner2')}</span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span className="text-gray-300">{t('partner3')}</span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span className="text-gray-300">{t('partner4')}</span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span className="text-gray-300">{t('partner5')}</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mt-6">
              {t('expandingFooter')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}










