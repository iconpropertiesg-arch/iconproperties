import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { createServerClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

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

    const contentType = request.headers.get('content-type') || '';

    // Check if request is JSON (for direct upload path generation) or FormData (for server upload)
    if (contentType.includes('application/json')) {
      // Handle JSON request - generate upload path for direct client-side upload
      const body = await request.json();
      const { filename, contentType: fileContentType } = body;

      if (!filename || !fileContentType) {
        return NextResponse.json(
          { error: 'Filename and content type are required' },
          { status: 400 }
        );
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(fileContentType)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only images are allowed.' },
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
    } else {
      // Handle FormData request - server-side upload for small files
      let formData: FormData;
      try {
        formData = await request.formData();
      } catch (error: any) {
        console.error('FormData parsing error:', error);
        return NextResponse.json(
          { error: 'Failed to parse form data. File may be too large (max 4.5MB for server upload).' },
          { status: 413 }
        );
      }

      const file = formData.get('file') as File;
      if (!file) {
        return NextResponse.json(
          { error: 'No file provided' },
          { status: 400 }
        );
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only images are allowed.' },
          { status: 400 }
        );
      }

      // Validate file size (max 50MB)
      const maxSize = 50 * 1024 * 1024; // 50MB
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: 'File size too large. Maximum size is 50MB.' },
          { status: 400 }
        );
      }

      // Check if file is too large for server-side upload (Vercel 4.5MB limit)
      const vercelLimit = 4.5 * 1024 * 1024; // 4.5MB
      if (file.size > vercelLimit) {
        return NextResponse.json(
          { 
            error: 'File too large for server upload. Please configure Supabase Storage RLS policies to allow direct client uploads, or use files under 4.5MB.',
            requiresDirectUpload: true,
            maxServerUploadSize: vercelLimit
          },
          { status: 413 }
        );
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const extension = file.name.split('.').pop();
      const uniqueFilename = `property-${timestamp}-${randomString}.${extension}`;
      const uploadPath = `properties/${uniqueFilename}`;

      // Convert file to buffer and upload using service role key (bypasses RLS)
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Check if Supabase env vars are set
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return NextResponse.json(
          { error: 'Supabase configuration is missing. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in environment variables.' },
          { status: 500 }
        );
      }

      const supabase = createServerClient();
      const { data, error } = await supabase.storage
        .from('property_images')
        .upload(uploadPath, buffer, {
          contentType: file.type,
          upsert: false
        });

      if (error) {
        console.error('Supabase upload error:', error);
        return NextResponse.json(
          { error: error.message || 'Failed to upload image to storage' },
          { status: 500 }
        );
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('property_images')
        .getPublicUrl(uploadPath);

      return NextResponse.json({
        success: true,
        url: urlData.publicUrl,
        path: uploadPath,
        filename: uniqueFilename,
      });
    }
  } catch (error: any) {
    console.error('Upload init error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}

