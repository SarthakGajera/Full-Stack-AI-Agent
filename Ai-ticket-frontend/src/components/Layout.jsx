import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import React from "react";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
