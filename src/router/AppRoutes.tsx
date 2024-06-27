import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import TablesPage from "../pages/TablesPage";
import WaitersPage from "../pages/WaitersPage";
import MenuPage from "../pages/MenuPage";
import ProtectPage from "./ProtectPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectPage Page={HomePage} />,
    children: [
      {
        path: ":restaurantName",
        element: <Outlet />,
        children: [
          {
            path: "tables",
            element: <TablesPage />,
          },
          {
            path: "waiters",
            element: <WaitersPage />,
          },
          {
            path: "menu",
            element: <MenuPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
