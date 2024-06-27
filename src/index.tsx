import React from "react";
import ReactDOM from "react-dom/client";

import AppRoutes from "./router/AppRoutes";
import { StorageProvider } from "./data/StorageContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <StorageProvider>
      <AppRoutes />
    </StorageProvider>
  </React.StrictMode>
);
