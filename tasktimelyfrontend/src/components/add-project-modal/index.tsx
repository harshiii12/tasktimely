import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
const dialogClose = () => {
    document.getElementById("add-project-close-dialog")?.click();
};

type TProps = {
    refreshHomepage : () => Promise<void>
}

const CAddProjectModal = (props : TProps) => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    async function handleAddPeople() {
        try {
            if (!name.length || !description.length) {
                toast.warn("Invalid inputs");
                return;
            }
            const resp = await axios.post(
                `http://localhost:4000/project`,
                {
                    name, description
                },
                {
                    withCredentials: true,
                }
            );
            console.log(resp);
            await props.refreshHomepage()
            toast.success("Added");
            dialogClose()
        } catch (error) {
            toast.warn("Something went wrong...");
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild id="add-project-close-dialog">
                <Button variant="outline">+ Create Project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new project</DialogTitle>
                    <DialogDescription>Enter details to create project.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter name"
                            className="col-span-3"
                            value={name}
                            onChange={(val) => setName(val.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="desc"
                            type="text"
                            placeholder="Enter Description"
                            className="col-span-3"
                            value={description}
                            onChange={(val) => setDescription(val.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleAddPeople}>
                        Create Project
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CAddProjectModal;
