import fs from 'fs';
import path from 'path';
import HomeClient from '@/components/HomeClient';

async function getFeaturedProjects() {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  const data = fs.readFileSync(filePath, 'utf8');
  const projects = JSON.parse(data);
  return projects.filter(p => p.featured).slice(0, 6);
}

export default async function HomePage() {
  const featured = await getFeaturedProjects();
  return <HomeClient featured={featured} />;
}
