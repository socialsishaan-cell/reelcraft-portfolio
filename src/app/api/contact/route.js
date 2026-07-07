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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A1220; color: #EEF2F7; padding: 32px; border-radius: 16px;">
          <div style="border-bottom: 2px solid #4FD8C4; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 24px; color: #4FD8C4;">🌧️ New ReelCraft Inquiry</h1>
          </div>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; color: #9FADC4; width: 100px; vertical-align: top;">Name</td>
              <td style="padding: 12px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #9FADC4; vertical-align: top;">Email</td>
              <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #F2A93B;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #9FADC4; vertical-align: top;">Subject</td>
              <td style="padding: 12px 0; font-weight: 600;">${subject}</td>
            </tr>
          </table>
 
          <div style="margin-top: 24px; padding: 20px; background: rgba(79, 216, 196, 0.08); border: 1px solid rgba(79, 216, 196, 0.25); border-radius: 12px;">
            <p style="margin: 0 0 8px; color: #9FADC4; font-size: 14px;">Message</p>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
 
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #14213A; font-size: 12px; color: #6E7C97;">
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

    // Send Telegram notification
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const telegramMessage =
        `🎬 *New ReelCraft Inquiry*\n\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Subject:* ${subject}\n\n` +
        `*Message:*\n${message}`;

      try {
        await fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text: telegramMessage,
              parse_mode: 'Markdown',
            }),
          }
        );
      } catch (telegramError) {
        console.error('Telegram error:', telegramError);
        // Don't fail the request if Telegram fails
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
