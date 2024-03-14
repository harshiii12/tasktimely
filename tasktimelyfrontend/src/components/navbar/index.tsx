import React from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { axiosConfig } from "@/pages/login-page";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CNavbar = () => {
    const location = useLocation()
    const navigate = useNavigate();
    async function handleLogout() {
        try {
            await axios.post("http://localhost:4000/user/logout", {}, axiosConfig);
            navigate("/");
        } catch (error) {
            toast.warn("Something went wrong!");
        }
    }
    return (
        <nav className="w-100 h-12 p-4 flex justify-between">
            <p className="font-bold">⏱️TaskTimely</p>
            {location.pathname !== "/" &&
            <Button variant="ghost" onClick={handleLogout}>
                Logout
            </Button>
            }
        </nav>
    );
};

export default CNavbar;
