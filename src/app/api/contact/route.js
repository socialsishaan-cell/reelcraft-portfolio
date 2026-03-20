import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

    const newMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    const filePath = path.join(process.cwd(), 'data', 'messages.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const messages = JSON.parse(fileData);
    messages.push(newMessage);
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
