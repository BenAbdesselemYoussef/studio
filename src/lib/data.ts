export type Member = {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
};

export type Asset = {
  id: string;
  name: string;
  type: 'Image' | 'Document' | 'Link';
  url: string;
  uploadedAt: string;
  'data-ai-hint'?: string;
};

export type MilestoneStatus = 'Completed' | 'In Progress' | 'Not Started';

export type Milestone = {
  id: string;
  title: string;
  status: MilestoneStatus;
  progress: number;
  notes?: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  progress: number;
  team: Member[];
  milestones: Milestone[];
  assets: Asset[];
};

const getPravatarUrl = (id: string) => `https://i.pravatar.cc/150?u=${id}`;

export const allMembers: Member[] = [
    { id: 'user-1', name: 'Ava Garcia', avatarUrl: getPravatarUrl('user-1'), role: 'Project Manager' },
    { id: 'user-2', name: 'Liam Rodriguez', avatarUrl: getPravatarUrl('user-2'), role: 'Lead Developer' },
    { id: 'user-3', name: 'Sophia Martinez', avatarUrl: getPravatarUrl('user-3'), role: 'UX/UI Designer' },
    { id: 'user-4', name: 'Noah Hernandez', avatarUrl: getPravatarUrl('user-4'), role: 'Frontend Developer' },
    { id: 'user-5', name: 'Isabella Lopez', avatarUrl: getPravatarUrl('user-5'), role: 'Backend Developer' },
    { id: 'user-6', name: 'Mason Gonzalez', avatarUrl: getPravatarUrl('user-6'), role: 'QA Tester' },
];


export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Apollo Web App',
    description: 'A complete redesign and rebuild of the main marketing website.',
    progress: 75,
    team: [allMembers[0], allMembers[1], allMembers[2], allMembers[3]],
    milestones: [
      { id: 'm1-1', title: 'Discovery & Research', status: 'Completed', progress: 100, notes: 'Finalized user personas and journey maps.' },
      { id: 'm1-2', title: 'UI/UX Design Phase', status: 'In Progress', progress: 60 },
      { id: 'm1-3', title: 'Frontend Development', status: 'Not Started', progress: 0 },
      { id: 'm1-4', title: 'Backend Integration', status: 'Not Started', progress: 0 },
    ],
    assets: [
      { id: 'a1-1', name: 'Final_Wireframes.fig', type: 'Link', url: '#', uploadedAt: '2024-08-15' },
      { id: 'a1-2', name: 'Project_Brief_v2.pdf', type: 'Document', url: '#', uploadedAt: '2024-07-30' },
      { id: 'a1-3', name: 'User_Research_Summary.docx', type: 'Document', url: '#', uploadedAt: '2024-08-10' },
    ],
  },
  {
    id: 'proj-2',
    name: 'Orion Mobile App',
    description: 'New native mobile application for iOS and Android.',
    progress: 40,
    team: [allMembers[0], allMembers[4], allMembers[5]],
    milestones: [
        { id: 'm2-1', title: 'Initial Prototyping', status: 'Completed', progress: 100, notes: 'User testing of prototype was successful.' },
        { id: 'm2-2', title: 'Core Feature Development', status: 'In Progress', progress: 30 },
        { id: 'm2-3', title: 'Beta Testing', status: 'Not Started', progress: 0 },
    ],
    assets: [
        { id: 'a2-1', name: 'API_Documentation.pdf', type: 'Document', url: '#', uploadedAt: '2024-08-25' },
        { id: 'a2-2', name: 'App_Icon_Concepts.png', type: 'Image', url: 'https://placehold.co/400x300.png', uploadedAt: '2024-09-05', 'data-ai-hint': 'abstract concept' },
    ],
  },
  {
    id: 'proj-3',
    name: 'Nova Analytics Dashboard',
    description: 'Internal dashboard for visualizing key business metrics.',
    progress: 90,
    team: [allMembers[1], allMembers[3], allMembers[4]],
    milestones: [
        { id: 'm3-1', title: 'Data Source Integration', status: 'Completed', progress: 100, notes: 'All data sources are connected and stable.' },
        { id: 'm3-2', title: 'Chart Component Library', status: 'Completed', progress: 100, notes: 'Built with Recharts for maximum flexibility.' },
        { id: 'm3-3', title: 'User Role & Permissions', status: 'In Progress', progress: 70 },
    ],
    assets: [
      { id: 'a3-1', name: 'Dashboard_Mockups.png', type: 'Image', url: 'https://placehold.co/600x400.png', uploadedAt: '2024-08-18', 'data-ai-hint': 'dashboard analytics' },
    ],
  },
];

export const getProjectById = async (id: string | undefined): Promise<Project | null> => {
    if (!id) return null;
    return projects.find(p => p.id === id) || null;
}
