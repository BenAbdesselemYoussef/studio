"use client";

import Link from "next/link";
import { format } from "date-fns";
import {
  CheckCircle2,
  File,
  FileText,
  ImageIcon,
  Link2,
  PlusCircle,
  Users,
  ClipboardList,
  Paperclip,
  MoreVertical,
  Edit,
} from "lucide-react";
import { Project, Milestone, MilestoneStatus, Asset } from "@/lib/data";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
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
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProjectDetailsProps {
  project: Project;
}

const getStatusBadgeVariant = (status: Milestone["status"]) => {
  switch (status) {
    case "Completed":
      return "default";
    case "In Progress":
      return "secondary";
    default:
      return "outline";
  }
};

const getAssetIcon = (assetType: Asset["type"]) => {
  switch (assetType) {
    case "Image":
      return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
    case "Document":
      return <FileText className="h-5 w-5 text-muted-foreground" />;
    case "Link":
      return <Link2 className="h-5 w-5 text-muted-foreground" />;
    default:
      return <File className="h-5 w-5 text-muted-foreground" />;
  }
};

export function ProjectDetails({ project: initialProject }: ProjectDetailsProps) {
  const [project, setProject] = useState<Project>(initialProject);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setProgress(milestone.progress);
    setNotes(milestone.notes || "");
    setIsDialogOpen(true);
  };
  
  const handleUpdate = (isFinishing: boolean) => {
    if (!selectedMilestone) return;

    if (isFinishing && !notes.trim()) {
      toast({
        title: "Notes required",
        description: "Please provide notes before finishing the milestone.",
        variant: "destructive",
      });
      return;
    }
    
    const finalProgress = isFinishing ? 100 : progress;

    const updatedMilestones = project.milestones.map((m) => {
      if (m.id === selectedMilestone.id) {
        const mileStoneStatus: MilestoneStatus = isFinishing ? 'Completed' : 'In Progress'; 
        return {
          ...m,
          progress: finalProgress,
          status: mileStoneStatus,
          notes: notes.trim() || (isFinishing ? 'Finished' : m.notes),
        };
      }
      return m;
    });
    
    const updatedProject: Project = { ...project, milestones: updatedMilestones };
    const overallProgress = Math.round(updatedMilestones.reduce((acc, m) => acc + m.progress, 0) / updatedMilestones.length);
    updatedProject.progress = overallProgress;

    setProject(updatedProject);
    
    toast({
      title: "Milestone Updated",
      description: `"${selectedMilestone.title}" has been updated.`,
    });
    
    setIsDialogOpen(false);
  };

  const activeMilestones = project.milestones.filter(
    (m) => m.status !== "Completed"
  );
  const finishedMilestones = project.milestones.filter(
    (m) => m.status === "Completed"
  );

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="mt-1 text-muted-foreground">{project.description}</p>
          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{project.team.length} Members</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-6 w-6" />
                Milestone Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeMilestones.map((milestone) => (
                <div key={milestone.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{milestone.title}</h3>
                    <Badge variant={getStatusBadgeVariant(milestone.status)} className="bg-accent text-accent-foreground">
                      {milestone.status}
                    </Badge>
                  </div>
                  <Progress value={milestone.progress} />
                  <div className="flex items-center justify-end text-sm gap-4">
                    <span className="text-muted-foreground font-medium">{milestone.progress}%</span>
                    <Button variant="outline" size="sm" onClick={() => handleOpenDialog(milestone)}>
                      <Edit className="mr-2 h-3 w-3" />
                      Update Progress
                    </Button>
                  </div>
                </div>
              ))}
              {activeMilestones.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No active milestones.
                </p>
              )}
            </CardContent>
          </Card>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update: {selectedMilestone?.title}</DialogTitle>
                <DialogDescription>
                  Adjust the progress and add notes for this milestone.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="progress">Progress: {progress}%</Label>
                  <Slider
                    id="progress"
                    value={[progress]}
                    onValueChange={(value) => setProgress(value[0])}
                    max={100}
                    step={25}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any relevant notes here..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => handleUpdate(true)} variant="destructive">
                  Finish Milestone
                </Button>
                <Button onClick={() => handleUpdate(false)}>Update</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {finishedMilestones.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  Finished Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {finishedMilestones.map((milestone) => (
                    <AccordionItem key={milestone.id} value={milestone.id}>
                      <AccordionTrigger className="font-semibold no-underline hover:no-underline">
                        <div className="flex justify-between w-full pr-2">
                          <span>{milestone.title}</span>
                          <span className="text-sm text-muted-foreground font-normal">
                            Completed on {format(new Date(), "MMM d, yyyy")}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        {milestone.notes ? (
                          <p><strong>Notes:</strong> {milestone.notes}</p>
                        ) : (
                          <p>No notes for this milestone.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" /> Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {project.team.map((member) => (
                  <li key={member.id} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paperclip className="h-6 w-6" /> Project Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full mb-4">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Asset
              </Button>
              <div className="max-h-60 overflow-y-auto">
                <Table>
                  <TableBody>
                    {project.assets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell className="font-medium flex items-center gap-3 p-2">
                          {getAssetIcon(asset.type)}
                          <Link href={asset.url} className="hover:underline truncate" target="_blank" title={asset.name}>
                            {asset.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground p-2">{asset.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {project.assets.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No assets uploaded yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
