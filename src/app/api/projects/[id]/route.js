import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const projects = JSON.parse(fileData);

    const project = projects.find(p => p.id === id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}
