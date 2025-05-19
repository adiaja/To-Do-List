import React from "react";
import { Outlet } from "react-router-dom";
import Fotter from "./Fotter";
const Layout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col  ">
      <main className="flex justify-center my-10  items-center min-w-5xl mx-auto transition-all duration-500 ease-in-out">
        <Outlet />
      </main>
      <footer>
        <Fotter />
      </footer>
    </div>
  );
};

export default Layout;
