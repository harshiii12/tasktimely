import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import PLogin from "./pages/login-page/index.tsx";
import PProjectDashboard from "./pages/project-dashboard-page/index.tsx";
import PHome from "./pages/home-page/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
