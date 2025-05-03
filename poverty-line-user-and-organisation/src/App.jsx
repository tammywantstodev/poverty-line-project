
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import UserDashboard from "@/pages/dashboard/UserDashboard";
import OrganizationDashboard from "@/pages/dashboard/OrganizationDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/auth/signin" element={<Layout><SignIn /></Layout>} />
          <Route path="/auth/signup" element={<Layout><SignUp /></Layout>} />
          <Route path="/dashboard/user" element={<Layout><UserDashboard /></Layout>} />
          <Route path="/dashboard/organization" element={<Layout><OrganizationDashboard /></Layout>} />
          <Route path="/dashboard/admin" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
