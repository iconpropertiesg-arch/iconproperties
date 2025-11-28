import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Award, Building2 } from 'lucide-react';
import { prisma } from '@/lib/db';

interface PropertiesPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PropertiesPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'portfolio' });

  return {
    title: 'Properties - Property Icon',
    description: 'View our properties of successful real estate transactions and investments.',
    alternates: {
      canonical: `/${locale}/properties`,
    },
    openGraph: {
      title: 'Properties - Property Icon',
      description: 'View our properties of successful real estate transactions and investments.',
      images: ['/og-portfolio.jpg'],
    },
  };
}

// Helper function to format price
function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `€${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `€${(price / 1000).toFixed(0)}K`;
  }
  return `€${price.toLocaleString()}`;
}

// Helper function to capitalize first letter
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function PropertiesPage({ params: { locale } }: PropertiesPageProps) {
  // Enable static rendering
  setRequestLocale(locale);

  // Fetch properties from database
  let portfolioItems: Array<{
    id: string;
    title: string;
    category: string;
    value: string;
    image: string;
    description: string;
    year: string;
    status: string;
    slug: string;
  }> = [];
  let totalValue = 0;

  try {
    const properties = await prisma.property.findMany({
      include: {
        translations: {
          where: { locale },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate total value from raw prices
    totalValue = properties.reduce((sum, property) => sum + property.price, 0);

    portfolioItems = properties.map((property) => {
      const translation = property.translations[0];
      const firstImage = property.images && property.images.length > 0 
        ? property.images[0] 
        : '/portfolio/villa-son-vida.jpg'; // Fallback image

      return {
        id: property.id,
        title: translation?.title || 'Property',
        category: capitalize(property.type || 'Residential'),
        value: formatPrice(property.price),
        image: firstImage,
        description: translation?.subtitle || translation?.description || 'Property description',
        year: property.year ? property.year.toString() : new Date(property.createdAt).getFullYear().toString(),
        status: capitalize(property.status || 'Available'),
        slug: property.slug,
      };
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    // If there's an error, portfolioItems will remain empty
  }

  const stats = [
    { 
      icon: TrendingUp, 
      value: totalValue >= 1000000 
        ? `€${(totalValue / 1000000).toFixed(0)}M+` 
        : `€${(totalValue / 1000).toFixed(0)}K+`, 
      label: 'Total Properties Value' 
    },
    { 
      icon: Building2, 
      value: `${portfolioItems.length}+`, 
      label: 'Properties Managed' 
    },
    { 
      icon: Award, 
      value: '98%', 
      label: 'Client Satisfaction' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explore Properties in Mallorca
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover hand-selected villas, penthouses and fincas across Mallorca's most desirable locations including private and off-market homes.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {portfolioItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">No properties available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item) => (
              <div 
                key={item.id} 
                className="group bg-gradient-to-br from-gray-800/50 to-blue-900/30 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  {item.image.startsWith('http://') || item.image.startsWith('https://') ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white">
                      <p className="text-sm opacity-90">{item.year}</p>
                      <p className="text-2xl font-bold">{item.value}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {item.description}
                  </p>
                  <Link
                    href={`/${locale}/properties/${item.slug}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Invest?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join our exclusive collection of premium real estate investments. Contact our team to explore current opportunities.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-600/50"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
