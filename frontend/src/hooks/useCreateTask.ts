import {useContext} from "react";
import CreateTaskContext from "@/context/CreateTaskContext";

export const useCreateTask = () => useContext(CreateTaskContext);
