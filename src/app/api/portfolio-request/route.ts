import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Email service - using Resend (you can replace with SendGrid, Mailgun, etc.)
async function sendEmail(to: string, subject: string, html: string) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY not set in environment variables');
    throw new Error('Email service not configured: RESEND_API_KEY is missing');
  }

  // Clean up EMAIL_FROM - remove quotes if present
  let EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  EMAIL_FROM = EMAIL_FROM.replace(/^["']|["']$/g, ''); // Remove surrounding quotes
  
  if (!EMAIL_FROM) {
    console.warn('⚠️ EMAIL_FROM not set, using default');
    EMAIL_FROM = 'onboarding@resend.dev';
  }

  // Resend test domain has restrictions - try to use a verified email if available
  // If using onboarding@resend.dev, it may only work for certain recipients
  // For production, you should verify your domain in Resend dashboard

  console.log('📧 Attempting to send email...');
  console.log('   From:', EMAIL_FROM);
  console.log('   To:', to);
  console.log('   Subject:', subject);

  try {
    const emailPayload = {
      from: EMAIL_FROM,
      to,
      subject,
      html,
    };

    console.log('📤 Sending email via Resend API...');
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    });

    const responseText = await response.text();
    console.log('📥 Resend API response status:', response.status);
    console.log('📥 Resend API response text:', responseText.substring(0, 500)); // Log first 500 chars

    if (!response.ok) {
      let errorMessage = `Failed to send email: ${response.status} ${response.statusText}`;
      let errorDetails: any = null;
      
      try {
        errorDetails = JSON.parse(responseText);
        errorMessage = errorDetails.message || errorDetails.error || errorMessage;
        console.error('❌ Resend API error details:', JSON.stringify(errorDetails, null, 2));
      } catch {
        console.error('❌ Resend API error response (raw):', responseText);
        errorMessage = responseText || errorMessage;
      }
      
      // Check for specific error types
      if (response.status === 422) {
        errorMessage = `Invalid email data: ${errorDetails?.message || errorMessage}`;
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again later.';
      } else if (response.status === 403) {
        // 403 Forbidden usually means:
        // 1. Domain not verified in Resend
        // 2. Using onboarding@resend.dev which has restrictions
        // 3. API key doesn't have permission
        const detailedError = errorDetails?.message || errorMessage;
        errorMessage = `Email sending forbidden (403). This usually means:
- The "from" domain (${EMAIL_FROM}) is not verified in Resend
- Using onboarding@resend.dev has restrictions on recipient addresses
- Your API key may need domain verification

Solution: Verify your domain in Resend dashboard or use a verified email address.
Error details: ${detailedError}`;
      }
      
      console.error('❌ Email send failed:', errorMessage);
      throw new Error(errorMessage);
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ Failed to parse response:', responseText);
      throw new Error('Invalid response from email service');
    }
    
    console.log('✅ Email sent successfully!');
    console.log('   Email ID:', result.id);
    console.log('   Full response:', JSON.stringify(result, null, 2));
    return result;
  } catch (error: any) {
    console.error('❌ Email service error:', error);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);
    throw error;
  }
}

