"use client";

import { PlusCircle } from "lucide-react";
import type { Member } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamPageProps {
  members: Member[];
}

export function TeamPage({ members }: TeamPageProps) {
  return (
    <div className="animate-in fade-in-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((member) => (
          <Card key={member.id} className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 flex flex-col items-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
