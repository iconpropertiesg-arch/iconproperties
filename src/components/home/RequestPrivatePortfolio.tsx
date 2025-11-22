'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

interface RequestPrivatePortfolioProps {
  locale: string;
}

export default function RequestPrivatePortfolio({ locale }: RequestPrivatePortfolioProps) {
  const router = useRouter();

  const handleRequest = () => {
    router.push(`/${locale}/contact`);
  };

  return (
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Request Private Portfolio
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Most of Mallorca's finest properties are sold privately, without ever appearing on public portals.
          </p>

          {/* Description */}
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Get access to exclusive listings, pre-market opportunities, and private sales, personally curated for your lifestyle and investment needs.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleRequest}
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

