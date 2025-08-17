import { getProjectById } from "@/lib/data";
import { MainLayout } from "@/components/main-layout";
import { ProjectDetails } from "@/components/project-details";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <MainLayout>
      <ProjectDetails project={project} />
    </MainLayout>
  );
}
