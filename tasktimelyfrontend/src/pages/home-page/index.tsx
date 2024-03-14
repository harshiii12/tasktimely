import CAddProjectModal from "@/components/add-project-modal";
import CProjectCard from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { TUser } from "@/types";
import { capitalizeFirstLetter } from "@/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PHome = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<TUser | null>(null);

    async function refreshHomepage() {
        const resp = await axios.get("http://localhost:4000/user/auth", {
            withCredentials: true,
        });
        console.log(resp.data);
        const projects = await axios.get("http://localhost:4000/project", {
            withCredentials: true,
        });
        setUser({
            email: resp.data.email,
            name: resp.data.name,
            projects: projects.data,
            _id: resp.data._id,
        });
    }

    useEffect(() => {
        async function getAuth() {
            try {
                await refreshHomepage();
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        }
        getAuth();
    }, []);
    return (
        <>
            {user ? (
                <>
                    <div className="grid grid-cols-6 gap-4 p-2">
                        <div className="col-span-1">
                            <div className="w-full mb-2 mt-2">
                                <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                                    <p className="underline">Home</p>
                                </Button>
                            </div>
                            <div>
                                {/* <Button variant="ghost" onClick={() => navigate("/project")}> */}
                                    {/* <p className="underline">My Tasks</p> */}
                                {/* </Button> */}
                            </div>
                        </div>
                        <div className="col-span-5 p-2">
                            <div className="flex justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        Hi, {capitalizeFirstLetter(user.name)}!
                                    </h1>
                                    <p className="font-light mb-2">Lets get started.</p>
                                </div>
                                <CAddProjectModal refreshHomepage={refreshHomepage}/>
                            </div>
                            <hr />

                            <h1 className="text-xl font-light mt-4">MY PROJECTS</h1>
                            <div className="flex flex-wrap">
                                {user.projects.map((p, idx) => {
                                    return <CProjectCard name={p.name} _id={p._id} key={idx} />;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="w-100 flex justify-center mt-4 mb-2">
                        {/* <p className="text-center">Made with ❤️ by Harshita</p> */}
                    </div>
                </>
            ) : (
                <div className="w-100 flex justify-center align-center h-full">
                    <span className="loader"></span>
                </div>
            )}
        </>
    );
};

export default PHome;
