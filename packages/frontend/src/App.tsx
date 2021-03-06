import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/header";

import { useAuth } from "./contexts/auth-context";
import { useNotify } from "./contexts/notify-context";

import IndexPage from "./pages";
import ProfileEditPage from "./pages/edit";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/me";
import RegisterPage from "./pages/register";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const notify = useNotify();

  // onMount
  useEffect(() => {
    if (!auth.user) {
      notify.warning("You have to be logged in to see this page");
    }
  }, [auth.user, notify]);

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/me"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/me/edit"
          element={
            <RequireAuth>
              <ProfileEditPage />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};

export default App;
