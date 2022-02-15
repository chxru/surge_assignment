import React from "react";
import { Routes, Route } from "react-router-dom";

import IndexPage from "./pages";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
    </Routes>
  );
};

export default App;
