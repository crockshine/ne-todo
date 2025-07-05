import axios from "@/lib/axios";
import {AxiosError} from "axios";


export interface ICreateTaskRequest {
   title: string;
   tagsId?: string[];
   deadline?: Date
}

// создать
export const createTask = async (data: ICreateTaskRequest) => {
    // console.log(data);
    try {
        await axios.post("/tasks", {...data})
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data?.message);
        }
    }
}

// получить все
export const getAllTask = async () => {
    try {
        await axios.get("/tasks")
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data?.message);
        }
    }
}