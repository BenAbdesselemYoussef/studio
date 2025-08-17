import { MainLayout } from "@/components/main-layout";
import { TeamPage } from "@/components/team-page";
import { allMembers } from "@/lib/data";

export default function Team() {
  return (
    <MainLayout>
      <TeamPage members={allMembers} />
    </MainLayout>
  );
}
