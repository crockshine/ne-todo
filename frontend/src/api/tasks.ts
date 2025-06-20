import axios from "@/lib/axios";


export interface ICreateTaskRequest {
   title: string;
   tagsId?: number[];
   deadline?: Date
}

export const createTask = async (data: ICreateTaskRequest) => {
    console.log(data);
    try {
        await axios.post("/createTask", {...data})
    } catch (error) {
        console.log(error)
    }
}