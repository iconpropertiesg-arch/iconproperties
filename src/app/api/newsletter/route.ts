import { NextRequest, NextResponse } from 'next/server';

// Helper: get Resend API key (mirrors behaviour in portfolio-request route)
function getResendApiKey(): string {
  const raw =
    (process.env.RESEND_API_KEY || process.env.RESEND_API_KEY_TOKEN || '').trim().replace(/^["']|["']$/g, '');
  return raw;
}

async function sendAdminNewsletterEmail(subscriberEmail: string, locale?: string | null) {
  const RESEND_API_KEY = getResendApiKey();

  if (!RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY not set in environment variables (newsletter)');
    throw new Error(
      'Email service not configured: RESEND_API_KEY is missing. Add RESEND_API_KEY to .env.local and restart the dev server.'
    );
  }

  // Clean up EMAIL_FROM and ADMIN_EMAIL
  let EMAIL_FROM = (process.env.EMAIL_FROM || 'onboarding@resend.dev').trim().replace(/^["']|["']$/g, '');
  if (!EMAIL_FROM) {
    EMAIL_FROM = 'onboarding@resend.dev';
  }

  const adminEmail =
    (process.env.ADMIN_EMAIL || 'iconpropertiesg@gmail.com').trim().replace(/^["']|["']$/g, '');

  const subject = 'New newsletter subscriber from website footer';
  const timestamp = new Date().toISOString();
  const safeLocale = locale || 'en';

  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>New Newsletter Subscriber</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="margin-top: 0; color: #111;">New Newsletter Subscriber</h2>
        <p>You have a new email subscriber from the website footer form.</p>
        <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; border: 1px solid #e5e7eb; width: 100%; max-width: 100%;">
          <tr>
            <td style="border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Email</td>
            <td style="border: 1px solid #e5e7eb;">${subscriberEmail}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Locale</td>
            <td style="border: 1px solid #e5e7eb;">${safeLocale}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Time</td>
            <td style="border: 1px solid #e5e7eb;">${timestamp}</td>
          </tr>
        </table>
        <p style="font-size: 12px; color: #6b7280; margin-top: 24px;">
          This email was generated from the ICON Properties website newsletter footer form.
        </p>
      </body>
    </html>
  `;

  const payload = {
    from: EMAIL_FROM,
    to: adminEmail,
    subject,
    html,
  };

  console.log('📧 Sending newsletter subscription email to admin...');
  console.log('   To:', adminEmail);
  console.log('   From:', EMAIL_FROM);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  console.log('📥 Newsletter Resend status:', response.status);
  console.log('📥 Newsletter Resend body:', text.substring(0, 400));

  if (!response.ok) {
    let message = `Failed to send admin newsletter email: ${response.status} ${response.statusText}`;
    try {
      const data = JSON.parse(text);
      if (data?.message) message = data.message;
    } catch {
      // ignore parse error, keep default message
    }
    throw new Error(message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, locale } = body as { email?: string; locale?: string };

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    console.log('📬 Newsletter subscription request:', {
      email,
      locale,
      timestamp: new Date().toISOString(),
    });

    // Notify admin via email
    await sendAdminNewsletterEmail(email, locale || null);

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed. Admin has been notified.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
