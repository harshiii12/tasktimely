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
    document.getElementById("add-people-close-dialog")?.click();
};

type TProps = {
    refreshProjectDetails : () => Promise<void>
}

const CAddPeopleModal = (props : TProps) => {
    const { id } = useParams();
    const [email, setEmail] = useState("");

    async function handleAddPeople() {
        try {
            if (!email.length) {
                toast.warn("Invalid email");
                return;
            }
            const resp = await axios.post(
                `http://localhost:4000/project/people/${id}`,
                {
                    email: email,
                },
                {
                    withCredentials: true,
                }
            );
            console.log(resp);
            await props.refreshProjectDetails()
            toast.success("Added");
            dialogClose()
        } catch (error) {
            // @ts-expect-error error response exists
            if (error.response.status == 404) {
                toast.warn("User not found!");
                return;
            }
            toast.warn("Something went wrong...");
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild id="add-people-close-dialog">
                <Button variant="outline">+ Add People</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new contributor</DialogTitle>
                    <DialogDescription>Enter details to add contributor.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="desc"
                            type="email"
                            placeholder="email@domain.com"
                            className="col-span-3"
                            value={email}
                            onChange={(val) => setEmail(val.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleAddPeople}>
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CAddPeopleModal;
