import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * API Route to upload video to Vercel Blob
 * 
 * Usage:
 * POST /api/upload-video
 * 
 * This will upload public/videos/video_hero_banner.mp4 to Vercel Blob
 * and return the blob URL.
 */
export async function POST(request: NextRequest) {
  try {
    // Check if BLOB_READ_WRITE_TOKEN is set
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { 
          error: 'BLOB_READ_WRITE_TOKEN not set. Please create a blob store in Vercel dashboard and add the token to environment variables.' 
        },
        { status: 500 }
      );
    }

    const videoPath = join(process.cwd(), 'public', 'videos', 'video_hero_banner.mp4');
    
    // Read the video file
    const fileBuffer = await readFile(videoPath);
    const file = new File([fileBuffer], 'video_hero_banner.mp4', { type: 'video/mp4' });

    // Upload to Vercel Blob
    const blob = await put('videos/video_hero_banner.mp4', file, {
      access: 'public',
      addRandomSuffix: false,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      message: 'Video uploaded successfully to Vercel Blob',
    });

  } catch (error: any) {
    console.error('Video upload error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to upload video',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}


