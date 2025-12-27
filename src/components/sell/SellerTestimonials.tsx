'use client';

import { Quote } from 'lucide-react';

interface SellerTestimonialsProps {
  locale: string;
}

const testimonials = [
  {
    id: 1,
    name: 'Anna & Erik S.',
    location: 'Sweden',
    text: "ICON sold our Son Vida villa privately in 30 days. No public exposure — exactly what we wanted."
  },
  {
    id: 2,
    name: 'Michael T.',
    location: 'Germany',
    text: 'Daniel brought us serious buyers quickly and handled everything from viewings to negotiation.'
  }
];

export default function SellerTestimonials({ locale }: SellerTestimonialsProps) {
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
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonials Grid - 2 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-12 h-12 text-gray-400 opacity-50" />
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-200 text-lg leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600/20 to-gray-700/20 flex items-center justify-center border border-gray-400/30">
                  <span className="text-gray-400 font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}










