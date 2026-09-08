import {
  LayoutDashboard, Users, Building2, FolderKanban, CheckSquare, FileText,
  MessagesSquare, Bell, FileSpreadsheet, CalendarClock, RefreshCw, CalendarDays,
  Calendar, BookOpen, Star, HelpCircle, Briefcase, Globe, MapPin, Layers,
  FileEdit, BarChart3, UserCog, ShieldCheck, Settings, History, Mail, MessageCircle,
} from "lucide-react";

export const adminNav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true, perm: "overview" },
  { to: "/admin/clients", label: "Clients", icon: Users, perm: "clients" },
  { to: "/admin/companies", label: "Companies", icon: Building2, perm: "companies" },
  { to: "/admin/cases", label: "Cases", icon: FolderKanban, perm: "cases" },
  { to: "/admin/tasks", label: "Tasks", icon: CheckSquare, perm: "tasks" },
  { to: "/admin/documents", label: "Documents", icon: FileText, perm: "documents" },
  { to: "/admin/messages", label: "Messages", icon: MessagesSquare, perm: "messages" },
  { to: "/admin/notifications", label: "Notifications", icon: Bell, perm: "notifications" },
  { to: "/admin/quotes", label: "Quotes", icon: FileSpreadsheet, perm: "quotes" },
  { to: "/admin/consultations", label: "Consultations", icon: CalendarClock, perm: "consultations" },
  { to: "/admin/renewals", label: "Renewals", icon: RefreshCw, perm: "renewals" },
  { to: "/admin/deadlines", label: "Deadlines", icon: CalendarDays, perm: "deadlines" },
  { to: "/admin/calendar", label: "Calendar", icon: Calendar, perm: "calendar" },
  { to: "/admin/services", label: "Services", icon: Layers, perm: "services" },
  { to: "/admin/countries", label: "Countries", icon: Globe, perm: "countries" },
  { to: "/admin/locations", label: "Locations", icon: MapPin, perm: "locations" },
  { to: "/admin/resources", label: "Resources", icon: BookOpen, perm: "resources" },
  { to: "/admin/testimonials", label: "Testimonials", icon: Star, perm: "testimonials" },
  { to: "/admin/faqs", label: "FAQs", icon: HelpCircle, perm: "faqs" },
  { to: "/admin/careers", label: "Careers", icon: Briefcase, perm: "careers" },
  { to: "/admin/content", label: "Website Content", icon: FileEdit, perm: "content" },
  { to: "/admin/templates", label: "Notification Templates", icon: Mail, perm: "templates" },
  { to: "/admin/reports", label: "Reports", icon: BarChart3, perm: "reports" },
  { to: "/admin/staff", label: "Staff", icon: UserCog, perm: "staff" },
  { to: "/admin/roles", label: "Roles & Permissions", icon: ShieldCheck, perm: "roles" },
  { to: "/admin/audit", label: "Audit Trail", icon: History, perm: "audit" },
  { to: "/admin/settings", label: "Settings", icon: Settings, perm: "settings" },
];

export const adminBrand = { icon: ShieldCheck, whatsappIcon: MessageCircle };