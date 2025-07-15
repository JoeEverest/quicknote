import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

// Pages
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotesPage from "@/pages/NotesPage";
import NewNotePage from "@/pages/NewNotePage";
import EditNotePage from "@/pages/EditNotePage";
import PublicNotePage from "@/pages/PublicNotePage";
import NotFoundPage from "@/pages/NotFoundPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Layout component for authenticated routes
const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Routes with navbar layout */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />

              {/* Protected routes */}
              <Route
                path="notes"
                element={
                  <ProtectedRoute>
                    <NotesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="notes/new"
                element={
                  <ProtectedRoute>
                    <NewNotePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="notes/:id/edit"
                element={
                  <ProtectedRoute>
                    <EditNotePage />
                  </ProtectedRoute>
                }
              />

              {/* 404 Page */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            {/* Public note view route (no layout) */}
            <Route path="/:slug" element={<PublicNotePage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
