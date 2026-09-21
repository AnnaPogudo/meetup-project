import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProtectedLayout = () => {
  return (
    <div
      className="min-h-screen flex flex-col font-sans text-slate-900
                animate-gradient-flow"
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
