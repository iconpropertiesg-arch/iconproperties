'use client';

interface TeamTestimonialsProps {
  locale: string;
}

const testimonials = [
  {
    quote: "Goldie was extremely professional and found us a villa in Son Vida that wasn't listed anywhere. A perfect experience.",
    author: "Michael R.",
    location: "Germany"
  },
  {
    quote: "Discreet, honest and fast. Exactly what we needed.",
    author: "Laura T.",
    location: "UK"
  }
];

export default function TeamTestimonials({ locale }: TeamTestimonialsProps) {
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
            What Clients Say
          </h2>
        </div>

        {/* Testimonials Grid - 2 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <p className="text-gray-200 leading-relaxed text-lg mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
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







