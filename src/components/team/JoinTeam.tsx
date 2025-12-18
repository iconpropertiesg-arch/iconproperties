'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface JoinTeamProps {
  locale: string;
}

export default function JoinTeam({ locale }: JoinTeamProps) {
  return (
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join ICON PROPERTIES
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            We are always interested in collaborating with talented professionals who share our values of service, discretion and excellence.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Whether you're an agent, advisor or specialist, feel free to reach out.
          </p>
          <Link
            href={`/${locale}/join-us`}
            className="group inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50"
          >
            Apply Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}





