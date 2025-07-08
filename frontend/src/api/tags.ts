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
export const createTag = async (tag: Omit<ITag, 'id'>): Promise<ITag | null>  => {
    console.log(tag);
    try {
        return await axios.post(`/tags`, tag);
    } catch (error) {
        console.error(error);
        return null;
    }
}

// удалить тэг
export const deleteTag = async (id: string): Promise<string | null>  => {
    try {
       // бла бла
        return new Promise((res) => {
            setTimeout(() => res(id), 1000)
        })
    } catch (error) {
        console.error(error);
        return null;
    }
}