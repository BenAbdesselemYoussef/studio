import { getProjectById } from "@/lib/data";
import { MainLayout } from "@/components/main-layout";
import { ProjectDetails } from "@/components/project-details";
import { notFound } from "next/navigation";
import type { Project } from "@/lib/data";

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const {id} = await params;
  const project = await getProjectById(id)
  
  if (!project) {
    // This will be called on first render, and until the project is loaded.
    // You could show a loading skeleton here.
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <ProjectDetails project={project} />
    </MainLayout>
  );
}
