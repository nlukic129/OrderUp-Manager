import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import TablesPage from "../pages/TablesPage";
import WaitersPage from "../pages/WaitersPage";
import MenuPage from "../pages/MenuPage";
import AuthProtectPage, { ProtectType } from "./AuthProtectPage";
import MessagesPage from "pages/MessagesPage";
import AddTablePage from "pages/AddTablePage";
import AddWaiterPage from "pages/AddWaiterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProtectPage Page={HomePage} protectType={ProtectType.MUST_BE_LOGGED_IN} />,
    children: [
      {
        path: "",
        element: <Navigate to="tables" replace />,
      },
      {
        path: "tables",
        element: <TablesPage />,
      },
      {
        path: "add-table",
        element: <AddTablePage />,
      },
      {
        path: "waiters",
        element: <WaitersPage />,
      },
      {
        path: "add-waiter",
        element: <AddWaiterPage />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "messages",
        element: <MessagesPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <AuthProtectPage Page={LoginPage} protectType={ProtectType.MUST_BE_LOGGED_OUT} />,
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
