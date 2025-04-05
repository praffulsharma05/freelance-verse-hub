
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Index from "./pages/Index";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Circular from "./pages/Circular";
import Competition from "./pages/Competition";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import NotFound from "./pages/NotFound";

// Admin Panel Imports
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import ProjectManagement from "./pages/admin/ProjectManagement";
import Settings from "./pages/admin/Settings";
import Finances from "./pages/admin/Finances";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    console.log("User not authenticated, redirecting to home");
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

// Admin route component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, isLoading, user } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    console.log("User not authenticated, redirecting to home");
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  if (!isAdmin) {
    console.log("User not admin, redirecting to home");
    return <Navigate to="/home" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user, isAdmin } = useAuth();
  
  return (
    <Routes>
      {/* If user is logged in and is admin, redirect to admin panel from root */}
      <Route path="/" element={
        user && isAdmin ? <Navigate to="/admin" replace /> : 
        user ? <Navigate to="/home" replace /> : <Index />
      } />
      
      {/* Protected Routes */}
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
      <Route path="/circular" element={<ProtectedRoute><Circular /></ProtectedRoute>} />
      <Route path="/competition" element={<ProtectedRoute><Competition /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="projects" element={<ProjectManagement />} />
        <Route path="finances" element={<Finances />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
