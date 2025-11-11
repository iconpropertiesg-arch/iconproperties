import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import OfficeLocation from '@/components/contact/OfficeLocation';

interface ContactPageProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params: { locale } }: ContactPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('title'),
    description: 'Contact Lion Capital Real Estate for luxury properties in Mallorca. Expert consultation and personalized service.',
    alternates: {
      canonical: `/${locale}/contact`,
    },
    openGraph: {
      title: t('title'),
      description: 'Contact Lion Capital Real Estate for luxury properties in Mallorca. Expert consultation and personalized service.',
      images: ['/og-contact.jpg'],
    },
  };
}

export default async function ContactPage({ params: { locale }, searchParams }: ContactPageProps) {
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-blue-900">
      {/* Hero Section with animated gradient */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated blob shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 animate-fade-in-up">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up animation-delay-200">
              Let's Find Your Dream Property
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed animate-fade-in-up animation-delay-400">
              Ready to find your dream property in Mallorca? Our expert team is here to help you 
              every step of the way. Get in touch today for personalized service and exclusive access 
              to the finest properties on the island.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-800/50 to-blue-900/30 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm">
                <ContactForm locale={locale} searchParams={searchParams} />
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-800/50 to-blue-900/30 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm">
                <ContactInfo locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="py-20 border-t border-gray-800">
        <OfficeLocation locale={locale} />
      </section>
    </div>
  );
}
