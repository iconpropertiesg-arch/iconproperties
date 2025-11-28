import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// GET all properties
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const includeTranslations = searchParams.get('includeTranslations') !== 'false';

    const properties = await prisma.property.findMany({
      include: {
        translations: includeTranslations ? {
          where: { locale },
        } : false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

// POST create new property
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const admin = verifyToken(token);
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const {
      slug: rawSlug,
      status,
      type,
      year,
      price,
      bedrooms,
      bathrooms,
      area,
      location,
      coordinates,
      featured,
      images,
      translations, // { en: {...}, de: {...}, es: {...} }
    } = data;

    // Sanitize and validate slug
    let slug = rawSlug?.trim() || '';
    
    // Remove any URLs or full paths
    if (slug.includes('://') || slug.includes('localhost') || slug.startsWith('http')) {
      // Extract the last segment after the last slash
      const parts = slug.split('/').filter((p: string) => p);
      slug = parts[parts.length - 1] || '';
    }
    
    // Remove any remaining URL-like patterns
    slug = slug.replace(/^https?:\/\//, '').replace(/^www\./, '');
    
    // Generate a clean slug: lowercase, replace spaces/special chars with hyphens
    slug = slug
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

    // If slug is still empty, generate from English title
    if (!slug && translations?.en?.title) {
      slug = translations.en.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Final validation
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: 'Invalid slug. Slug must contain only lowercase letters, numbers, and hyphens.' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingProperty = await prisma.property.findUnique({
      where: { slug },
    });

    if (existingProperty) {
      return NextResponse.json(
        { error: 'A property with this slug already exists. Please use a different slug.' },
        { status: 400 }
      );
    }

    // Create property with translations
    const property = await prisma.property.create({
      data: {
        slug,
        status,
        type,
        year: year ? parseInt(year) : null,
        price: parseFloat(price),
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        area: area ? parseFloat(area) : null,
        location,
        coordinates,
        featured: featured || false,
        images: images || [],
        translations: {
          create: Object.entries(translations || {}).map(([locale, translation]: [string, any]) => ({
            locale,
            title: translation.title,
            description: translation.description,
            subtitle: translation.subtitle || null,
            features: translation.features || [],
          })),
        },
      },
      include: {
        translations: true,
      },
    });

    return NextResponse.json({ property }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create property' },
      { status: 500 }
    );
  }
}

