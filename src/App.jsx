import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { AuthProvider } from "@/lib/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import { CountryProvider } from "./lib/CountryContext";
import Layout from "./components/Layout";
import { StaffRoute } from "@/components/RoleRoute";

// Public site pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import GetAQuote from "./pages/GetAQuote";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";

// Auth pages (registered per platform requirement; customer login is not linked publicly)
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Admin dashboard
import AdminShell from "./components/admin/AdminShell";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminQuotes from "./pages/admin/AdminQuotes";
import AdminConsultations from "./pages/admin/AdminConsultations";
import AdminServices from "./pages/admin/AdminServices";
import AdminCountries from "./pages/admin/AdminCountries";
import AdminLocations from "./pages/admin/AdminLocations";
import AdminResources from "./pages/admin/AdminResources";
import AdminFAQs from "./pages/admin/AdminFAQs";
import AdminContent from "./pages/admin/AdminContent";
import AdminTemplates from "./pages/admin/AdminTemplates";
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
                <Route path="/get-a-quote" element={<GetAQuote />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Legal kind="privacy" />} />
                <Route path="/terms" element={<Legal kind="terms" />} />
              </Route>

              {/* Admin dashboard */}
              <Route element={<StaffRoute />}>
                <Route element={<AdminShell />}>
                  <Route path="/admin" element={<AdminOverview />} />
                  <Route path="/admin/messages" element={<AdminMessages />} />
                  <Route path="/admin/notifications" element={<AdminNotifications />} />
                  <Route path="/admin/quotes" element={<AdminQuotes />} />
                  <Route path="/admin/consultations" element={<AdminConsultations />} />
                  <Route path="/admin/services" element={<AdminServices />} />
                  <Route path="/admin/countries" element={<AdminCountries />} />
                  <Route path="/admin/locations" element={<AdminLocations />} />
                  <Route path="/admin/resources" element={<AdminResources />} />
                  <Route path="/admin/faqs" element={<AdminFAQs />} />
                  <Route path="/admin/content" element={<AdminContent />} />
                  <Route path="/admin/templates" element={<AdminTemplates />} />
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