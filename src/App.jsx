import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { AuthProvider } from "@/lib/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import { CountryProvider } from "./lib/CountryContext";
import Layout from "./components/Layout";
import { CustomerRoute, StaffRoute } from "@/components/RoleRoute";

// Public site pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import CountryServices from "./pages/CountryServices";
import GetAQuote from "./pages/GetAQuote";
import BookConsultation from "./pages/BookConsultation";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import Testimonials from "./pages/Testimonials";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";

// Auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Customer portal
import PortalShell from "./components/portal/PortalShell";
import PortalDashboard from "./pages/portal/PortalDashboard";
import PortalBusiness from "./pages/portal/PortalBusiness";
import PortalCompanies from "./pages/portal/PortalCompanies";
import PortalCases from "./pages/portal/PortalCases";
import PortalCaseDetail from "./pages/portal/PortalCaseDetail";
import PortalDocuments from "./pages/portal/PortalDocuments";
import PortalMessages from "./pages/portal/PortalMessages";
import PortalNotifications from "./pages/portal/PortalNotifications";
import PortalQuotes from "./pages/portal/PortalQuotes";
import PortalConsultations from "./pages/portal/PortalConsultations";
import PortalTasks from "./pages/portal/PortalTasks";
import PortalDeadlines from "./pages/portal/PortalDeadlines";
import PortalProfile from "./pages/portal/PortalProfile";
import PortalSettings from "./pages/portal/PortalSettings";

// Admin dashboard
import AdminShell from "./components/admin/AdminShell";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminClients from "./pages/admin/AdminClients";
import AdminCompanies from "./pages/admin/AdminCompanies";
import AdminCases from "./pages/admin/AdminCases";
import AdminTasks from "./pages/admin/AdminTasks";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminQuotes from "./pages/admin/AdminQuotes";
import AdminConsultations from "./pages/admin/AdminConsultations";
import AdminRenewals from "./pages/admin/AdminRenewals";
import AdminDeadlines from "./pages/admin/AdminDeadlines";
import AdminCalendar from "./pages/admin/AdminCalendar";
import AdminServices from "./pages/admin/AdminServices";
import AdminCountries from "./pages/admin/AdminCountries";
import AdminLocations from "./pages/admin/AdminLocations";
import AdminResources from "./pages/admin/AdminResources";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminFAQs from "./pages/admin/AdminFAQs";
import AdminCareers from "./pages/admin/AdminCareers";
import AdminContent from "./pages/admin/AdminContent";
import AdminTemplates from "./pages/admin/AdminTemplates";
import AdminReports from "./pages/admin/AdminReports";
import AdminStaff from "./pages/admin/AdminStaff";
import AdminRoles from "./pages/admin/AdminRoles";
import AdminAudit from "./pages/admin/AdminAudit";
import AdminSettings from "./pages/admin/AdminSettings";

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <CountryProvider>
            <Routes>
              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Public website */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/country-services" element={<CountryServices />} />
                <Route path="/get-a-quote" element={<GetAQuote />} />
                <Route path="/book-consultation" element={<BookConsultation />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Legal kind="privacy" />} />
                <Route path="/terms" element={<Legal kind="terms" />} />
              </Route>

              {/* Customer portal */}
              <Route element={<CustomerRoute />}>
                <Route element={<PortalShell />}>
                  <Route path="/portal" element={<PortalDashboard />} />
                  <Route path="/portal/business" element={<PortalBusiness />} />
                  <Route path="/portal/companies" element={<PortalCompanies />} />
                  <Route path="/portal/cases" element={<PortalCases />} />
                  <Route path="/portal/cases/:id" element={<PortalCaseDetail />} />
                  <Route path="/portal/documents" element={<PortalDocuments />} />
                  <Route path="/portal/messages" element={<PortalMessages />} />
                  <Route path="/portal/notifications" element={<PortalNotifications />} />
                  <Route path="/portal/quotes" element={<PortalQuotes />} />
                  <Route path="/portal/consultations" element={<PortalConsultations />} />
                  <Route path="/portal/tasks" element={<PortalTasks />} />
                  <Route path="/portal/deadlines" element={<PortalDeadlines />} />
                  <Route path="/portal/profile" element={<PortalProfile />} />
                  <Route path="/portal/settings" element={<PortalSettings />} />
                </Route>
              </Route>

              {/* Admin dashboard */}
              <Route element={<StaffRoute />}>
                <Route element={<AdminShell />}>
                  <Route path="/admin" element={<AdminOverview />} />
                  <Route path="/admin/clients" element={<AdminClients />} />
                  <Route path="/admin/companies" element={<AdminCompanies />} />
                  <Route path="/admin/cases" element={<AdminCases />} />
                  <Route path="/admin/tasks" element={<AdminTasks />} />
                  <Route path="/admin/documents" element={<AdminDocuments />} />
                  <Route path="/admin/messages" element={<AdminMessages />} />
                  <Route path="/admin/notifications" element={<AdminNotifications />} />
                  <Route path="/admin/quotes" element={<AdminQuotes />} />
                  <Route path="/admin/consultations" element={<AdminConsultations />} />
                  <Route path="/admin/renewals" element={<AdminRenewals />} />
                  <Route path="/admin/deadlines" element={<AdminDeadlines />} />
                  <Route path="/admin/calendar" element={<AdminCalendar />} />
                  <Route path="/admin/services" element={<AdminServices />} />
                  <Route path="/admin/countries" element={<AdminCountries />} />
                  <Route path="/admin/locations" element={<AdminLocations />} />
                  <Route path="/admin/resources" element={<AdminResources />} />
                  <Route path="/admin/testimonials" element={<AdminTestimonials />} />
                  <Route path="/admin/faqs" element={<AdminFAQs />} />
                  <Route path="/admin/careers" element={<AdminCareers />} />
                  <Route path="/admin/content" element={<AdminContent />} />
                  <Route path="/admin/templates" element={<AdminTemplates />} />
                  <Route path="/admin/reports" element={<AdminReports />} />
                  <Route path="/admin/staff" element={<AdminStaff />} />
                  <Route path="/admin/roles" element={<AdminRoles />} />
                  <Route path="/admin/audit" element={<AdminAudit />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                </Route>
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </CountryProvider>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;