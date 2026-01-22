import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/main/HomePage.tsx";
import PrivacySafePage from "./pages/main/PrivacySafePage.tsx";
import ServiceGuidePage from "./pages/main/ServiceGuidePage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import SignupPage from "./pages/auth/SignUpPage.tsx";

export default function App() {
  return (
    <Routes>
      {/* 메인페이지 */}
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy-safe" element={<PrivacySafePage />} />
      <Route path="/service-guide" element={<ServiceGuidePage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
