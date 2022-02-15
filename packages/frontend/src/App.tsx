import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header";

import IndexPage from "./pages";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </>
  );
};

export default App;
