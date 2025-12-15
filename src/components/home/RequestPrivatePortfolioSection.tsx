'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import RequestPrivatePortfolioModal from '@/components/layout/RequestPrivatePortfolioModal';

interface RequestPrivatePortfolioSectionProps {
  locale: string;
}

export default function RequestPrivatePortfolioSection({ locale }: RequestPrivatePortfolioSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
        {/* Subtle glowing effects overlay */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center">
            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Request Your Private Portfolio
            </h2>

            {/* Subheadline */}
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Give us your preferences — we'll send you a curated selection tailored to your needs.
            </p>

            {/* Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50 inline-flex items-center gap-2"
            >
              <span>Request Private Portfolio</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Request Private Portfolio Modal */}
      <RequestPrivatePortfolioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locale={locale}
      />
    </>
  );
}






