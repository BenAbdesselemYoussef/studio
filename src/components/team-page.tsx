"use client";

import { useState } from "react";
import { PlusCircle, MoreVertical, Edit, Trash2 } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface TeamPageProps {
  members: Member[];
}

export function TeamPage({ members: initialMembers }: TeamPageProps) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isEditMemberDialogOpen, setIsEditMemberDialogOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);

  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [editedMemberName, setEditedMemberName] = useState("");
  const [editedMemberRole, setEditedMemberRole] = useState("");

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
    setIsAddMemberDialogOpen(false);

    toast({
      title: "Member Added",
      description: `${newMember.name} has been added to the team.`,
    });
  };

  const handleOpenEditDialog = (member: Member) => {
    setMemberToEdit(member);
    setEditedMemberName(member.name);
    setEditedMemberRole(member.role);
    setIsEditMemberDialogOpen(true);
  };

  const handleEditMember = () => {
    if (!memberToEdit || !editedMemberName.trim() || !editedMemberRole.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }

    setMembers(
      members.map((m) =>
        m.id === memberToEdit.id
          ? { ...m, name: editedMemberName, role: editedMemberRole }
          : m
      )
    );

    setIsEditMemberDialogOpen(false);
    setMemberToEdit(null);

    toast({
      title: "Member Updated",
      description: `Details for ${editedMemberName} have been updated.`,
    });
  };

  const handleDeleteMember = (memberToDelete: Member) => {
    if (!memberToDelete) return;

    setMembers(members.filter((m) => m.id !== memberToDelete.id));

    toast({
      title: "Member Removed",
      description: `${memberToDelete.name} has been removed from the team.`,
    });
  };

  return (
    <div className="animate-in fade-in-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
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
                  autoFocus
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
          <Card key={member.id} className="text-center hover:shadow-lg transition-shadow duration-300 relative">
             <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleOpenEditDialog(member)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently remove{" "}
                            <strong>{member.name}</strong> from the team.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteMember(member)} className="bg-destructive hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
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

      {/* Edit Member Dialog */}
      <Dialog open={isEditMemberDialogOpen} onOpenChange={setIsEditMemberDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>
              Update the details for {memberToEdit?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={editedMemberName}
                onChange={(e) => setEditedMemberName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-role" className="text-right">
                Role
              </Label>
              <Input
                id="edit-role"
                value={editedMemberRole}
                onChange={(e) => setEditedMemberRole(e.target.value)}
                className="col-span-3"
                autoFocus={true}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMemberDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditMember}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}