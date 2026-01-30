"use client";

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/main/HomePage";
import PrivacySafePage from "./pages/main/PrivacySafePage";
import ServiceGuidePage from "./pages/main/ServiceGuidePage";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignUpPage";

import WaitingPage from "./pages/match/WaitingPage";
import MatchRegisterPage from "./pages/match/MatchRegisterPage";
import MatchedPage from "./pages/match/MatchedPage";

import PostsPage from "./pages/community/PostsPage";
import PostDetailPage from "./pages/community/PostDetailPage";
import PostWritePage from "./pages/community/PostWritePage";
import PostEditPage from "./pages/community/PostEditPage";

import AttachmentTestPage from "./pages/attachment/AttachmentTestPage";
import { useNavigationContact } from "./hooks/useNavigationContact.ts";

export default function App() {
  useNavigationContact();

  return (
    <Routes>
      {/* Main */}
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy-safe" element={<PrivacySafePage />} />
      <Route path="/service-guide" element={<ServiceGuidePage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Match */}
      <Route path="/match" element={<MatchRegisterPage />} />
      <Route path="/waiting" element={<WaitingPage />} />
      <Route path="/success" element={<MatchedPage />} />

      {/* Community */}
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/posts/write" element={<PostWritePage />} />
      <Route path="/posts/:postId" element={<PostDetailPage />} />
      <Route path="/posts/:postId/edit" element={<PostEditPage />} />

      {/* Attachment */}
      <Route path="/attachment-test" element={<AttachmentTestPage />} />

      {/* fallback */}
      {/*<Route path="*" element={<Navigate to="/login" replace />} />*/}
    </Routes>
  );
}
