import { useState, useEffect } from "react";
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
import OrganisationPage from "@/pages/OrganisationPage";
import UserDashboard from "@/pages/dashboard/UserDashboard";
import OrganizationDashboard from "@/pages/dashboard/OrganizationDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import NotFound from "@/pages/NotFound";

import axios from "axios";
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/current_user")
      .then((res) => {
        if (res.data.authenticated) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout user={user}><Home /></Layout>} />
            <Route path="/about" element={<Layout user={user}><About /></Layout>} />
            <Route path="/auth/signin" element={<Layout user={user}><SignIn /></Layout>} />
            <Route path="/auth/signup" element={<Layout user={user}><SignUp /></Layout>} />
            <Route path="/dashboard/user" element={<Layout user={user}><UserDashboard /></Layout>} />
            <Route path="/dashboard/organization" element={<Layout user={user}><OrganizationDashboard /></Layout>} />
            <Route path="/dashboard/admin" element={<Layout user={user}><AdminDashboard /></Layout>} />
            <Route path="/org/viewusers" element={<Layout user={user}><OrganisationPage /></Layout>} />
            <Route path="*" element={<Layout user={user}><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
