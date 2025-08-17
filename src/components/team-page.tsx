"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import type { Member } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface TeamPageProps {
  members: Member[];
}

export function TeamPage({ members: initialMembers }: TeamPageProps) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const getPravatarUrl = (id: string) => `https://i.pravatar.cc/150?u=${id}`;

  const handleAddMember = () => {
    if (!newMemberName.trim() || !newMemberRole.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both a name and a role for the new member.",
        variant: "destructive",
      });
      return;
    }

    const newId = `user-${members.length + 1}`;
    const newMember: Member = {
      id: newId,
      name: newMemberName,
      role: newMemberRole,
      avatarUrl: getPravatarUrl(newId),
    };

    setMembers([...members, newMember]);
    setNewMemberName("");
    setNewMemberRole("");
    setIsDialogOpen(false);

    toast({
      title: "Member Added",
      description: `${newMember.name} has been added to the team.`,
    });
  };

  return (
    <div className="animate-in fade-in-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>
                Enter the details for the new team member.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g. Alex Doe"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Input
                  id="role"
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g. Software Engineer"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddMember}>Add Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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