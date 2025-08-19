import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";
import UrlProvider from "./context/context";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/link/:id",
        element: <Link />,
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);
const App = () => {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
};

export default App;
