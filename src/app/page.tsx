import { MainLayout } from "@/components/main-layout";
import { Dashboard } from "@/components/dashboard";
import { projects } from "@/lib/data";

export default function Home() {
  return (
    <MainLayout>
      <Dashboard projects={projects} />
    </MainLayout>
  );
}
