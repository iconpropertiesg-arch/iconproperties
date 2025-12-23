import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// GET single property
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const allTranslations = searchParams.get('allTranslations') === 'true';

    const property = await prisma.property.findUnique({
      where: { id: params.id },
      include: {
        translations: allTranslations
          ? true
          : {
              where: { locale },
            },
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ property });
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
}

// PUT update property
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      purpose,
      year,
      price,
      bedrooms,
      bathrooms,
      area,
      location,
      coordinates,
      featured,
      images,
      translations,
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

    // Check if slug already exists (excluding current property)
    const existingProperty = await prisma.property.findUnique({
      where: { slug },
    });

    if (existingProperty && existingProperty.id !== params.id) {
      return NextResponse.json(
        { error: 'A property with this slug already exists. Please use a different slug.' },
        { status: 400 }
      );
    }

    // Update property
    const property = await prisma.property.update({
      where: { id: params.id },
      data: {
        slug,
        status,
        type,
        purpose: purpose || 'buy',
        year: year ? parseInt(year) : null,
        price: parseFloat(price),
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        area: area ? parseFloat(area) : null,
        location,
        coordinates,
        featured: featured || false,
        images: images || [],
      },
    });

    // Update translations
    if (translations) {
      await Promise.all(
        Object.entries(translations).map(async ([locale, translation]: [string, any]) => {
          await prisma.propertyTranslation.upsert({
            where: {
              propertyId_locale: {
                propertyId: params.id,
                locale,
              },
            },
            create: {
              propertyId: params.id,
              locale,
              title: translation.title,
              description: translation.description,
              subtitle: translation.subtitle || null,
              features: translation.features || [],
            },
            update: {
              title: translation.title,
              description: translation.description,
              subtitle: translation.subtitle || null,
              features: translation.features || [],
            },
          });
        })
      );
    }

    const updatedProperty = await prisma.property.findUnique({
      where: { id: params.id },
      include: {
        translations: true,
      },
    });

    return NextResponse.json({ property: updatedProperty });
  } catch (error: any) {
    console.error('Error updating property:', error);
    
    // Handle Prisma errors more gracefully
    let errorMessage = 'Failed to update property';
    
    if (error?.code === 'P2002') {
      errorMessage = 'A property with this slug already exists. Please use a different slug.';
    } else if (error?.code === 'P2003') {
      errorMessage = 'Invalid reference. Please check your data.';
    } else if (error?.message) {
      // Extract meaningful error message
      if (error.message.includes('Unknown argument')) {
        errorMessage = `Database schema mismatch: ${error.message}. Please regenerate Prisma client with 'npx prisma generate'`;
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE property
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    await prisma.property.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { error: 'Failed to delete property' },
      { status: 500 }
    );
  }
}

