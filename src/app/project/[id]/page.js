import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/ProjectDetailClient';

async function getProject(id) {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  const data = fs.readFileSync(filePath, 'utf8');
  const projects = JSON.parse(data);
  return { project: projects.find(p => p.id === id), allProjects: projects };
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  const data = fs.readFileSync(filePath, 'utf8');
  const projects = JSON.parse(data);
  return projects.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { project } = await getProject(id);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | ReelCraft`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const { project, allProjects } = await getProject(id);

  if (!project) {
    notFound();
  }

  const currentIndex = allProjects.findIndex(p => p.id === id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <ProjectDetailClient
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
