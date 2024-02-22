import React from "react";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <main className="layout">
      <Outlet />
    </main>
  );
};

export default Layout;
