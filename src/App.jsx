import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Members from "./pages/Members";
import CertificateVerification from "./pages/CertificateVerification";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import LandingPage from "./pages/LandingPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("authToken");
  });

  useEffect(() => {
    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("authToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen for localStorage changes in the same tab
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (...args) {
      window.dispatchEvent(new Event("storage"));
      return originalSetItem.apply(this, args);
    };

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col">
      {/* Show Navbar only when authenticated */}
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}

      {/* Routes */}
      <div className="flex-1">
        <Routes>
          {/* Public Auth Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login setIsAuthenticated={setIsAuthenticated} />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Landing Page for non-authenticated users */}
          <Route
            path="/welcome"
            element={
              !isAuthenticated ? (
                <LandingPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Protected App Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kalki/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kalki/teamMems"
            element={
              <ProtectedRoute>
                <Members />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kalki/certification"
            element={
              <ProtectedRoute>
                <CertificateVerification />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to home if authenticated, login if not */}
          <Route
            path="*"
            element={
              <Navigate
                to={isAuthenticated ? "/" : "/login"}
                replace
              />
            }
          />
        </Routes>
      </div>

      {/* Show Footer only when authenticated */}
      {isAuthenticated && <Footer />}
    </div>
  );
};

export default App;
