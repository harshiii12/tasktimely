import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import PProjectDashboard from "./pages/project-dashboard-page";
import PHome from "./pages/home-page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PLogin from "./pages/login-page";
import { Route, Routes,  } from "react-router-dom";
import CNavbar from "./components/navbar";


function App() {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ToastContainer autoClose={2000} />
            <CNavbar/>
                    <Routes>
                        <Route path="/" element={<PLogin />} />
                        <Route path="/project/:id" element={<PProjectDashboard />} />
                        <Route path="/dashboard" element={<PHome />} />
                    </Routes>

        </ThemeProvider>
    );
}

export default App;
