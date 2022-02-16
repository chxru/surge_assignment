import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header";

import IndexPage from "./pages";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
