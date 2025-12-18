'use client';

interface IntroductionProps {
  locale: string;
}

export default function Introduction({ locale }: IntroductionProps) {
  return (
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            A Boutique Team With a Personal Approach
          </h2>
        </div>

        <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
          <p>
            At ICON PROPERTIES, we believe luxury real estate requires more than listings and online portal, it requires genuine relationships, trusted advisory and a guided experience from start to finish.
          </p>
          <p>
            Our team works closely with international buyers and property owners, ensuring every client receives tailored support, expert knowledge and complete discretion throughout the entire journey.
          </p>
        </div>
      </div>
    </section>
  );
}





