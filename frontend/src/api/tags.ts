import axios from "@/lib/axios"
import {AxiosError} from "axios";
import {TTag} from "@/mocks/tags";

// получить все теги
export const getAllTags = async () => {
    try {
        await axios.get("/tags")
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data?.message);
        }
        return null
    }
}

// создать тег
export type TCreateTag = Omit<TTag, 'isLoading' | 'isError'>
export const createTag = async (tag: TCreateTag): Promise<TCreateTag | null>  => {
    try {
        // const {data} = await axios.post("/tags", tag)
        // return data
        const t = Math.random()

        if (t < 0.5){
            return new Promise(res => setTimeout(() => res({...tag, id: 1}), 2000))
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