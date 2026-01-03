import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Award, Building2 } from 'lucide-react';
import { prisma } from '@/lib/db';
import PropertiesFilterBar from '@/components/properties/PropertiesFilterBar';

interface PropertiesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: PropertiesPageProps): Promise<Metadata> {
  const { locale } = await params;
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

export default async function PropertiesPage({ 
  params,
  searchParams 
}: PropertiesPageProps) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  
  // Get translations
  const t = await getTranslations('portfolio');
  const tCommon = await getTranslations('common');
  const tProperties = await getTranslations('properties');

  // Extract search filters from query parameters
  const purposeParam = searchParams.purpose;
  const purpose = typeof purposeParam === 'string' ? (purposeParam as 'buy' | 'rent') : undefined;
  
  const typeParam = searchParams.type;
  const propertyTypes = typeof typeParam === 'string' ? typeParam.split(',') : [];
  
  const locationParam = searchParams.location;
  const location = typeof locationParam === 'string' ? locationParam : undefined;
  
  const minPriceParam = searchParams.minPrice;
  const minPrice = typeof minPriceParam === 'string' ? parseInt(minPriceParam) : undefined;
  
  const maxPriceParam = searchParams.maxPrice;
  const maxPrice = typeof maxPriceParam === 'string' ? parseInt(maxPriceParam) : undefined;

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
    purpose: string;
  }> = [];
  let totalValue = 0;

  try {
    // Build where clause for filtering
    const where: any = {};
    
    if (purpose) {
      where.purpose = purpose;
    }
    
    if (propertyTypes.length > 0) {
      where.type = { in: propertyTypes };
    }
    
    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }
    
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) {
        where.price.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        where.price.lte = maxPrice;
      }
    }

    const properties = await prisma.property.findMany({
      where,
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
        purpose: property.purpose || 'buy',
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
      label: tProperties('stats.totalValue')
    },
    { 
      icon: Building2, 
      value: `${portfolioItems.length}+`, 
      label: tProperties('stats.propertiesManaged')
    },
    { 
      icon: Award, 
      value: '98%', 
      label: tProperties('stats.clientSatisfaction')
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar Section */}
      <section className="relative bg-black py-8">
        <div className="container mx-auto px-4">
          <PropertiesFilterBar locale={locale} searchParams={searchParams} />
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
                  <div className="w-16 h-16 bg-gray-700/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-gray-400" />
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
              <p className="text-xl text-gray-400">{tProperties('noProperties')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item) => {
                // Sanitize slug to ensure it's valid
                let cleanSlug = item.slug || '';
                
                // Remove any URLs or full paths
                if (cleanSlug.includes('://') || cleanSlug.includes('localhost') || cleanSlug.startsWith('http')) {
                  const parts = cleanSlug.split('/').filter((p: string) => p);
                  cleanSlug = parts[parts.length - 1] || '';
                }
                
                // Remove any remaining URL-like patterns
                cleanSlug = cleanSlug.replace(/^https?:\/\//, '').replace(/^www\./, '');
                
                // Generate a clean slug
                cleanSlug = cleanSlug
                  .toLowerCase()
                  .trim()
                  .replace(/[^\w\s-]/g, '')
                  .replace(/[\s_-]+/g, '-')
                  .replace(/^-+|-+$/g, '');

                // Skip if slug is invalid
                if (!cleanSlug || !/^[a-z0-9-]+$/.test(cleanSlug)) {
                  console.warn(`Invalid slug for property ${item.id}: ${item.slug}`);
                  return null;
                }

                return (
              <Link
                key={item.id}
                href={`/${locale}/properties/${cleanSlug}`}
                className="group relative h-[420px] rounded-2xl overflow-hidden border border-white/10 hover:border-gray-500 transition-all duration-300 cursor-pointer block hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Full-cover background image */}
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

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/85 group-hover:via-black/50 transition-all duration-300" />

                {/* Content overlay - all on top of image */}
                <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
                  {/* Top badges */}
                  <div className="flex items-start justify-between">
                    <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      {item.category}
                    </span>
                    <span className={`${item.status.toLowerCase() === 'sold' ? 'bg-red-500' : 'bg-emerald-500'} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Spacer for middle area */}
                  <div className="flex-1" />

                  {/* Bottom info */}
                  <div className="space-y-3">
                    {/* Title and location */}
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold mb-1 group-hover:text-gray-300 transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-300 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold border border-white/20 shrink-0">
                        {item.year}
                      </span>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/20">
                      <div className="text-2xl font-bold">{item.value}</div>
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center text-gray-400 group-hover:text-gray-300 transition-colors font-medium">
                          {tCommon('viewDetails')}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-white text-gray-900 font-semibold shadow-lg transition-transform duration-300 group-hover:scale-105 text-sm">
                          {tProperties('viewNow')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {tProperties('cta.title')}
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              {tProperties('cta.description')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center bg-gray-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-600 transition-colors shadow-lg"
            >
              {tProperties('cta.button')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
