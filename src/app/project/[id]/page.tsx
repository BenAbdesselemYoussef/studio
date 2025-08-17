
"use client";
import { getProjectById } from "@/lib/data";
import { MainLayout } from "@/components/main-layout";
import { ProjectDetails } from "@/components/project-details";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/data";

export default function ProjectPage({ params: { id } }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    getProjectById(id).then(setProject);
  }, [id]);

  useEffect(() => {
    if (project === null && id) {
      getProjectById(id).then((proj) => {
        if (!proj) {
          // notFound() can't be called in useEffect, so handle appropriately
          console.error("Project not found");
        } else {
          setProject(proj);
        }
      });
    }
  }, [id, project]);
  
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
