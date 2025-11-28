import { NextRequest, NextResponse } from 'next/server';

// Test endpoint to verify email configuration
export async function GET(request: NextRequest) {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const EMAIL_FROM = process.env.EMAIL_FROM;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    // Check configuration
    const config = {
      hasResendKey: !!RESEND_API_KEY,
      resendKeyPrefix: RESEND_API_KEY?.substring(0, 10) || 'NOT SET',
      emailFrom: EMAIL_FROM || 'NOT SET',
      adminEmail: ADMIN_EMAIL || 'NOT SET',
    };

    // Try to send a test email
    if (!RESEND_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'RESEND_API_KEY is not set',
        config,
      }, { status: 500 });
    }

    const testEmail = ADMIN_EMAIL || 'test@example.com';
    
    console.log('🧪 Testing email service...');
    console.log('   API Key:', RESEND_API_KEY.substring(0, 10) + '...');
    console.log('   From:', EMAIL_FROM);
    console.log('   To:', testEmail);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: EMAIL_FROM || 'onboarding@resend.dev',
        to: testEmail,
        subject: 'Test Email from Portfolio Request API',
        html: '<h1>Test Email</h1><p>This is a test email to verify the email service is working.</p>',
      }),
    });

    const responseText = await response.text();
    console.log('📥 Resend API response status:', response.status);
    console.log('📥 Resend API response:', responseText);

    if (!response.ok) {
      let errorDetails;
      try {
        errorDetails = JSON.parse(responseText);
      } catch {
        errorDetails = responseText;
      }

      return NextResponse.json({
        success: false,
        error: `Email send failed: ${response.status} ${response.statusText}`,
        details: errorDetails,
        config,
      }, { status: response.status });
    }

    const result = JSON.parse(responseText);
    
    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      emailId: result.id,
      config,
    }, { status: 200 });

  } catch (error: any) {
    console.error('❌ Test email error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error',
      stack: error.stack,
    }, { status: 500 });
  }
}

