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

export const createTag = async (tag: TTag): Promise<TTag | null>  => {
    try {
        // const {data} = await axios.post("/tags", tag)
        // return data
        return new Promise(res => setTimeout(res, 2000))
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data?.message);
        }
        return null
    }
}