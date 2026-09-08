import {
  LayoutDashboard, MessagesSquare, Bell, FileSpreadsheet, CalendarClock,
  Layers, Globe, MapPin, BookOpen, HelpCircle, FileEdit, Mail,
  Settings, MessageCircle, ShieldCheck,
} from "lucide-react";

export const adminNav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true, perm: "overview" },
  { to: "/admin/messages", label: "Messages", icon: MessagesSquare, perm: "messages" },
  { to: "/admin/notifications", label: "Notifications", icon: Bell, perm: "notifications" },
  { to: "/admin/quotes", label: "Quote Requests", icon: FileSpreadsheet, perm: "quotes" },
  { to: "/admin/consultations", label: "Consultations", icon: CalendarClock, perm: "consultations" },
  { to: "/admin/services", label: "Services", icon: Layers, perm: "services" },
  { to: "/admin/countries", label: "Countries", icon: Globe, perm: "countries" },
  { to: "/admin/locations", label: "Locations", icon: MapPin, perm: "locations" },
  { to: "/admin/resources", label: "Resources", icon: BookOpen, perm: "resources" },
  { to: "/admin/faqs", label: "FAQs", icon: HelpCircle, perm: "faqs" },
  { to: "/admin/content", label: "Website Content", icon: FileEdit, perm: "content" },
  { to: "/admin/templates", label: "Notification Templates", icon: Mail, perm: "templates" },
  { to: "/admin/settings", label: "Settings", icon: Settings, perm: "settings" },
];

export const adminBrand = { icon: ShieldCheck, whatsappIcon: MessageCircle };