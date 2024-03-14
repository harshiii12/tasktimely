import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const axiosConfig = {
    withCredentials: true,
};
const PLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [page, setPage] = useState(false);
    
    const [remail, setREmail] = useState("");
    const [rpassword, setRPassword] = useState("");
    const [rconfirmPassword, setRConfirmPassword] = useState("");
    const [rname, setRName] = useState("");

    async function handleLogin() {
        try {
            const resp = await axios.post(
                "http://localhost:4000/user/login",
                {
                    email,
                    password,
                },
                axiosConfig
            );
            console.log(resp);
            navigate("/dashboard");
        } catch (error) {
            toast.warn("Invalid credentails!");
        }
    }
    async function handleRegister() {
        if(!remail.length || !rpassword.length || !rconfirmPassword.length || !rname.length){
            toast.warn("Invalid inputs!")
            return
        }
        if(rpassword != rconfirmPassword){
            toast.warn("Passwords do not match!")
            return
        }
        try {
            await axios.post(
                "http://localhost:4000/user/register",
                {
                    email:remail,
                    password:rpassword,
                    name:rname,
                },
                axiosConfig
            );
            navigate("/dashboard");
        } catch (error) {
            console.log(error)
            toast.warn("Something went wrong!");
        }
    }

    return (
        <div className="">
            {/* <div className="col-span-1"></div> */}
            <div className="p-4 col-span-1 h-screen flex justify-center">
                <div className="w-100 min-w-96 mt-12">
                    <h1 className="text-2xl mb-2">Welcome, to TaskTimely!</h1>
                    {!page ? (
                        <div>
                            <h1 className="text-lg font-bold">Login</h1>
                            <div className="mb-2 mt-2">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(val) => setEmail(val.target.value)}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mb-2">
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(val) => setPassword(val.target.value)}
                                    placeholder="Password"
                                />
                            </div>
                            <Button onClick={handleLogin}>Login</Button>
                            <p className="mt-2 cursor-pointer underline" onClick={() => setPage(!page)}>
                                Do not have an account? Register Now!
                            </p>
                        </div>
                    ) : (
                        <div>
                            <h1 className="mt-4 text-2xl">New here?</h1>
                            <h1 className="text-lg font-bold">Register Now!</h1>
                            <div className="mb-2 mt-2">
                                <Input
                                    type="text"
                                    value={rname}
                                    onChange={(val) => setRName(val.target.value)}
                                    placeholder="Name"
                                />
                            </div>
                            <div className="mb-2">
                                <Input
                                    type="email"
                                    value={remail}
                                    onChange={(val) => setREmail(val.target.value)}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mb-2">
                                <Input
                                    type="password"
                                    value={rpassword}
                                    onChange={(val) => setRPassword(val.target.value)}
                                    placeholder="Password"
                                />
                            </div>
                            <div className="mb-2">
                                <Input
                                    type="password"
                                    value={rconfirmPassword}
                                    onChange={(val) => setRConfirmPassword(val.target.value)}
                                    placeholder="Confirm Password"
                                />
                            </div>
                            <Button onClick={handleRegister}>
                                Register
                            </Button>
                            <p className="mt-2 cursor-pointer underline" onClick={() => setPage(!page)}>
                                Existing user, Login here!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PLogin;
