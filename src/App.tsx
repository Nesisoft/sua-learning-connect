import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ParentRegister from "./pages/ParentRegister";
import TutorRegister from "./pages/TutorRegister";
import ParentProfileSetup from "./pages/ParentProfileSetup";
import TutorProfileSetup from "./pages/TutorProfileSetup";
import ParentDashboard from "./pages/ParentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import FindTutors from "./pages/FindTutors";
import TutorProfile from "./pages/TutorProfile";
import TutorSchedule from "./pages/TutorSchedule";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/parent" element={<ParentRegister />} />
          <Route path="/register/tutor" element={<TutorRegister />} />
          <Route path="/profile-setup/parent" element={<ParentProfileSetup />} />
          <Route path="/profile-setup/tutor" element={<TutorProfileSetup />} />
          <Route path="/dashboard/parent" element={<ParentDashboard />} />
          <Route path="/dashboard/tutor" element={<TutorDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/find-tutors" element={<FindTutors />} />
          <Route path="/tutor/profile" element={<TutorProfile />} />
          <Route path="/tutor/schedule" element={<TutorSchedule />} />
          <Route path="/chat" element={<Chat />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
