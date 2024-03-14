import CTable from "@/components/table";
import CAddTaskModel from "@/components/add-task-modal";
import CAddPeopleModal from "@/components/add-people-modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const PProjectDashboard = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<{
        name: string;
        _id: string;
        users: { _id: string; name: string; email: string }[];
    }>();

    const [tasks, setTasks] = useState({
        pending: [],
        completed: [],
    });

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    async function updateTasks() {
        const tasks = await axios.get(`http://localhost:4000/task/${id}`, {
            withCredentials: true,
        });
        console.log(tasks.data);
        setTasks(tasks.data);
    }

    async function toggleTaskStatus(_id: string, currentStatus: string) {
        await axios.post(`http://localhost:4000/task/toggleStatus/${_id}`, {
            withCredentials: true,
        });
        // if (currentStatus == "pending") toast.info("Marking as completed...");
        await updateTasks();
        if (currentStatus == "pending") toast.success("Woohoo! Task complete.");
    }

    async function updateProjectDetails() {
        const proj = await axios.get(`http://localhost:4000/project/${id}`, {
            withCredentials: true,
        });
        setProject(proj.data);
        await updateTasks();
    }

    useEffect(() => {
        async function getAuth() {
            try {
                await axios.get("http://localhost:4000/user/auth", {
                    withCredentials: true,
                });
                // const proj = await axios.get(`http://localhost:4000/project/${id}`, {
                //     withCredentials: true,
                // });
                // // console.log(proj.data)
                // setProject(proj.data);
                // await updateTasks();
                await updateProjectDetails()
                setLoading(false);
            } catch (error) {
                //@ts-expect-error error contains response
                if (error?.response?.status == 404) {
                    navigate("/dashboard");
                    toast.warn("Invalid");
                    return;
                }
                navigate("/");
                // if(error)
            }
        }
        getAuth();
    }, []);
    return (
        <>
            {!loading ? (
                <>
                    <div className="grid grid-cols-6 gap-4 p-2">
                        <div className="col-span-1">
                            <div className="w-full mb-2 mt-2">
                                <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                                    <p className="underline">Home</p>
                                </Button>
                            </div>
                            <div>
                                {/* <Button variant="ghost" onClick={() => navigate("/project")}>
                                    <p className="underline">My Tasks</p>
                                </Button> */}
                            </div>
                        </div>
                        <div className="col-span-5 p-2">
                            <div className="flex justify-between">
                                <h1 className="text-2xl font-bold mb-3">{project!.name}</h1>
                                <div className="mr-2 flex">
                                    <div className="mr-2">
                                        <CAddTaskModel
                                            projectId={id!}
                                            users={project!.users}
                                            updateTasks={updateTasks}
                                        />
                                    </div>
                                    <CAddPeopleModal refreshProjectDetails={updateProjectDetails}/>
                                </div>
                            </div>
                            <p className="text-lg font-semibold">Due Tasks</p>
                            <div className="w-full mt-4">
                                <CTable tasks={tasks.pending} toggleStatus={toggleTaskStatus} />
                            </div>
                            <p className="text-lg font-semibold mt-4">Completed Tasks</p>
                            <div className="w-full mt-4">
                                <CTable tasks={tasks.completed} toggleStatus={toggleTaskStatus} />
                            </div>
                        </div>
                    </div>
                    <div className="w-100 flex justify-center mt-4 mb-2">
                        <p className="text-center">Made with ❤️ by Harshita</p>
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

export default PProjectDashboard;