function generateThankYouEmail(name: string) {
  // Escape HTML special characters in name to prevent XSS and HTML breaking
  const escapedName = name
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - Icon Properties</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">Thank You, ${escapedName}!</h1>
      </div>
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; margin-bottom: 20px;">
          We've received your request for a private portfolio and are excited to help you find your ideal property in Mallorca.
        </p>
        <p style="font-size: 16px; margin-bottom: 20px;">
          Our team will review your requirements and get back to you within 24 hours with exclusive listings that match your criteria.
        </p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
          <p style="margin: 0; font-size: 14px; color: #666;">
            <strong>What happens next?</strong><br>
            • We'll curate a personalized portfolio of off-market properties<br>
            • You'll receive access to exclusive listings via WhatsApp<br>
            • Our team will schedule private viewings at your convenience
          </p>
        </div>
        <p style="font-size: 14px; color: #666; margin-top: 30px;">
          If you have any questions, feel free to reach out to us at <a href="mailto:info@iconproperties.es" style="color: #2563eb;">info@iconproperties.es</a>
        </p>
        <p style="font-size: 14px; color: #666; margin-top: 20px;">
          Best regards,<br>
          <strong>The Icon Properties Team</strong>
        </p>
      </div>
    </body>
    </html>
  `;
}

function generateAdminNotificationEmail(formData: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Portfolio Request - Icon Properties</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">New Portfolio Request</h1>
      </div>
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #1e40af; margin-top: 0;">Contact Information</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;"><strong>Name:</strong></td>
            <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;">${formData.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb;"><strong>Email:</strong></td>
            <td style="padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb;"><a href="mailto:${formData.email}">${formData.email}</a></td>
          </tr>
          ${formData.phone ? `
          <tr>
            <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
            <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;"><a href="tel:${formData.phone}">${formData.phone}</a></td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 10px; background: ${formData.phone ? '#f9fafb' : 'white'}; border: 1px solid #e5e7eb;"><strong>Buyer/Seller:</strong></td>
            <td style="padding: 10px; background: ${formData.phone ? '#f9fafb' : 'white'}; border: 1px solid #e5e7eb;">${formData.buyerOrSeller || 'Not specified'}</td>
          </tr>
        </table>
        
        ${formData.budget ? `
        <h2 style="color: #1e40af; margin-top: 30px;">Requirements</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;"><strong>Budget:</strong></td>
            <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;">${formData.budget}</td>
          </tr>
          ${formData.preferredAreas ? `
          <tr>
            <td style="padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb;"><strong>Preferred Areas:</strong></td>
            <td style="padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb;">${formData.preferredAreas}</td>
          </tr>
          ` : ''}
          ${formData.typeOfHome ? `
          <tr>
            <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;"><strong>Type of Home:</strong></td>
            <td style="padding: 10px; background: white; border: 1px solid #e5e7eb;">${formData.typeOfHome}</td>
          </tr>
          ` : ''}
          ${formData.timeline ? `
          <tr>
            <td style="padding: 10px; background: ${formData.typeOfHome ? '#f9fafb' : 'white'}; border: 1px solid #e5e7eb;"><strong>Timeline:</strong></td>
            <td style="padding: 10px; background: ${formData.typeOfHome ? '#f9fafb' : 'white'}; border: 1px solid #e5e7eb;">${formData.timeline}</td>
          </tr>
          ` : ''}
        </table>
        ` : ''}
        
        <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #2563eb;">
          <p style="margin: 0; font-size: 14px; color: #1e40af;">
            <strong>Action Required:</strong> Please review this request and contact the client within 24 hours.
          </p>
        </div>
        
        <p style="font-size: 12px; color: #666; margin-top: 30px;">
          This email was automatically generated from the Icon Properties website contact form.
        </p>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  console.log('📥 Received portfolio request submission');
  
  try {
    const body = await request.json();
    console.log('📋 Request body:', JSON.stringify(body, null, 2));
    
    const { 
      name, 
      email, 
      phone, 
      buyerOrSeller, 
      budget, 
      preferredAreas, 
      typeOfHome, 
      timeline,
      locale 
    } = body;

    // Validate required fields
    if (!name || !email || !buyerOrSeller) {
      console.error('❌ Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and buyerOrSeller are required' },
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

    // Store in database using Prisma (same approach as properties)
    let portfolioRequestId = null;
    let dbError = null;
    try {
      console.log('💾 Saving portfolio request to database...');
      
      const portfolioRequest = await prisma.portfolioRequest.create({
        data: {
          name,
          email,
          phone: phone || null,
          buyerOrSeller,
          budget: budget || null,
          preferredAreas: preferredAreas || null,
          typeOfHome: typeOfHome || null,
          timeline: timeline || null,
          locale: locale || 'en',
        },
      });

      portfolioRequestId = portfolioRequest.id;
      console.log('✅ Portfolio request saved to database successfully!');
      console.log('📋 Record ID:', portfolioRequestId);
      console.log('📋 Record data:', JSON.stringify(portfolioRequest, null, 2));
    } catch (dbError_caught: any) {
      console.error('❌ Database save error:', dbError_caught);
      console.error('❌ Error details:', {
        message: dbError_caught.message,
        code: dbError_caught.code,
        meta: dbError_caught.meta,
      });
      dbError = `Database error: ${dbError_caught.message || 'Unknown error'}`;
      
      if (dbError_caught.code === 'P2002') {
        dbError = 'Duplicate entry. This email may have already submitted a request.';
      } else if (dbError_caught.code === 'P2025') {
        dbError = 'Record not found.';
      }
      // Continue even if database fails - we still want to send emails
    }

    // Send thank you email to user
    // NOTE: onboarding@resend.dev can only send to account owner's email
    // Workaround: Send to admin, who can forward to user, OR verify a domain
    let emailError = null;
    
    // Get admin email (used for both user email workaround and admin notification)
    let adminEmail = process.env.ADMIN_EMAIL?.replace(/^["']|["']$/g, '') || 'jam752575@gmail.com';
    if (!adminEmail) {
      adminEmail = 'jam752575@gmail.com'; // Fallback
    }
    
    const isTestDomain = process.env.EMAIL_FROM?.includes('onboarding@resend.dev') || 
                         process.env.EMAIL_FROM?.includes('resend.dev');
    
    try {
      console.log('📧 ===== SENDING USER EMAIL =====');
      console.log('📧 Sending thank you email to user:', email);
      console.log('📧 User name:', name);
      console.log('📧 Using test domain:', isTestDomain);
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error(`Invalid email address format: ${email}`);
      }
      
      console.log('📧 Email configuration check:');
      console.log('   RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'SET (' + process.env.RESEND_API_KEY.substring(0, 10) + '...)' : 'NOT SET');
      console.log('   EMAIL_FROM:', process.env.EMAIL_FROM || 'NOT SET');
      
      const thankYouHtml = generateThankYouEmail(name);
      console.log('📧 Generated HTML length:', thankYouHtml.length, 'characters');
      
      // WORKAROUND: If using test domain, send to admin instead (admin can forward)
      // OR send to both admin and user (user email will fail, but we'll handle it gracefully)
      let emailToSend = email.trim();
      let sendToAdmin = false;
      
      if (isTestDomain && email.toLowerCase() !== adminEmail.toLowerCase()) {
        console.warn('⚠️ Using test domain - Resend only allows sending to account owner');
        console.warn('⚠️ Sending user email to admin instead - admin can forward to user');
        console.warn('⚠️ To fix: Verify a domain in Resend or get a free domain');
        emailToSend = adminEmail;
        sendToAdmin = true;
        
        // Modify email content to indicate it's for forwarding
        const forwardNote = `
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>📧 Forward this email to:</strong> ${email}<br>
              <strong>👤 User name:</strong> ${name}
            </p>
          </div>
        `;
        const modifiedHtml = thankYouHtml.replace('</body>', forwardNote + '</body>');
        
        const emailResult = await sendEmail(
          emailToSend,
          `[FORWARD TO USER] Thank You for Your Portfolio Request - Icon Properties`,
          modifiedHtml
        );
        
        console.log('✅ User email sent to admin (for forwarding)');
        console.log('✅ Email ID:', emailResult?.id);
        console.log('📧 Admin should forward this email to:', email);
        // Don't set error - email was successfully sent (just to admin for forwarding)
        // emailError remains null to indicate success
      } else {
        // Normal send (domain verified or sending to account owner)
        const emailResult = await sendEmail(
          emailToSend,
          'Thank You for Your Portfolio Request - Icon Properties',
          thankYouHtml
        );
        
        console.log('✅ Thank you email sent successfully to:', email);
        console.log('✅ Email ID:', emailResult?.id);
        // emailError remains null to indicate success
      }
      
      console.log('📧 ===== USER EMAIL PROCESSED =====');
    } catch (err: any) {
      console.error('❌ ===== USER EMAIL FAILED =====');
      console.error('❌ Failed to send thank you email to user:', email);
      console.error('❌ Error type:', err.constructor.name);
      console.error('❌ Error message:', err.message);
      
      // If it's the test domain restriction error, provide helpful message
      if (err.message?.includes('only send testing emails to your own email address')) {
        emailError = `Resend test domain restriction: Can only send to ${adminEmail}. Please verify a domain in Resend to send to other users.`;
        console.error('💡 SOLUTION: Verify a domain in Resend dashboard or use a free domain service');
      } else {
        emailError = err.message || 'Email send error';
      }
      
      console.error('❌ Error stack:', err.stack);
      console.error('❌ ===== USER EMAIL ERROR END =====');
      // Continue even if email fails
    }

    // Send notification email to admin
    // adminEmail is already defined above
    // IMPORTANT: Only send admin notification if we didn't already send user email to admin
    // (to avoid sending duplicate emails when using test domain workaround)
    let adminEmailError = null;
    
    // Only send admin notification if user email wasn't sent to admin (for forwarding)
    const shouldSendAdminNotification = !(isTestDomain && email.toLowerCase() !== adminEmail.toLowerCase());
    
    if (shouldSendAdminNotification) {
      console.log('📧 ===== SENDING ADMIN EMAIL =====');
      console.log('📧 Admin email configuration:');
      console.log('   ADMIN_EMAIL from env:', process.env.ADMIN_EMAIL);
      console.log('   ADMIN_EMAIL cleaned:', adminEmail);
      
      try {
        console.log('📧 Sending admin notification email to:', adminEmail);
        
        const adminHtml = generateAdminNotificationEmail({
          name,
          email,
          phone,
          buyerOrSeller,
          budget,
          preferredAreas,
          typeOfHome,
          timeline,
        });
        console.log('📧 Generated admin HTML length:', adminHtml.length, 'characters');
        
        const adminEmailResult = await sendEmail(
          adminEmail,
          `New Portfolio Request from ${name}`,
          adminHtml
        );
        
        console.log('✅ Admin notification email sent successfully to:', adminEmail);
        console.log('✅ Email ID:', adminEmailResult?.id);
        console.log('📧 ===== ADMIN EMAIL SENT =====');
      } catch (err: any) {
        console.error('❌ ===== ADMIN EMAIL FAILED =====');
        console.error('❌ Failed to send admin notification email to:', adminEmail);
        console.error('❌ Error type:', err.constructor.name);
        console.error('❌ Error message:', err.message);
        console.error('❌ Error stack:', err.stack);
        if (err.response) {
          console.error('❌ Error response:', err.response);
        }
        adminEmailError = err.message || 'Admin email send error';
        console.error('❌ ===== ADMIN EMAIL ERROR END =====');
        // Continue even if email fails
      }
    } else {
      console.log('📧 ===== SKIPPING ADMIN EMAIL =====');
      console.log('📧 Reason: User email was already sent to admin (for forwarding)');
      console.log('📧 Admin will receive user email with forwarding instructions');
      console.log('📧 ===== ADMIN EMAIL SKIPPED =====');
    }

    // Return response with warnings if there were issues
    const warnings: string[] = [];
    const emailStatus = {
      userEmailSent: !emailError,
      adminEmailSent: !adminEmailError,
      userEmailError: emailError || null,
      adminEmailError: adminEmailError || null,
    };

    if (dbError) {
      warnings.push(`Database: ${dbError}`);
      console.error('❌ Database storage failed:', dbError);
    }
    if (emailError) {
      warnings.push(`User email: ${emailError}`);
      console.error('❌ User email failed:', emailError);
    }
    if (adminEmailError) {
      warnings.push(`Admin email: ${adminEmailError}`);
      console.error('❌ Admin email failed:', adminEmailError);
    }

    // Log final status
    console.log('📊 ===== FINAL SUBMISSION STATUS =====');
    console.log('📊 Database:', portfolioRequestId ? '✅ Saved (ID: ' + portfolioRequestId + ')' : '❌ Failed');
    console.log('📊 User Email:', emailStatus.userEmailSent ? '✅ Sent' : '❌ Failed (' + emailError + ')');
    console.log('📊 Admin Email:', emailStatus.adminEmailSent ? '✅ Sent' : '❌ Failed (' + adminEmailError + ')');
    console.log('📊 ===== END STATUS =====');

    // If database failed but everything else worked, return success with warning
    // This allows the form to complete but logs the issue
    if (warnings.length > 0) {
      console.warn('⚠️ Submission completed with warnings:', warnings);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: portfolioRequestId 
          ? 'Portfolio request submitted successfully' 
          : 'Form submitted but database storage failed. Please check server configuration.',
        id: portfolioRequestId,
        emailStatus,
        warnings: warnings.length > 0 ? warnings : undefined
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Portfolio request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

