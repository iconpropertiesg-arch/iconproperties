import { NextRequest, NextResponse } from 'next/server';

function getResendApiKey(): string {
  const raw =
    (process.env.RESEND_API_KEY || process.env.RESEND_API_KEY_TOKEN || '').trim().replace(/^["']|["']$/g, '');
  return raw;
}

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendContactFormToAdmin(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyId?: string;
  locale?: string;
  reason?: string;
  source?: string;
  consent?: boolean;
}) {
  const RESEND_API_KEY = getResendApiKey();

  if (!RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY not set (contact form)');
    throw new Error(
      'Email service not configured: RESEND_API_KEY is missing. Add RESEND_API_KEY to .env.local and restart the dev server.'
    );
  }

  let EMAIL_FROM = (process.env.EMAIL_FROM || 'onboarding@resend.dev').trim().replace(/^["']|["']$/g, '');
  if (!EMAIL_FROM) EMAIL_FROM = 'onboarding@resend.dev';

  const adminEmail = (process.env.ADMIN_EMAIL || 'iconpropertiesg@gmail.com').trim().replace(/^["']|["']$/g, '');

  const subject = 'New Contact Agent inquiry from website';
  const timestamp = new Date().toISOString();

  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Contact Agent Inquiry</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="margin-top: 0; color: #111;">Contact Agent / Property Inquiry</h2>
        <p>You have received a new inquiry from the website (Contact Agent form).</p>
        <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; border: 1px solid #e5e7eb; width: 100%; max-width: 100%;">
          <tr>
            <td style="border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Name</td>
            <td style="border: 1px solid #e5e7eb;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Email</td>
            <td style="border: 1px solid #e5e7eb;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
          </tr>
          ${data.phone ? `
          <tr>
            <td style="border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Phone</td>
            <td style="border: 1px solid #e5e7eb;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td>
          </tr>
          ` : ''}
          <tr>
            <td style="border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Message</td>
            <td style="border: 1px solid #e5e7eb;">${escapeHtml(data.message).replace(/\n/g, '<br>')}</td>
          </tr>
          ${data.propertyId ? `
          <tr>
            <td style="border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Property ID</td>
            <td style="border: 1px solid #e5e7eb;">${escapeHtml(data.propertyId)}</td>
          </tr>
          ` : ''}
          ${data.locale ? `
          <tr>
            <td style="border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Locale</td>
            <td style="border: 1px solid #e5e7eb;">${escapeHtml(data.locale)}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Time</td>
            <td style="border: 1px solid #e5e7eb;">${timestamp}</td>
          </tr>
          ${data.consent != null ? `
          <tr>
            <td style="border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">Consent to contact</td>
            <td style="border: 1px solid #e5e7eb;">${data.consent ? 'Yes' : 'No'}</td>
          </tr>
          ` : ''}
        </table>
        <p style="font-size: 12px; color: #6b7280; margin-top: 24px;">
          This email was sent from the ICON Properties website Contact Agent form (property page).
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

  console.log('📧 Sending contact form email to admin...');
  console.log('   To:', adminEmail);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  console.log('📥 Contact form Resend status:', response.status);

  if (!response.ok) {
    let message = `Failed to send contact email: ${response.status} ${response.statusText}`;
    try {
      const parsed = JSON.parse(text);
      if (parsed?.message) message = parsed.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, reason, propertyId, locale, source, consent } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email and message are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    console.log('Contact Form Submission:', {
      name,
      email,
      phone,
      message,
      reason,
      propertyId,
      locale,
      source,
      timestamp: new Date().toISOString(),
    });

    await sendContactFormToAdmin({
      name,
      email,
      phone: phone || undefined,
      message,
      propertyId: propertyId || undefined,
      locale: locale || undefined,
      reason: reason || undefined,
      source: source || undefined,
      consent: consent,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
