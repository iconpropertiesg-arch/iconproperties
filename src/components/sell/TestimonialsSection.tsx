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
    <section className="py-20 bg-white px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 via-blue-950 to-blue-900 rounded-2xl p-8 shadow-lg relative border border-white/10"
            >
              <div className="absolute top-6 right-6">
                <Quote className="w-12 h-12 text-blue-400/20" />
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
