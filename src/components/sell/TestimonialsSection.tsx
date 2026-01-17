'use client';

import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  locale: string;
}

export default function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const t = useTranslations('sell.testimonials');

  const testimonials = [
    {
      quote: t('testimonial1.quote'),
      author: t('testimonial1.author'),
    },
    {
      quote: t('testimonial2.quote'),
      author: t('testimonial2.author'),
    },
  ];

  return (
    <section className="relative bg-black py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="absolute top-6 right-6">
                <Quote className="w-12 h-12 text-gray-400/20" />
              </div>
              <p className="text-gray-200 text-lg leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-white/10 pt-6">
                <p className="text-white font-semibold">
                  — {testimonial.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
