import {
  LayoutDashboard, Briefcase, Building2, FolderKanban, FileText,
  MessagesSquare, Bell, FileSpreadsheet, CalendarClock, CheckSquare,
  CalendarDays, User, Settings,
} from "lucide-react";

export const portalNav = [
  { to: "/portal", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/portal/business", label: "My Business", icon: Briefcase },
  { to: "/portal/companies", label: "My Companies", icon: Building2 },
  { to: "/portal/cases", label: "My Services / Cases", icon: FolderKanban },
  { to: "/portal/documents", label: "Documents", icon: FileText },
  { to: "/portal/messages", label: "Messages", icon: MessagesSquare },
  { to: "/portal/notifications", label: "Notifications", icon: Bell },
  { to: "/portal/quotes", label: "Quotes", icon: FileSpreadsheet },
  { to: "/portal/consultations", label: "Consultations", icon: CalendarClock },
  { to: "/portal/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/portal/deadlines", label: "Deadlines", icon: CalendarDays },
  { to: "/portal/profile", label: "Profile", icon: User },
  { to: "/portal/settings", label: "Settings", icon: Settings },
];