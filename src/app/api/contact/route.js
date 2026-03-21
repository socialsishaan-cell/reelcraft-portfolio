import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { success: false, error: 'Field length exceeds maximum allowed' },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { error: emailError } = await resend.emails.send({
      from: 'ReelCraft <onboarding@resend.dev>',
      to: 'socialsishaan@gmail.com',
      subject: `[ReelCraft] ${subject} — from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0F; color: #F7F7FF; padding: 32px; border-radius: 16px;">
          <div style="border-bottom: 2px solid #9b7af0; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 24px; color: #9b7af0;">🎬 New ReelCraft Inquiry</h1>
          </div>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; color: #9898B8; width: 100px; vertical-align: top;">Name</td>
              <td style="padding: 12px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #9898B8; vertical-align: top;">Email</td>
              <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #6ee7b7;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #9898B8; vertical-align: top;">Subject</td>
              <td style="padding: 12px 0; font-weight: 600;">${subject}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 20px; background: rgba(155, 122, 240, 0.1); border: 1px solid rgba(155, 122, 240, 0.2); border-radius: 12px;">
            <p style="margin: 0 0 8px; color: #9898B8; font-size: 14px;">Message</p>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #161625; font-size: 12px; color: #5E5E7F;">
            Sent from your ReelCraft portfolio contact form
          </div>
        </div>
      `,
    });

    if (emailError) {
      console.error('Email error:', emailError);
      return NextResponse.json(
        { success: false, error: 'Failed to send email notification' },
        { status: 500 }
      );
    }

    // Send WhatsApp notification via CallMeBot (if configured)
    if (process.env.CALLMEBOT_API_KEY && process.env.CALLMEBOT_PHONE) {
      const whatsappMessage = encodeURIComponent(
        `🎬 *New ReelCraft Inquiry*\n\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Subject:* ${subject}\n\n` +
        `*Message:*\n${message}`
      );

      try {
        await fetch(
          `https://api.callmebot.com/whatsapp.php?phone=${process.env.CALLMEBOT_PHONE}&text=${whatsappMessage}&apikey=${process.env.CALLMEBOT_API_KEY}`
        );
      } catch (whatsappError) {
        console.error('WhatsApp error:', whatsappError);
        // Don't fail the request if WhatsApp fails
      }
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
