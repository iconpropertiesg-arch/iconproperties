import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyDetails from '@/components/property/PropertyDetails';
import PropertyFeatures from '@/components/property/PropertyFeatures';
import PropertyLocation from '@/components/property/PropertyLocation';
import PropertyAgent from '@/components/property/PropertyAgent';
import RelatedProperties from '@/components/property/RelatedProperties';
import { generateSEOTitle, generateSEODescription } from '@/lib/utils';
import { Property, PropertyImage } from '@/types';
import { prisma } from '@/lib/db';

interface PropertyPageProps {
  params: { locale: string; slug: string };
}

// Helper function to map database type to Property type
function mapType(dbType: string): 'apartment' | 'house' | 'commercial' | 'villa' {
  const typeMap: Record<string, 'apartment' | 'house' | 'commercial' | 'villa'> = {
    'residential': 'house',
    'commercial': 'commercial',
    'apartment': 'apartment',
    'villa': 'villa',
    'house': 'house',
  };
  return typeMap[dbType.toLowerCase()] || 'house';
}

// Helper function to map database status to Property status
function mapStatus(dbStatus: string): 'buy' | 'rent' {
  const rentStatuses = ['rent', 'rented', 'lease', 'leased'];
  return rentStatuses.includes(dbStatus.toLowerCase()) ? 'rent' : 'buy';
}

// Helper function to map database status to availability
function mapAvailability(dbStatus: string): 'available' | 'sold' | 'rented' | 'pending' {
  const status = dbStatus.toLowerCase();
  if (status === 'sold') return 'sold';
  if (status === 'rented' || status === 'leased') return 'rented';
  if (status === 'pending') return 'pending';
  return 'available';
}

// Fetch property from database by slug
async function getPropertyBySlug(slug: string, locale: string): Promise<Property | null> {
  try {
    const property = await prisma.property.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { locale },
        },
      },
    });

    if (!property) {
      return null;
    }

    const translation = property.translations[0];
    if (!translation) {
      return null;
    }

    // Parse coordinates if they exist
    let location = {
      lat: 39.5696, // Default to Palma de Mallorca
      lng: 2.6502,
      address: property.location || 'Mallorca, Spain',
    };

    if (property.coordinates) {
      try {
        const coords = JSON.parse(property.coordinates);
        if (coords.lat && coords.lng) {
          location.lat = coords.lat;
          location.lng = coords.lng;
        }
      } catch (e) {
        // If parsing fails, use default coordinates
      }
    }

    // Map images
    const images: PropertyImage[] = property.images.map((url, index) => ({
      id: `${property.id}-${index}`,
      url: url,
      alt: translation.title || 'Property image',
      caption: translation.subtitle || undefined,
      order: index + 1,
    }));

    // Default agent (you can customize this or fetch from database)
    const agent = {
      id: 'default',
      name: 'Property Icon Team',
      email: 'info@propertyicon.com',
      phone: '+34 971 123 456',
      whatsapp: '+34 971 123 456',
      avatar: '/agents/default.jpg',
      languages: ['en', 'es', 'de'],
    };

    // Map database property to Property interface
    const mappedProperty: Property = {
      id: property.id,
      title: translation.title,
      slug: property.slug,
      status: mapStatus(property.status),
      type: mapType(property.type),
      area: property.location || 'Mallorca',
      price: property.price,
      beds: property.bedrooms || undefined,
      baths: property.bathrooms || undefined,
      interiorSize: property.area || undefined,
      plotSize: undefined, // Not in database schema
      yearBuilt: property.year || undefined,
      description: translation.description,
      features: translation.features || [],
      images: images.length > 0 ? images : [
        {
          id: 'default',
          url: '/portfolio/villa-son-vida.jpg',
          alt: translation.title,
          order: 1,
        },
      ],
      videoUrl: undefined,
      matterportUrl: undefined,
      location,
      agent,
      referenceId: property.id.substring(0, 8).toUpperCase(),
      availability: mapAvailability(property.status),
      seo: {
        title: `${translation.title} - €${property.price.toLocaleString()}`,
        description: translation.subtitle || translation.description.substring(0, 160),
      },
    };

    return mappedProperty;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

export async function generateMetadata({ params: { locale, slug } }: PropertyPageProps): Promise<Metadata> {
  const property = await getPropertyBySlug(slug, locale);
  
  if (!property) {
    return {
      title: 'Property Not Found',
    };
  }

  const seoTitle = generateSEOTitle(property.title, property.area, property.price, locale);
  const seoDescription = generateSEODescription(
    property.type, 
    property.area, 
    property.beds,
    property.baths,
    property.interiorSize
  );

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: `/${locale}/properties/${slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: property.images.map(img => ({
        url: img.url,
        alt: img.alt,
      })),
      type: 'article',
    },
    other: {
      'property:type': property.type,
      'property:price': property.price.toString(),
      'property:bedrooms': property.beds?.toString() || '',
      'property:bathrooms': property.baths?.toString() || '',
      'property:area': property.area,
    },
  };
}

export default async function PropertyPage({ params: { locale, slug } }: PropertyPageProps) {
  // Enable static rendering
  setRequestLocale(locale);
  
  const property = await getPropertyBySlug(slug, locale);
  
  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black">
      {/* Property Details - Show First */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <PropertyDetails property={property} locale={locale} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <PropertyAgent property={property} locale={locale} />
            </div>
          </div>
        </div>
      </div>

      {/* Gallery - Show Second, Moved Lower */}
      <div className="pt-8 pb-8 px-4 md:px-8 lg:px-12 xl:px-16">
        <PropertyGallery property={property} locale={locale} />
      </div>

      {/* Additional Property Details */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <PropertyFeatures property={property} locale={locale} />
            <PropertyLocation property={property} locale={locale} />
          </div>
        </div>
      </div>

      {/* Related Properties */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 pb-12">
        <RelatedProperties property={property} locale={locale} />
      </div>
    </div>
  );
}
