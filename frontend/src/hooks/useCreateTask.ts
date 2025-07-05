import {useContext} from "react";
import CreateTaskContext from "@/context/CreateTaskContext";

export const useCreateTask = () => {
    const createTask = useContext(CreateTaskContext)
    if (!createTask) throw new Error("useCreateTask must be defined")
    return createTask
}