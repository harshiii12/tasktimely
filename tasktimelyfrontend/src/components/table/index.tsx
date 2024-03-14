import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { TTask } from "@/types";
import { capitalizeFirstLetter } from "@/utils";

type TProps = {
    tasks: TTask[];
    toggleStatus: (_id: string, currentStatus: string) => Promise<void>;
};

function CTable(props: TProps) {
    console.log(props.tasks);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Action</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Assigned to</TableHead>
                    <TableHead className="text-right">Due Time</TableHead>
                    <TableHead className="text-right">Due Date</TableHead>
                    <TableHead className="text-right">Priority</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.tasks.map((invoice) => (
                    <TableRow key={invoice.description}>
                        <TableCell className="font-medium">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    props.toggleStatus(invoice._id, invoice.status);
                                }}
                            >
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </Button>
                        </TableCell>
                        <TableCell>{invoice.description}</TableCell>
                        <TableCell>
                            <Button variant="outline">
                                {capitalizeFirstLetter(invoice.user.name)}
                            </Button>
                        </TableCell>
                        <TableCell className="text-right">{invoice.dueDate}</TableCell>
                        <TableCell className="text-right">{invoice.dueTime}</TableCell>
                        <TableCell className="text-right">
                            {capitalizeFirstLetter(invoice.priority)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>Total</TableCell>
                    <TableCell className="text-right">{props.tasks.length} tasks</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
export default CTable;
