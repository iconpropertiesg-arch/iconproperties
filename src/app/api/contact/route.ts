import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, reason, propertyId, locale, source } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // TODO: Integrate with your email service (Resend, SendGrid, etc.)
    // Example with console logging for development
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

    // TODO: Send email notification to your team
    // await sendEmailNotification({
    //   to: 'info@lioncapitala.com',
    //   subject: `New Contact Form Submission - ${reason}`,
    //   template: 'contact-form',
    //   data: { name, email, phone, message, reason, propertyId }
    // });

    // TODO: Send confirmation email to user
    // await sendConfirmationEmail({
    //   to: email,
    //   name,
    //   locale,
    //   template: 'contact-confirmation'
    // });

    // TODO: Add to CRM (HubSpot, Pipedrive, etc.)
    // await addToCRM({
    //   name,
    //   email,
    //   phone,
    //   source: `Website - ${source}`,
    //   notes: message,
    //   property_interest: propertyId
    // });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
