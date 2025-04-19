// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import LogInPage from "./components/sections/LoginPage";
import DashboardSection from "./components/sections/DashboardSection";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/dashboard" element={<DashboardSection />} />
    </Routes>
  );
};

export default App;
