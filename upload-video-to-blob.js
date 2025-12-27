/**
 * Script to upload video to Vercel Blob Storage
 * 
 * Prerequisites:
 * 1. Create a Vercel Blob store in your Vercel dashboard
 * 2. Get your BLOB_READ_WRITE_TOKEN from the dashboard
 * 3. Set it as an environment variable: BLOB_READ_WRITE_TOKEN=your_token_here
 * 
 * Run: node upload-video-to-blob.js
 */

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadVideo() {
  try {
    // Check if token is set
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('❌ Error: BLOB_READ_WRITE_TOKEN environment variable is not set.');
      console.log('\n📝 To get your token:');
      console.log('1. Go to https://vercel.com/dashboard');
      console.log('2. Navigate to Storage → Blob');
      console.log('3. Create a new blob store (or select existing one)');
      console.log('4. Copy the BLOB_READ_WRITE_TOKEN');
      console.log('5. Set it: $env:BLOB_READ_WRITE_TOKEN="your_token_here" (PowerShell)');
      console.log('   Or: export BLOB_READ_WRITE_TOKEN="your_token_here" (Bash)');
      process.exit(1);
    }

    const videoPath = path.join(__dirname, 'public', 'videos', 'video_hero_banner.mp4');
    
    // Check if file exists
    if (!fs.existsSync(videoPath)) {
      console.error(`❌ Error: Video file not found at ${videoPath}`);
      process.exit(1);
    }

    console.log('📤 Uploading video to Vercel Blob...');
    console.log(`📁 File: ${videoPath}`);
    
    // Read the file
    const fileBuffer = fs.readFileSync(videoPath);
    const file = new File([fileBuffer], 'video_hero_banner.mp4', { type: 'video/mp4' });

    // Upload to Vercel Blob
    const blob = await put('videos/video_hero_banner.mp4', file, {
      access: 'public',
      addRandomSuffix: false, // Keep the same name
    });

    console.log('\n✅ Upload successful!');
    console.log(`🔗 Blob URL: ${blob.url}`);
    console.log(`\n📝 Update your HeroSection.tsx with this URL:`);
    console.log(`   src="${blob.url}"`);
    console.log(`\n💾 Save this URL for future reference: ${blob.url}`);

    // Save URL to a file for easy reference
    fs.writeFileSync(
      path.join(__dirname, 'vercel-blob-video-url.txt'),
      blob.url
    );
    console.log('\n✅ URL saved to vercel-blob-video-url.txt');

  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    if (error.message.includes('token')) {
      console.log('\n💡 Make sure your BLOB_READ_WRITE_TOKEN is correct.');
    }
    process.exit(1);
  }
}

uploadVideo();


