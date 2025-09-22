import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Public Components
import Header from "./components/header/Header";
import PublicHeader from "./components/header/PublicHeader";
import AdminHeader from "./components/header/AdminHeader";

// Public Pages
import {
  Home,
  Blogs,
  Careers,
  ContactUsDetails,
  Events,
  News,
  Partners,
  Team,
  Testimonials,
} from "./pages";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBlogs from "./pages/admin/Blogs";
import AdminCareers from "./pages/admin/Careers";
import AdminEvents from "./pages/admin/Events";
import AdminNews from "./pages/admin/News";
import AdminPartners from "./pages/admin/Partners";
import AdminTeam from "./pages/admin/Team";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminContactUs from "./pages/admin/ContactUs";

// Auth Components
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Context
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <BrowserRouter>
      {isAuthenticated && user?.role === 'admin' ? (
        <AdminHeader />
      ) : (
        <PublicHeader />
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<Events />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact-us" element={<ContactUsDetails />} />
        <Route path="/blogs" element={<Blogs />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/admin" replace /> : <Login />
        } />
        
        {/* Admin Routes - Protected */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/blogs" element={
          <ProtectedRoute>
            <AdminBlogs />
          </ProtectedRoute>
        } />
        <Route path="/admin/careers" element={
          <ProtectedRoute>
            <AdminCareers />
          </ProtectedRoute>
        } />
        <Route path="/admin/events" element={
          <ProtectedRoute>
            <AdminEvents />
          </ProtectedRoute>
        } />
        <Route path="/admin/news" element={
          <ProtectedRoute>
            <AdminNews />
          </ProtectedRoute>
        } />
        <Route path="/admin/partners" element={
          <ProtectedRoute>
            <AdminPartners />
          </ProtectedRoute>
        } />
        <Route path="/admin/team" element={
          <ProtectedRoute>
            <AdminTeam />
          </ProtectedRoute>
        } />
        <Route path="/admin/testimonials" element={
          <ProtectedRoute>
            <AdminTestimonials />
          </ProtectedRoute>
        } />
        <Route path="/admin/contact-us" element={
          <ProtectedRoute>
            <AdminContactUs />
          </ProtectedRoute>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function AppContent() {
  const { theme } = useTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
