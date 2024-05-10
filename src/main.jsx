import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./Routers/Routers.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="max-w-7xl mx-auto overflow-hidden">
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  </div>
);
