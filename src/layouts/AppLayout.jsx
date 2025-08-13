import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <main className="min-h-screen customContainer">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        Made with ❤️ by{"  "}
        <a
          className="underline"
          href="https://github.com/hakhan1999/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hassan Ahmed Khan
        </a>
      </div>
    </>
  );
};

export default AppLayout;
