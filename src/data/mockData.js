import {
  LayoutDashboard,
  FilePlus2,
  ListChecks,
  MessageSquare,
  Settings,
  Search,
  Lightbulb,
  Award,
  HandCoins,
  Users,
  Briefcase,
  BarChart3,
} from "lucide-react";

export const ROLES = {
  provider: {
    label: "Problem Provider",
    greeting: "Report issues around you and track them to resolution.",
    cta: { label: "Report a Problem", icon: FilePlus2 },
    nav: [
      { label: "Dashboard", icon: LayoutDashboard },
      { label: "Report a Problem", icon: FilePlus2 },
      { label: "My Problems", icon: ListChecks },
      { label: "Messages", icon: MessageSquare },
      { label: "Settings", icon: Settings },
    ],
    stats: [
      { label: "Problems reported", value: "12", hint: "+2 this week", tone: "new", icon: FilePlus2 },
      { label: "Open / critical", value: "4", hint: "Needs attention", tone: "critical", icon: ListChecks },
      { label: "Being solved", value: "5", hint: "3 solvers active", tone: "progress", icon: Lightbulb },
      { label: "Resolved", value: "3", hint: "25% resolution rate", tone: "success", icon: Award },
    ],
    tableTitle: "My reported problems",
  },
  solver: {
    label: "Problem Solver",
    greeting: "Pick problems that match your skills and build your proof of work.",
    cta: { label: "Browse Problems", icon: Search },
    nav: [
      { label: "Dashboard", icon: LayoutDashboard },
      { label: "Browse Problems", icon: Search },
      { label: "My Solutions", icon: Lightbulb },
      { label: "Skills & Badges", icon: Award },
      { label: "Messages", icon: MessageSquare },
    ],
    stats: [
      { label: "Active problems", value: "3", hint: "2 due this week", tone: "progress", icon: Lightbulb },
      { label: "Solutions submitted", value: "14", hint: "+4 this month", tone: "new", icon: ListChecks },
      { label: "Problems resolved", value: "9", hint: "64% acceptance", tone: "success", icon: Award },
      { label: "Skill points", value: "1,240", hint: "Top 10% of students", tone: "success", icon: BarChart3 },
    ],
    tableTitle: "Problems matched to you",
  },
  organization: {
    label: "Organization",
    greeting: "Fund impactful problems and hire students with proven skills.",
    cta: { label: "Fund a Problem", icon: HandCoins },
    nav: [
      { label: "Dashboard", icon: LayoutDashboard },
      { label: "Fund a Problem", icon: HandCoins },
      { label: "Talent Pool", icon: Users },
      { label: "Funded Projects", icon: Briefcase },
      { label: "Reports", icon: BarChart3 },
    ],
    stats: [
      { label: "Problems funded", value: "8", hint: "2 awaiting review", tone: "progress", icon: HandCoins },
      { label: "Total funding", value: "₹4.2L", hint: "₹60k this month", tone: "new", icon: BarChart3 },
      { label: "Students hired", value: "6", hint: "+1 this month", tone: "success", icon: Users },
      { label: "Open to fund", value: "21", hint: "5 marked critical", tone: "critical", icon: Search },
    ],
    tableTitle: "Problems seeking funding",
  },
};

export const PROBLEMS = [
  {
    id: "CS-1042",
    title: "Waterlogging near the main market after light rain",
    location: "Ward 14 · Civil Lines",
    category: "Infrastructure",
    status: "critical",
    funding: "₹45,000",
    updated: "2 hours ago",
  },
  {
    id: "CS-1038",
    title: "No segregation of wet and dry waste in housing society",
    location: "Sector 9 · Residential",
    category: "Sanitation",
    status: "progress",
    funding: "₹20,000",
    updated: "Yesterday",
  },
  {
    id: "CS-1035",
    title: "Government school lacks digital attendance and records",
    location: "Block C · Education",
    category: "Education",
    status: "new",
    funding: "—",
    updated: "Yesterday",
  },
  {
    id: "CS-1029",
    title: "Streetlights failing on the highway service road",
    location: "NH-48 · Service Road",
    category: "Safety",
    status: "progress",
    funding: "₹30,000",
    updated: "3 days ago",
  },
  {
    id: "CS-1021",
    title: "Farmers unable to check daily mandi prices on basic phones",
    location: "Village Cluster 3",
    category: "Agriculture",
    status: "new",
    funding: "₹15,000",
    updated: "4 days ago",
  },
  {
    id: "CS-1014",
    title: "Long queue times at the primary health centre",
    location: "PHC · Ward 6",
    category: "Healthcare",
    status: "resolved",
    funding: "₹25,000",
    updated: "1 week ago",
  },
];

export const ACTIVITY = [
  { id: 1, text: "Aarav submitted a solution for CS-1038", time: "12 min ago", tone: "new" },
  { id: 2, text: "CS-1042 was marked Critical by 14 residents", time: "2 hours ago", tone: "critical" },
  { id: 3, text: "GreenLeaf Foundation funded CS-1029", time: "Yesterday", tone: "progress" },
  { id: 4, text: "CS-1014 was resolved and closed", time: "1 week ago", tone: "resolved" },
];

export const RECOMMENDED = [
  { id: "CS-1035", title: "Digital attendance for rural school", skills: ["React", "Firebase"], match: 92 },
  { id: "CS-1021", title: "SMS-based mandi price alerts", skills: ["Node.js", "SMS APIs"], match: 85 },
  { id: "CS-1042", title: "Flood-prone spot mapping", skills: ["GIS", "Python"], match: 71 },
];

export const TOP_SOLVERS = [
  { name: "Aarav Sharma", college: "MNIT Jaipur", skills: ["React", "Node.js"], solved: 9 },
  { name: "Diya Mehta", college: "JECRC", skills: ["Python", "GIS"], solved: 7 },
  { name: "Rohan Verma", college: "Manipal Jaipur", skills: ["UI/UX", "Figma"], solved: 6 },
];

export const STATUS_BREAKDOWN = [
  { key: "critical", count: 4 },
  { key: "progress", count: 5 },
  { key: "new", count: 3 },
  { key: "resolved", count: 3 },
];
