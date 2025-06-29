import axios from "@/lib/axios"
import {AxiosError} from "axios";
import {ITag} from "@/types/checkbox.interface";

// получить все теги
export const getAllTags = async (): Promise<ITag[] | null> => {
    try {
        const {data} = await axios.get<ITag[]>("/tags")
        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data?.message);
        }
        return null
    }
}

// создать тег

export const createTag = async (tag: ITag): Promise<ITag | null>  => {
    try {
        // const {data} = await axios.post("/tags", tag)
        // return data
        const t = Math.random()

        if (t < 0.5){
            return new Promise(res => setTimeout(() => res({...tag, id: Date.now().toString()}), 2000))
        } else{
            throw new Error("There is already a tag")
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data?.message);
        }
        return null
    }
}