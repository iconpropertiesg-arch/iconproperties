import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
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

    const body = await request.json();
    const { filename, contentType } = body;

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: 'Filename and content type are required' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = filename.split('.').pop();
    const uniqueFilename = `property-${timestamp}-${randomString}.${extension}`;
    const uploadPath = `properties/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      path: uploadPath,
      filename: uniqueFilename,
    });
  } catch (error: any) {
    console.error('Upload init error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize upload' },
      { status: 500 }
    );
  }
}

