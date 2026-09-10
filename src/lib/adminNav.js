import {
  LayoutDashboard, MessagesSquare, Bell, FileSpreadsheet, CalendarClock,
  Layers, BookOpen, HelpCircle, FileEdit, Mail,
  Settings, MessageCircle, ShieldCheck, Users, UserCog, Search, BarChart3, ClipboardList,
} from "lucide-react";

export const adminNav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true, perm: "overview" },
  { to: "/admin/messages", label: "Messages", icon: MessagesSquare, perm: "messages" },
  { to: "/admin/notifications", label: "Notifications", icon: Bell, perm: "notifications" },
  { to: "/admin/quotes", label: "Quote Requests", icon: FileSpreadsheet, perm: "quotes" },
  { to: "/admin/consultations", label: "Consultations", icon: CalendarClock, perm: "consultations" },
  { to: "/admin/services", label: "Services", icon: Layers, perm: "services" },
  { to: "/admin/resources", label: "Resources", icon: BookOpen, perm: "resources" },
  { to: "/admin/faqs", label: "FAQs", icon: HelpCircle, perm: "faqs" },
  { to: "/admin/content", label: "Website Content", icon: FileEdit, perm: "content" },
  { to: "/admin/users", label: "Users", icon: Users, perm: "users" },
  { to: "/admin/roles", label: "Roles & Permissions", icon: UserCog, perm: "roles" },
  { to: "/admin/seo", label: "SEO", icon: Search, perm: "seo" },
  { to: "/admin/integrations", label: "Google Integrations", icon: BarChart3, perm: "integrations" },
  { to: "/admin/audit", label: "Activity Log", icon: ClipboardList, perm: "audit" },
  { to: "/admin/templates", label: "Notification Templates", icon: Mail, perm: "templates" },
  { to: "/admin/settings", label: "Settings", icon: Settings, perm: "settings" },
  { to: "/admin/account", label: "Account", icon: UserCog, perm: "account" },
  { to: "/admin/ownership", label: "Ownership", icon: ShieldCheck, perm: "ownership" },
];

export const adminBrand = { icon: ShieldCheck, whatsappIcon: MessageCircle };