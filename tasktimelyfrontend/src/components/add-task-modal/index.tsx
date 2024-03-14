import React, { useState } from "react";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import axios from 'axios'

const dialogClose = () => {
    document.getElementById("add-task-close-dialog")?.click();
};

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import { toast } from "react-toastify";
import axios from "axios";
import { capitalizeFirstLetter, getStringDate } from "@/utils";

type TProps = {
    projectId : string,
    users : {_id : string, name : string}[],
    updateTasks : () => Promise<void>
}

const CAddTaskModel = (props : TProps) => {
    const [desc, setDesc] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const [date, setDate] = React.useState<Date>();
    const [time, setTime] = useState("");
    const [priority, setPriority] = useState("");
    console.log(props)

    async function createNewTask() {
        try {
            toast.info("Creating new task...")
            await axios.post(
                "http://localhost:4000/task",
                {
                    description: desc,
                    priority : priority,
                    dueDate : getStringDate(date!),
                    dueTime : time,
                    project: props.projectId,
                    user : assignTo
                },
                { withCredentials: true }
            );
            props.updateTasks()
        } catch (error) {
            console.log(error)
            toast.warn("Something went wrong...")
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild id="add-task-close-dialog">
                <Button variant="outline">+ Add task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new task</DialogTitle>
                    <DialogDescription>Describe task to add.</DialogDescription>
                </DialogHeader>
                <form
                    action=""
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!desc.length || !assignTo.length || !date || !time.length || !priority.length) {
                            toast.warn("Invalid inputs");
                            return;
                        }
                        createNewTask()
                        dialogClose();
                    }}
                >
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="desc" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="desc"
                                placeholder="Description"
                                className="col-span-3"
                                value={desc}
                                onChange={(val) => setDesc(val.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="assign-to" className="text-right">
                                Assign to
                            </Label>
                            {/* <Input id="assign-to" value="@peduarte" className="col-span-3" /> */}
                            <Select value={assignTo} onValueChange={(val) => setAssignTo(val)}>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Assign to" />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.users.map((user) => {
                                        return <SelectItem value={user._id}>{capitalizeFirstLetter(user.name)}</SelectItem>
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="assign-to" className="text-right">
                                Priority
                            </Label>
                            <Select value={priority} onValueChange={(val) => setPriority(val)}>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="mid">Mid</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="" className="text-right">
                                Select date
                            </Label>
                            {/* <CCalendarInput /> */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="" className="text-right">
                                Time
                            </Label>
                            <Input
                                className="col-span-3"
                                type="time"
                                value={time}
                                onChange={(val) => setTime(val.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CAddTaskModel;
