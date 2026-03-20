import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    let projects = JSON.parse(fileData);

    if (category && category !== 'all') {
      projects = projects.filter(p => p.category === category);
    }

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
