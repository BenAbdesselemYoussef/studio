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
  Calendar,
  ClipboardList,
  Paperclip,
  MoreVertical,
} from "lucide-react";
import type { Project, Milestone, Asset, Member } from "@/lib/data";

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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const getAssetIcon = (type: Asset["type"]) => {
  switch (type) {
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

export function ProjectDetails({ project }: ProjectDetailsProps) {
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
            <CardContent className="space-y-6">
              {activeMilestones.map((milestone) => (
                <div key={milestone.id}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{milestone.title}</h3>
                    <Badge variant={getStatusBadgeVariant(milestone.status)} className="bg-accent text-accent-foreground">
                      {milestone.status}
                    </Badge>
                  </div>
                  <Progress value={milestone.progress} className="mb-2" />
                  <div className="flex items-center justify-end text-sm text-muted-foreground">
                    <span>{milestone.progress}%</span>
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
                        {milestone.title}
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
